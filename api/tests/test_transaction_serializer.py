from django.test import TestCase
from api.models import Transaction
from api.serializers import TransactionSerializer

class TransactionSerializerTest(TestCase):

    def setUp(self):
        
        self.transaction_data = {
            'shop': 'Test Shop',
            'customer': 'Test Customer',
            'products': ['Test Product 1', 'Test Product 2'],
            'amount': 100.00
        }

        self.serializer = TransactionSerializer(data=self.transaction_data)

    def test_serializer_with_invalid_shop(self):
        self.transaction_data['shop'] = ''
        serializer = TransactionSerializer(data=self.transaction_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('shop', serializer.errors)

    def test_serializer_with_invalid_customer(self):
        self.transaction_data['customer'] = ''
        serializer = TransactionSerializer(data=self.transaction_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('customer', serializer.errors)

