from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return (
            request.user.is_authenticated and 
            request.user.is_active and 
            (request.user.is_admin or 
             request.user.is_superuser)
        )


class IsAdminOrAccountant(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            request.user.is_active and 
            (request.user.is_admin or 
             request.user.is_accountant or 
             request.user.is_superuser)
        )

    
