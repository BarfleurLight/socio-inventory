from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ModelViewSet, ConsumablesViewSet, InventoryViewSet

router = DefaultRouter()
router.register('models', ModelViewSet, basename='models')
router.register('consumables', ConsumablesViewSet, basename='consumables')
router.register('inventory', InventoryViewSet, basename='inventory')


urlpatterns = [
    path('', include(router.urls)),
]
