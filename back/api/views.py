from rest_framework import viewsets
from .pagination import CustomPaginations
from inventory.models import Models, Consumables, Inventory
from .serializers import (ModelSerializer, ConsumablesSerializer,
                          InventoryListSerializer, InventoryWriteSerializer)


class ModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Models.objects.all()
    serializer_class = ModelSerializer


class ConsumablesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Consumables.objects.all()
    pagination_class = CustomPaginations
    serializer_class = ConsumablesSerializer


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    pagination_class = CustomPaginations
    
    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return InventoryListSerializer
        return InventoryWriteSerializer