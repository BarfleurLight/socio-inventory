from djoser.views import UserViewSet
from rest_framework.permissions import IsAuthenticated


class CustomUserViewSet(UserViewSet):
    def get_permissions(self):
        if self.action == "me":
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()
    