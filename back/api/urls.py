from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (ModelViewSet, ConsumablesViewSet, InventoryViewSet,
                    ImportAPIView, ResponsibleViewSet, IPViewSet, MACViewSet)
from users.views import CustomUserViewSet

router = DefaultRouter()
router.register('models', ModelViewSet, basename='models')
router.register('consumables', ConsumablesViewSet, basename='consumables')
router.register('inventory', InventoryViewSet, basename='inventory')
router.register('responsible', ResponsibleViewSet, basename='responsible')
router.register('mac', MACViewSet, basename='mac')
router.register('ip', IPViewSet, basename='ip')
router.register('users', CustomUserViewSet, basename='users')


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.jwt')),
    path('import/', ImportAPIView.as_view(), name='import')
]
