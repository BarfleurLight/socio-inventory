import base64
from rest_framework import serializers
from django.core.files.base import ContentFile
from django.db import transaction
from inventory.models import (
    Models, Consumables, Inventory, IP, Responsible, MAC, InventoryAttribute,
    Attribute
)


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

        return super().to_internal_value(data)

class ResponsibleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsible
        fields = ('id', 'surname', 'name', 'patronymic', 'get_full_name')


class IPSerializer(serializers.ModelSerializer):
    class Meta:
        model = IP
        fields = ('id', 'ip')


class ModelShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Models
        fields = ('id', 'name')


class ConsumablesShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumables
        fields = ('id', 'name', 'cons_type', 'count')


class InventoryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = (
            'id', 'image', 'full_name', 'serial_number',
            'room_doc', 'room_real', 'status_doc'
        )

class ModelListSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()
    
    class Meta:
        model = Models
        fields = ('id', 'image', 'name', 'model_type', 'count')
    
    def get_count(self, obj):
        return obj.inventory.count()


class ConsumablesListSerializer(serializers.ModelSerializer):
    models = ModelShortSerializer(many=True, read_only=True)

    class Meta:
        model = Consumables
        fields = ('id', 'image', 'name', 'cons_type', 'count','models')


class InventoryAttributeSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='attribute.id')
    attribute_name = serializers.ReadOnlyField(source='attribute.name')
    attribute_description = serializers.ReadOnlyField(
        source='attribute.description'
    )
    
    class Meta:
        model = InventoryAttribute
        fields = ('id', 'attribute_name', 'attribute_description', 'value')


class InventoryAttributeWriteSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(queryset=Inventory.objects.all())
    value = serializers.CharField()
    
    class Meta:
        model = InventoryAttribute
        fields = ('id', 'value')


class BasePrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        return {item.id: str(item) for item in queryset}


class ConsumablesPrimaryKeyRelatedField(BasePrimaryKeyRelatedField):
    def to_representation(self, value):
        return ConsumablesShortSerializer(value, context=self.context).data
    

class ModelPrimaryKeyRelatedField(BasePrimaryKeyRelatedField):
    def to_representation(self, value):
        return ModelListSerializer(value, context=self.context).data
    

class InventoryPrimaryKeyRelatedField(BasePrimaryKeyRelatedField):
    def to_representation(self, value):
        return InventoryShortSerializer(value, context=self.context).data


class IpPrimaryKeyRelatedField(BasePrimaryKeyRelatedField):
    def to_representation(self, value):
        return IPSerializer(value, context=self.context).data
    

class InventoryRelatedField(serializers.RelatedField):
    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        return {item.pk: str(item) for item in queryset}
    
    def to_representation(self, value):
        return InventoryShortSerializer(value, context=self.context).data

    def to_internal_value(self, data):
        queryset = self.get_queryset()
        model = queryset.model

        try:
            return queryset.get(pk=data)
        except (TypeError, ValueError):
            raise serializers.ValidationError(f"ID must be a valid {model.__name__} pk")
        except model.DoesNotExist:
            raise serializers.ValidationError(f"Invalid {model.__name__} id")


class MACSerializer(serializers.ModelSerializer):
    ip_addresses = IpPrimaryKeyRelatedField(
        queryset=IP.objects.all(),
        required=False,
        many=True
    )
    inventory = InventoryRelatedField(
        queryset=Inventory.objects.all(),
        required=False,
    )

    class Meta:
        model = MAC
        fields = ('id', 'mac', 'interface', 'ip_addresses', 'inventory')


class ModelDetailSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)
    consumables = ConsumablesPrimaryKeyRelatedField(
        queryset=Consumables.objects.all(),
        required=False,
        many=True,
    )
    inventory = InventoryPrimaryKeyRelatedField(
        queryset=Inventory.objects.all(),
        required=False,
        many=True
    )

    class Meta:
        model = Models
        fields = (
            'id', 'image', 'name',
            'model_type','consumables','inventory'
        )


class ConsumableDetailSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)
    models = ModelPrimaryKeyRelatedField(
        queryset=Models.objects.all(),
        required=False,
        many=True,
    )

    class Meta:
        model = Consumables
        fields = ('id', 'image', 'name', 'cons_type', 'count', 'models')


class InventoryListSerializer(serializers.ModelSerializer):
    model = ModelListSerializer()
    current_responsible = serializers.StringRelatedField(read_only=True)
    ip = serializers.SerializerMethodField()
    mac = serializers.SerializerMethodField()
    
    class Meta:
        model = Inventory
        fields = (
            'id', 'image', 'full_name', 'model', 'serial_number', 
            'current_responsible', 'mac', 'ip', 'status_real', 'status_doc', 
            'room_real', 'room_doc', 'balance_price',
        )

    def get_ip(self, obj):
        return list(
            IP.objects.filter(
                mac_address__inventory=obj
            ).values_list('ip', flat=True).distinct()
        )

    def get_mac(self, obj):
        return list(obj.mac_address.values_list('mac', flat=True))


class InventoryDetailSerializer(InventoryListSerializer):
    attributes = InventoryAttributeSerializer(
        source='inventory_attributes', 
        many=True, 
        read_only=True
    )
    consumables = ConsumablesShortSerializer(
        source='model.consumables',
        required=False,
        read_only=True,
        many=True
    )
    
    class Meta(InventoryListSerializer.Meta):
        fields = InventoryListSerializer.Meta.fields + (
            'attributes', 'consumables'
        )


class InventoryWriteSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)
    mac = serializers.PrimaryKeyRelatedField(
        queryset=MAC.objects.all(),
        source='mac_address',
        many=True,
        required=False,
    )
    attributes = InventoryAttributeWriteSerializer(
        required=False,
        many=True,
    )

    def to_representation(self, value):
        return InventoryDetailSerializer(value, context=self.context).data

    def _add_attributes(self, inventory, attributes):
        attributes_list = list()
        for attribut in attributes:
            current_attribut = Attribute.objects.get(
                id=attribut.get("id").id
            )
            attributes_list.append(
                InventoryAttribute(
                    inventory=inventory,
                    attribute=current_attribut,
                    value=str(attribut.get("value"))
                )
            )
        InventoryAttribute.objects.bulk_create(attributes_list)

    @transaction.atomic
    def create(self, validated_data):
        if not validated_data.get('attributes', None):
            return Inventory.objects.create(**validated_data)
        attributes = validated_data.pop('attributes')
        inventory = Inventory.objects.create(**validated_data)
        self._add_attributes(inventory, attributes)
        return inventory

    @transaction.atomic
    def update(self, instance, validated_data):
        if not validated_data.get('attributes', None):
            return super().update(instance, validated_data)
        attributes = validated_data.pop('attributes')
        InventoryAttribute.objects.filter(inventory=instance).delete()
        self._add_attributes(instance, attributes)
        return super().update(instance, validated_data)

    class Meta:
        model = Inventory
        fields = (
            'full_name', 'serial_number', 'image', 'model', 
            'current_responsible', 'status_real', 'status_doc', 
            'room_real', 'room_doc', 'balance_price', 'mac', 'attributes'
        )
