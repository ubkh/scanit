from django.test import TestCase
from api.models import User, Store
from django.core.exceptions import ValidationError


class UserModelTestCase(TestCase):
    
    def setUp(self):
        self.user = User.objects.create(
            email='testuser@example.com',
            first_name='Test',
            last_name='User',
            number='01234567890',
            account_type=User.Account.CUSTOMER,
            verification_code='123456'
        )
        
    def test_user_str(self):
        self.assertEqual(str(self.user), 'Test User')
    
    def test_user_email_unique(self):
        with self.assertRaises(Exception) as context:
            User.objects.create(
                email='testuser@example.com',
                first_name='Test2',
                last_name='User2',
                number='12345678901',
                account_type=User.Account.CUSTOMER,
                verification_code='654321'
            )
        self.assertTrue('UNIQUE constraint failed' in str(context.exception))
   
    # Define a test to check that the verification code for a user is of length 6
    def test_user_verification_code_length(self):
        self.assertEqual(len(self.user.verification_code), 6)    

    # Define a test to check that the is_verified attribute of a user is False by default
    def test_user_is_verified_default(self):
        self.assertFalse(self.user.is_verified)
        
    # Define a test to check that the date_joined attribute of a user is set automatically on creation
    def test_user_date_joined_auto_now_add(self):
        # Ensure the date_joined field is set automatically on creation
        self.assertIsNotNone(self.user.date_joined)

    # Define a test to check that the is_active attribute of a user is True by default
    def test_user_is_active_default(self):
        self.assertTrue(self.user.is_active)

    # Define a test to check that the employed_at attribute of a user is null by default
    def test_user_employed_at_null(self):
        self.assertIsNone(self.user.employed_at)

    def test_user_account_type_choices_values(self):
        self.assertEqual(User.Account.CUSTOMER, 1)
        self.assertEqual(User.Account.RETAIL_STAFF, 2)
        self.assertEqual(User.Account.RETAIL_OWNER, 3)
        self.assertEqual(User.Account.DIRECTOR, 4)

    def test_user_account_type_display(self):
        self.assertEqual(self.user.get_account_type_display(), 'Customer')
       
    def test_user_has_perm_false(self):
        self.assertFalse(self.user.has_perm('api.change_user'))
        
    def test_user_number_regex(self):
        with self.assertRaises(ValidationError) as context:
            self.user.number = '012345'
            self.user.full_clean()
        self.assertEqual(context.exception.message_dict['number'][0], 'Phone number must have 11 digits.')
        
    def test_user_email_max_length(self):
        max_length = self.user._meta.get_field('email').max_length
        self.assertEqual(max_length, 100)

    def test_user_first_name_max_length(self):
        max_length = self.user._meta.get_field('first_name').max_length
        self.assertEqual(max_length, 32)

    def test_user_last_name_max_length(self):
        max_length = self.user._meta.get_field('last_name').max_length
        self.assertEqual(max_length, 32)

    # Define a test to check that the display of the account type of a user is as expected
    def test_user_number_max_length(self):
        max_length = self.user._meta.get_field('number').max_length
        self.assertEqual(max_length, 11)

    # Define a test to check that the number field of a user is validated correctly using a regular expression
    def test_user_number_regex_valid(self):
        self.user.number = '01234567890'
        self.user.save()
        self.assertEqual(self.user.number, '01234567890')
    
    def test_user_employed_at_foreign_key(self):
        store = Store(name='Test Store', description='This is a test store')
        store.save()
        user = User.objects.create(
            email='testuser2@example.com',
            first_name='Test2',
            last_name='User2',
            number='12345678901',
            account_type=User.Account.RETAIL_STAFF,
            employed_at=store,
            verification_code='654321'
        )
        self.assertEqual(user.employed_at, store)