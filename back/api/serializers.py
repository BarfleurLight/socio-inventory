import base64
from rest_framework import serializers
from inventory.models import Models


class ModelSerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()
    
    class Meta:
        model = Models
        fields = ['id', 'image', 'name', 'model_type', 'count']
    
    def get_count(self, obj):
        return obj.inventory_items.count()
