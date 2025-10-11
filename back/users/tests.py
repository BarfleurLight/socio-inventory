from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()


class CustomUserModelTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user_default = User.objects.create_user(
            username='default_user',
            email='user@example.com',
            first_name='Иван',
            last_name='Петров'
        )
        
        cls.user_admin = User.objects.create_user(
            username='admin_user',
            email='admin@example.com',
            first_name='Илья',
            last_name='Сидоров',
            user_type=User.ADMIN
        )
        
        cls.user_accountant = User.objects.create_user(
            username='accountant_user',
            email='accountant@example.com',
            first_name='Пётр',
            last_name='Иванов',
            user_type=User.ACCOUNTANT
        )

    def test_user_created_with_default_user_type(self):
        """The default user is created as USER type."""
        self.assertEqual(self.user_default.user_type, User.USER)
        self.assertTrue(self.user_default.is_user)
        self.assertFalse(self.user_default.is_accountant)
        self.assertFalse(self.user_default.is_admin)

    def test_user_can_be_created_with_admin_type(self):
        """You can create a user with the ADMIN type."""
        self.assertEqual(self.user_admin.user_type, User.ADMIN)
        self.assertTrue(self.user_admin.is_admin)
        self.assertFalse(self.user_admin.is_user)
        self.assertFalse(self.user_admin.is_accountant)

    def test_user_can_be_created_with_accountant_type(self):
        """You can create a user with the ACCOUNTANT type."""
        self.assertEqual(self.user_accountant.user_type, User.ACCOUNTANT)
        self.assertTrue(self.user_accountant.is_accountant)
        self.assertFalse(self.user_accountant.is_user)
        self.assertFalse(self.user_accountant.is_admin)
