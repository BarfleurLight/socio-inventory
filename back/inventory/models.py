from django.db import models


class Responsible(models.Model):
    name = models.CharField(max_length=200, verbose_name='Имя')
    surname = models.CharField(max_length=200, verbose_name='Фамилия')
    patronymic = models.CharField(
        max_length=200,
        verbose_name='Отчество',
        blank=True
    )

    class Meta:
        verbose_name = 'Ответственный'
        verbose_name_plural = 'Ответственные'

    def __str__(self) -> str:
        return self.surname


class IP(models.Model):
    ip = models.GenericIPAddressField(
        protocol='IPv4',
        unique=True,
        verbose_name='IPv4'
    )

    class Meta:
        verbose_name = 'IPv4-адрес'
        verbose_name_plural = 'IPv4-адреса'

    def __str__(self) -> str:
        return self.ip


class Consumables(models.Model):
    name = models.CharField(max_length=200, verbose_name='Название')
    cons_type = models.CharField(max_length=200, verbose_name='Тип расходника')
    count = models.IntegerField(default=0, verbose_name="Количество")
    image = models.ImageField(
        upload_to='consumables/',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = 'Расходник'
        verbose_name_plural = 'Расходники'

    def __str__(self) -> str:
        return self.name