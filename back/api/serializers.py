import base64
from rest_framework import serializers
from django.core.files.base import ContentFile
from inventory.models import (
    Models, Consumables, Inventory, IP, Responsible, MAC, InventoryAttribute
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
        fields = ('id', 'surname', 'name', 'patronymic')


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
        return obj.inventory_items.count()


class ConsumablesListSerializer(serializers.ModelSerializer):
    models = ModelShortSerializer(many=True, read_only=True)

    class Meta:
        model = Consumables
        fields = ('id', 'image', 'name', 'cons_type', 'count','models')


class BasePrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        return {item.id: str(item) for item in queryset}


class ConsumablesPrimaryKeyRelatedField(BasePrimaryKeyRelatedField):
    def to_representation(self, value):
        return ConsumablesShortSerializer(value, context=self.context).data
    

class ModelPrimaryKeyRelatedField(BasePrimaryKeyRelatedField):
    def to_representation(self, value):
        # print(value)
        # return 'test'
        return ModelListSerializer(value, context=self.context).data
    

class InventoryPrimaryKeyRelatedField(BasePrimaryKeyRelatedField):
    def to_representation(self, value):
        return InventoryShortSerializer(value, context=self.context).data


class IpPrimaryKeyRelatedField(BasePrimaryKeyRelatedField):
    def to_representation(self, value):
        return IPSerializer(value, context=self.context).data
    

class MACSerializer(serializers.ModelSerializer):
    ip_addresses = IpPrimaryKeyRelatedField(
        queryset=IP.objects.all(),
        many=True
    )
    inventory = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = MAC
        fields = ('id', 'mac', 'interface', 'ip_addresses', 'inventory')


class ModelDetailSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)
    consumables = ConsumablesPrimaryKeyRelatedField(
        queryset=Consumables.objects.all(),
        many=True,
    )
    inventory = InventoryPrimaryKeyRelatedField(
        queryset=Inventory.objects.all(),
        many=True,
        source='inventory_items'
    )
    
    class Meta:
        model = Models
        fields = (
            'id', 'image', 'name',
            'model_type','consumables', 'inventory'
        )


class ConsumableDetailSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)
    models = ModelPrimaryKeyRelatedField(
        queryset=Models.objects.all(),
        many=True,
    )

    class Meta:
        model = Consumables
        fields = ('id', 'image', 'name', 'cons_type', 'count', 'models')


class InventoryListSerializer(serializers.ModelSerializer):
    model = ModelSerializer()
    current_responsible = serializers.CharField(
        source='current_responsible.get_full_name', 
        read_only=True
    )
    ip = serializers.SerializerMethodField()
    mac = serializers.SerializerMethodField()
    
    class Meta:
        model = Inventory
        fields = (
            'id', 'full_name', 'model', 'serial_number', 
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