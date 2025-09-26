from django.contrib import admin
from django.utils.safestring import mark_safe
from inventory.models import (
    InventoryAttribute,
    Responsible,
    Consumables,
    Attribute,
    Inventory,
    Models,
    MAC,
    IP
)


@admin.register(IP)
class IPAdmin(admin.ModelAdmin):
    list_display = ('ip',)
    search_fields = ('ip',)


@admin.register(Attribute)
class AttributeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')


@admin.register(Responsible)
class ResponsibleAdmin(admin.ModelAdmin):
    list_display = ('surname', 'name', 'patronymic')
    search_fields = ('surname',)


@admin.register(Consumables)
class ConsumableAdmin(admin.ModelAdmin):
    list_display = ('name', 'cons_type', 'count', 'get_html_image')
    search_fields = ('name', 'type')
    ordering = ('name',)
    readonly_fields = ('get_html_image',)
    
    def get_html_image(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="150" />')
        return "Нет изображения"
    get_html_image.short_description = "Изображение"


@admin.register(MAC)
class MACAdmin(admin.ModelAdmin):
    list_display = ('mac', 'display_ips', 'interface')
    search_fields = ('mac',)
    list_filter = ('interface',)
    autocomplete_fields = ('ip_addresses',)

    def display_ips(self, obj):
        ips = obj.ip_addresses.all()
        return ", ".join(ip.ip for ip in ips) if ips else "Нет IP-адресов"
    display_ips.short_description = "Связанные IP адреса"


@admin.register(Models)
class ModelsAdmin(admin.ModelAdmin):
    list_display = ('name', 'model_type', 'get_html_image', 'inventory_count')
    list_per_page = 20
    search_fields = ('name', 'model_type')
    readonly_fields = ('get_html_image', 'inventory_count')
    filter_horizontal = ('consumables',)
    
    def get_html_image(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="150" />')
        return "Нет изображения"
    get_html_image.short_description = "Изображение"
    
    def inventory_count(self, obj):
        return obj.inventory.count()
    inventory_count.short_description = "Кол-во оборудования"


class InventoryAttributeInline(admin.TabularInline):
    model = InventoryAttribute
    extra = 1


class MACInline(admin.TabularInline):
    model = MAC
    extra = 1
    fields = ('mac', 'interface', 'ip_addresses')
    readonly_fields = ('ip_addresses_display',)
    autocomplete_fields = ('ip_addresses',)
    
    def ip_addresses_display(self, obj):
        if obj.pk:
            return ", ".join([ip.ip for ip in obj.ip_addresses.all()])
        return "Сохраните для отображения IP"
    ip_addresses_display.short_description = "IP адреса"


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    inlines = (InventoryAttributeInline, MACInline)
    
    list_display = (
        'full_name',
        'get_html_image',
        'serial_number', 
        'model', 
        'mac_addresses_list',
        'ip_addresses_list',
        'status',
        'rooms',
        'current_responsible',
        'balance_price'
    )
    list_display_links = ('get_html_image', 'full_name')
    list_filter = ('status_real', 'status_doc')
    readonly_fields = ('get_html_image',)

    fieldsets = (
        ('Основная информация', {
            'fields': ('full_name', 'serial_number', 'model',)
        }),
        ('Изображение оборудования', {
            'fields': ('get_html_image', 'image'),
            'classes': ('wide',)
        }),
        ('Расположение оборудования', {
            'fields': ('room_real', 'room_doc'),
            'description': 'Номера помещений от 1 до 600'
        }),
        ('Статусы оборудования', {
            'fields': ('status_real', 'status_doc'),
            'classes': ('wide',)
        }),
        ('Финансовая информация', {
            'fields': ('current_responsible', 'balance_price'),
            'classes': ('wide',)
        }),
    )

    def mac_addresses_list(self, obj):
        macs = obj.mac_address.all()
        if macs:
            return ", ".join([f"{mac.mac} ({mac.interface})" for mac in macs])
        return "Нет MAC-адресов"
    mac_addresses_list.short_description = "MAC адреса"

    def ip_addresses_list(self, obj):
        ips = set()
        for mac in obj.mac_address.all():
            for ip in mac.ip_addresses.all():
                ips.add(ip.ip)
        return ", ".join(ips) if ips else "Нет IP-адресов"
    ip_addresses_list.short_description = "IP адреса"

    def get_html_image(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="150" />')
        return "Нет изображения"
    get_html_image.short_description = "Изображение"

    def status(self, obj):
        return f"{obj.status_real} {obj.status_doc}"
    status.short_description = "Статус"

    def rooms(self, obj):
        return f"{obj.room_real} {obj.room_doc}"
    rooms.short_description = "Комната"