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
        fields = ['id', 'name']


class ModelSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()
    
    class Meta:
        model = Models
        fields = ['id', 'image', 'name', 'model_type', 'count']
    
    def get_count(self, obj):
        return obj.inventory_items.count()


class ConsumablesSerializer(serializers.ModelSerializer):
    models = ModelShortSerializer(many=True, read_only=True)
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = Consumables
        fields = ['id', 'image', 'name', 'cons_type', 'count','models']


class InventoryImportWriteSerializer(serializers.ModelSerializer):
    current_responsible = serializers.PrimaryKeyRelatedField(
        queryset=Responsible.objects.all(),
        allow_null=True,
        required=False
    )
    
    class Meta:
        model = Inventory
        fields = [
            'full_name',
            'current_responsible',
            'serial_number',
            'status_doc',
            'balance_price',
            'room_doc',
        ]


class InventoryWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = [
            'full_name',
            'current_responsible',
            'serial_number',
            'status_doc',
            'balance_price',
            'room_doc',
        ]


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