from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    list_display = list(UserAdmin.list_display) + ['user_type']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (
            'Персональная информация',
            {'fields': ('username', 'first_name', 'last_name')}
        ),
        (
            'Права доступа',
            {'fields': ('user_type', 'is_active', 'is_staff', 'is_superuser')}
        ),
    )
    
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'email',
                    'username',
                    'first_name',
                    'last_name',
                    'user_type',
                    'password1',
                    'password2',
                    'is_active',
                    'is_staff',
                ),
            },
        ),
    )


admin.site.unregister(Group)
admin.site.register(CustomUser, CustomUserAdmin)
