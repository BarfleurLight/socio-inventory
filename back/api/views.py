from rest_framework import viewsets
from inventory.models import Models, Consumables
from .serializers import ModelSerializer, ConsumablesSerializer


class ModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Models.objects.all()
    serializer_class = ModelSerializer


class ConsumablesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Consumables.objects.all()
    serializer_class = ConsumablesSerializer