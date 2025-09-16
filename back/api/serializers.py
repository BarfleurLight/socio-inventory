import base64
from rest_framework import serializers
from inventory.models import Models, Consumables, Inventory, IP, Responsible


class ModelSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()
    
    class Meta:
        model = Models
        fields = ['id', 'image', 'name', 'model_type', 'count']
    
    def get_count(self, obj):
        return obj.inventory_items.count()


class ConsumablesSerializer(serializers.ModelSerializer):
    models = ModelSerializer(many=True)
    class Meta:
        model = Consumables
        fields = ['id', 'image', 'name', 'cons_type', 'models', 'count']


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