import uuid
from django.test import TestCase
from decimal import Decimal
from api.models import Transaction, Store, User


class TransactionModelTestCase(TestCase):
    
    def setUp(self):
        self.store = Store(name='Test Store', description='This is a test store')
        self.store.save()
        self.customer = User.objects.create(
            email='testuser@example.com',
            first_name='Test',
            last_name='User',
            number='01234567890',
            account_type=User.Account.CUSTOMER,
            verification_code='123456'
        )       
        self.transaction = Transaction.objects.create(
            shop=self.store,
            customer=self.customer,
            products=[{'name': 'Product 1', 'price': 10.0}, {'name': 'Product 2', 'price': 20.0}],
            amount=30.0
        )
    
    def test_transaction_id_is_unique(self):
        """
        Test that the transaction_id field is unique
        """
        new_transaction = Transaction.objects.create(
            shop=self.store,
            customer=self.customer,
            products=[{'name': 'Product 3', 'price': 30.0}],
            amount=30.0
        )
        self.assertNotEqual(self.transaction.transaction_id, new_transaction.transaction_id)
    
    def test_transaction_shop_and_customer_are_foreign_keys(self):
        """
        Test that the shop and customer fields are foreign keys
        """
        self.assertIsInstance(self.transaction.shop, Store)
        self.assertIsInstance(self.transaction.customer, User)
    
    def test_transaction_date_is_auto_generated(self):
        """
        Test that the date field is automatically generated
        """
        self.assertIsNotNone(self.transaction.date)
    
    def test_transaction_products_is_json_field(self):
        """
        Test that the products field is a JSON field
        """
        self.assertIsInstance(self.transaction.products, list)
    
    def test_transaction_amount_is_nullable(self):
        """
        Test that the amount field is nullable
        """
        new_transaction = Transaction.objects.create(
            shop=self.store,
            customer=self.customer,
            products=[{'name': 'Product 3', 'price': 30.0}],
        )
        self.assertIsNone(new_transaction.amount)

        
    def test_transaction_products_total_is_equal_to_amount(self):
        """
        Test that the total price of the products is equal to the amount
        """
        total_price = sum(product['price'] for product in self.transaction.products)
        self.assertEqual(self.transaction.amount, Decimal(total_price))

    def test_transaction_products_have_name_and_price(self):
        """
        Test that each product in the products field has a name and a price
        """
        for product in self.transaction.products:
            self.assertIn('name', product)
            self.assertIn('price', product)
    