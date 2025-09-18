from djoser.serializers import UserSerializer
from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(UserSerializer):
    user_type = serializers.CharField(read_only=True)
    
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username', 'first_name', 
                 'last_name', 'user_type')
        read_only_fields = ['user_type']

    def to_representation(self, instance):
        if not instance.is_authenticated:
            return {'detail': 'Anonymous user'}
        return super().to_representation(instance)