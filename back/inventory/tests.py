from django.test import TestCase
from django.core.exceptions import ValidationError
from inventory.models import Responsible, Inventory, MAC, IP


class ResponsibleModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        cls.responsible_with_patronymic = Responsible.objects.create(
            name='Иван',
            surname='Петров',
            patronymic='Сергеевич'
        )

        cls.responsible_with_blank_patronymic = Responsible.objects.create(
            name='Мария',
            surname='Иванова',
            patronymic=''  
        )

        cls.responsible_with_spaces = Responsible.objects.create(
            name='  Анна  ',
            surname='  Сидорова  ',
            patronymic='  Владимировна  '
        )

    def test_get_full_name_with_patronymic(self):
        """Checking the formation of a full name with a patronymic."""
        responsible = ResponsibleModelTest.responsible_with_patronymic
        expected_full_name = 'Петров Иван Сергеевич'
        self.assertEqual(responsible.get_full_name(), expected_full_name)
        self.assertEqual(str(responsible), expected_full_name)

    def test_get_full_name_with_blank_patronymic(self):
        """Checking the formation of a full name with an empty patronymic."""
        responsible = ResponsibleModelTest.responsible_with_blank_patronymic
        expected_full_name = 'Иванова Мария'
        self.assertEqual(responsible.get_full_name(), expected_full_name)
        self.assertEqual(str(responsible), expected_full_name)

    def test_get_full_name_with_spaces(self):
        """Checking the formation of a full name with extra spaces."""
        responsible = ResponsibleModelTest.responsible_with_spaces
        expected_full_name = '  Сидорова     Анна     Владимировна  '
        self.assertEqual(responsible.get_full_name(), expected_full_name)
        self.assertEqual(str(responsible), expected_full_name)


class MACModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        cls.inventory = Inventory.objects.create(
            full_name='Test Inventory',
            serial_number='000123123123'
        )

        cls.ip = IP.objects.create(ip='192.168.1.1')

    def test_create_mac_with_required_fields_only(self):
        """Generate MAC address with required fields only."""
        mac_data = {
            'mac': '00:1B:44:11:3A:B7',
            'interface': 'ethernet'
        }
        
        mac = MAC.objects.create(**mac_data)
        
        self.assertEqual(mac.mac, '00:1b:44:11:3a:b7')
        self.assertEqual(mac.interface, 'ethernet')
        self.assertIsNone(mac.inventory)
        self.assertEqual(mac.ip_addresses.count(), 0)

    def test_create_mac_with_all_fields(self):
        """Generate MAC address with all fields only."""
        mac_data = {
            'mac': '00:1B:44:11:3A:B7',
            'interface': 'ethernet',
            'inventory': MACModelTest.inventory
        }
        
        mac = MAC.objects.create(**mac_data)
        mac.ip_addresses.set([MACModelTest.ip,])

        self.assertEqual(mac.mac, '00:1b:44:11:3a:b7')
        self.assertEqual(mac.interface, 'ethernet')
        self.assertEqual(mac.inventory, MACModelTest.inventory)
        self.assertEqual(mac.ip_addresses.count(), 1)

    def test_valid_mac_address_formats(self):
        """Checking valid MAC address formats."""
        valid_macs = [
            '00:1B:44:11:3A:B7',
            '00-1B-44-11-3A-B7',
            'a1:b2:c3:d4:e5:f6',
            'A1-B2-C3-D4-E5-F6',
        ]
        
        for valid_mac in valid_macs:
            with self.subTest(mac=valid_mac):
                mac = MAC(
                    mac=valid_mac,
                    interface='ethernet'
                )
                try:
                    mac.full_clean()
                except ValidationError:
                    self.fail(
                        f"The MAC address {valid_mac} failed validation."
                    )

    def test_invalid_mac_address_formats(self):
        """Checking for invalid MAC address formats."""
        invalid_macs = [
            '00:1B:44:11:3A:B7:XX',  
            '00:1B:44:11:3A',        
            '00:1B:44:11:3A:BG',     
            '001B44113AB7',          
            '00.1B.44.11.3A.B7',     
            '',                      
            '  ',                    
        ]
        
        for invalid_mac in invalid_macs:
            with self.subTest(mac=invalid_mac):
                mac = MAC(
                    mac=invalid_mac,
                    interface='ethernet'
                )
                with self.assertRaises(ValidationError):
                    mac.full_clean()