from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ModelViewSet, ConsumablesViewSet

router = DefaultRouter()
router.register('models', ModelViewSet, basename='models')
router.register('consumables', ConsumablesViewSet, basename='consumables')


urlpatterns = [
    path('', include(router.urls)),
]
