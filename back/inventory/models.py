from django.db import models
from django.core.validators import (MinValueValidator,RegexValidator,
                                    MaxValueValidator)


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
    
    def get_full_name(self):
        parts = [self.surname, self.name]
        if self.patronymic:
            parts.append(self.patronymic)
        return ' '.join(parts)

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


class MAC(models.Model):
    INTERFACE_CHOICES = [
        ('ethernet', 'Ethernet'),
        ('wifi', 'Wi-Fi'),
    ]

    inventory = models.ForeignKey(
        'Inventory',
        on_delete=models.CASCADE,
        related_name='mac_address',
        verbose_name='Инвентарь'
    )
    mac = models.CharField(
        max_length=17,
        unique=True,
        verbose_name='MAC-адрес',
        validators=[
            RegexValidator(
                regex=r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
                message='Введите корректный MAC-адрес',
            ),
        ]
    )
    interface = models.CharField(
        max_length=10,
        choices=INTERFACE_CHOICES,
        verbose_name="Интерфейс",
        help_text="Тип сетевого интерфейса"
    )
    ip_addresses = models.ManyToManyField(
        'IP',
        related_name='mac_address',
        blank=True,
        verbose_name="IP-адреса"
    )

    class Meta:
        verbose_name = "MAC-адрес"
        verbose_name_plural = "MAC-адреса"
        ordering = ['inventory', 'interface']

    def save(self, *args, **kwargs) -> None: 
        if self.mac:
            self.mac = self.mac.lower()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.mac} ({self.interface})"
    

class Models(models.Model):
    MODEL_TYPE_COMPUTER = 'computer'
    MODEL_TYPE_PRINTER = 'printer'
    MODEL_TYPE_UNDEFINED = 'undefined'

    MODEL_TYPE_CHOICES = [
        (MODEL_TYPE_COMPUTER, 'Компьютер'),
        (MODEL_TYPE_PRINTER, 'Принтер'),
        (MODEL_TYPE_UNDEFINED, 'Не определено'),
    ]

    name = models.CharField(max_length=200, verbose_name="Наименование")
    model_type = models.CharField(
        max_length=20,
        choices=MODEL_TYPE_CHOICES,
        default=MODEL_TYPE_UNDEFINED,
        verbose_name="Тип оборудования"
    )
    image = models.ImageField(
        upload_to='models/',
        blank=True,
        null=True
    )
    consumables = models.ManyToManyField(
        'Consumables',
        related_name='models',
        verbose_name="Расходники",
        blank=True
    )

    class Meta:
        verbose_name = "Модель"
        verbose_name_plural = "Модели"
        ordering = ['name']

    def __str__(self) -> str:
        return self.name


class Attribute(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Название атрибута"
    )
    description = models.TextField(
        max_length=200,
        blank=True,
        verbose_name="Описание"
    )
    
    class Meta:
        verbose_name = "Атрибут"
        verbose_name_plural = "Атрибуты"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class InventoryAttribute(models.Model):
    inventory = models.ForeignKey(
        'Inventory',
        on_delete=models.CASCADE,
        related_name='inventory_attributes',
        verbose_name="Инвентарный объект"
    )
    attribute = models.ForeignKey(
        Attribute,
        on_delete=models.CASCADE,
        verbose_name="Атрибут"
    )
    value = models.CharField(
        max_length=200,
        verbose_name="Значение"
    )
    
    class Meta:
        verbose_name = "Значение атрибута"
        verbose_name_plural = "Значения атрибутов"
        constraints = [
            models.UniqueConstraint(
                fields=["inventory", "attribute"],
                name="unique_inventory_attribute",
            ),
        ]
    
    def __str__(self):
        return f"{self.attribute.name}: {self.value}"


class Inventory(models.Model):
    ACTIVE = 'computer'
    TO_WRITTEN = 'to_written_off'
    WRITTEN_OFF = 'written_off'
    
    STATUS = [
        (ACTIVE, 'Действующий'),
        (TO_WRITTEN, 'К списанию'),
        (WRITTEN_OFF, 'Списан'),
    ]

    full_name = models.CharField(max_length=200, verbose_name="Наименование")
    model = models.ForeignKey(
        'Models',
        on_delete=models.CASCADE,
        related_name='inventory_items',
        verbose_name="Модель оборудования"
    )
    current_responsible = models.ForeignKey(
        'Responsible',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='inventory_items',
        verbose_name="Ответственный"
    )
    serial_number = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Серийный номер"
    )
    image = models.ImageField(
        upload_to='inventory/',
        verbose_name="Изображение",
        blank=True,
        null=True
    )
    status_real = models.CharField(
        max_length=20,
        choices=STATUS,
        default=ACTIVE,
        verbose_name="Фактический статус"
    )
    status_doc = models.CharField(
        max_length=20,
        choices=STATUS,
        default=ACTIVE,
        verbose_name="Статус по документам"
    )
    balance_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name="Балансовая стоимость"
    )
    room_real = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(600)
        ],
        verbose_name="Фактическое помещение",
        help_text="Номер помещения от 1 до 600",
        null=True,
        blank=True
    )
    room_doc = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(600)
        ],
        verbose_name="Помещение по документам", 
        help_text="Номер помещения от 1 до 600",
        null=True,
        blank=True
    )
    attributes = models.ManyToManyField(
        Attribute,
        through='InventoryAttribute',
        through_fields=('inventory', 'attribute'),
        related_name='inventory_items',
        verbose_name="Дополнительные атрибуты",
        blank=True
    )
    class Meta:
        verbose_name = "Инвентарь"
        verbose_name_plural = "Инвентарные объекты"

    def __str__(self):
        return self.full_name