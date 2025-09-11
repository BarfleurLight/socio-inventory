from rest_framework import viewsets
from inventory.models import Models
from .serializers import ModelSerializer


class ModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Models.objects.all()
    serializer_class = ModelSerializer
