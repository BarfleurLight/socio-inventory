import base64
from rest_framework import serializers
from inventory.models import Models, Consumables


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