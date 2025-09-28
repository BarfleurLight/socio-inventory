from rest_framework import (viewsets, response, status,
                            views, parsers, exceptions)
from inventory.models import (
    Models, Consumables, Inventory, Responsible, IP, MAC, Attribute
)
from .pagination import CustomPaginations, CustomModelPaginations
from .permissions import IsAdminOrAccountant
from .utils import process_csv_file
from .serializers import (
    ModelListSerializer, ModelDetailSerializer, ConsumablesListSerializer,
    InventoryListSerializer, InventoryDetailSerializer, ResponsibleSerializer,
    InventoryWriteSerializer, ConsumableDetailSerializer, IPSerializer,
    MACSerializer, AttributeSerializer
)


class ResponsibleViewSet(viewsets.ModelViewSet):
    queryset = Responsible.objects.all()
    serializer_class = ResponsibleSerializer


class IPViewSet(viewsets.ModelViewSet):
    queryset = IP.objects.all()
    serializer_class = IPSerializer


class MACViewSet(viewsets.ModelViewSet):
    queryset = MAC.objects.select_related('inventory').all()
    serializer_class = MACSerializer


class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer


class ModelViewSet(viewsets.ModelViewSet):
    queryset = Models.objects.all()
    pagination_class = CustomModelPaginations

    def get_serializer_class(self):
        if self.action in ('list',):
            return ModelListSerializer
        return ModelDetailSerializer


class ConsumablesViewSet(viewsets.ModelViewSet):
    queryset = Consumables.objects.all().prefetch_related('models')
    pagination_class = CustomPaginations

    def get_serializer_class(self):
        if self.action in ('list',):
            return ConsumablesListSerializer
        return ConsumableDetailSerializer
    

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.select_related('model')
    pagination_class = CustomPaginations
    
    def get_serializer_class(self):
        if self.action in ('list',):
            return InventoryListSerializer
        elif self.action in ('retrieve',):
            return InventoryDetailSerializer
        return InventoryWriteSerializer


class ImportAPIView(views.APIView):
    parser_classes = [parsers.MultiPartParser]
    permission_classes = (IsAdminOrAccountant,)

    def post(self, request):
        csv_data = process_csv_file(request)

        results = []
        has_errors = False

        for row in csv_data:
            try:
                responsible_id = self._get_responsible_id(
                    row['current_responsible']
                )
                row['current_responsible'] = responsible_id

                inventory = Inventory.objects.select_related(
                    'current_responsible').filter(
                        serial_number=row.get('serial_number')
                        ).first()
                previous_data = self._get_inventory_data(inventory)

                serializer = InventoryWriteSerializer(
                    data=row, 
                    instance=inventory
                )
                serializer.is_valid(raise_exception=True)
                inventory = serializer.save()

                results.append({
                    "inventory_current": self._get_inventory_data(inventory),
                    "inventory_previous": previous_data
                })

            except Exception as e:
                has_errors = True
                results.append({
                    "error": str(e),
                    "serial_number": row.get('serial_number')
                })
        status_code = (
            status.HTTP_207_MULTI_STATUS 
            if has_errors 
            else status.HTTP_200_OK
        )
        return response.Response(results, status=status_code)

    def _get_inventory_data(self, inventory):
        if not inventory:
            return None
        return {
            "id": inventory.id,
            "fullname": inventory.full_name,
            "serial_number": inventory.serial_number,
            "status_doc": inventory.status_doc,
            "current_responsible": str(inventory.current_responsible),
            "room_doc": inventory.room_doc,
            "balans_price": str(inventory.balance_price)
        }

    def _get_responsible_id(self, current_responsible):
        if not current_responsible or current_responsible.strip() == '':
            return None

        parts = current_responsible.strip().split()
        if len(parts) < 2:
            raise exceptions.ValidationError(
                f"Неверный формат ФИО: '{current_responsible}'"
            )

        responsible, created = Responsible.objects.get_or_create(
            surname=parts[0],
            name=parts[1],
            patronymic=' '.join(parts[2:]) if len(parts) > 2 else ''
        )

        return responsible.id
