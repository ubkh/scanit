from django.urls import reverse
from rest_framework import status
from decimal import Decimal
from datetime import date, timedelta
from rest_framework.test import APITestCase
from api.models import Store, Product

class ProductByBarcodeAndStoreListTests(APITestCase):
    def setUp(self):
        self.store1 = Store(name='Test Store', description='This is a test store', barcode='123456')
        self.store1.save()

        self.store2 = Store(name='Test Store2', description='This is a test store 2', barcode='654321')
        self.store2.save()

        self.product= Product.objects.create(
            name='Test Product',
            price=Decimal('10.00'),
            quantity=5,
            expiry=date.today() + timedelta(days=30),
            barcode='1234567890123',
            store=self.store1,
        )

        self.url = reverse('check-product')
    
    def test_get_store_by_barcode(self):
        response = self.client.get(f"{self.url}?barcode=1234567890123&store_barcode=123456")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Product')
    
    def test_get_wrong_store_by_barcode(self):
        response = self.client.get(f"{self.url}?barcode=1234567890123&store_barcode=1234564244")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)