from django.test import TestCase
from inventory.models import Responsible


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