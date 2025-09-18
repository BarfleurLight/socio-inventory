from django.contrib.auth.models import AbstractUser
from django.core.validators import validate_email
from django.db import models


class CustomUser(AbstractUser):

    USER = 'user'
    ACCOUNTANT = 'accountant'
    ADMIN = 'admin'

    CHOICES = (
        (USER, 'Аутентифицированный пользователь'),
        (ACCOUNTANT, 'Бухгалтер'),
        (ADMIN, 'Админ'),
    )
    
    email = models.EmailField(
        max_length=254,
        unique=True,
        validators=[validate_email],
        verbose_name='Электронная почта'
    )
    
    first_name = models.CharField(
        max_length=150,
        verbose_name='Имя'
    )
    
    last_name = models.CharField(
        max_length=150,
        verbose_name='Фамилия'
    )
    
    user_type = models.CharField(
        max_length=20,
        choices=CHOICES,
        default='user',
        verbose_name='Тип пользователя',
        help_text='Тип назначается администратором'
    )

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.email})'
    
    @property
    def is_user(self):
        return self.user_type == self.USER

    @property
    def is_accountant(self):
        return self.user_type == self.ACCOUNTANT

    @property
    def is_admin(self):
        return self.user_type == self.ADMIN

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ('-id',)
