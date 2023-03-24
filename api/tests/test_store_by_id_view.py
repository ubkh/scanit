from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Store

class StoreByUserIDListTests(APITestCase):
    
    def setUp(self):
        self.store = Store(name='Test Store', description='This is a test store', barcode='123456')
        self.store.save()
        self.url = reverse('get-stores-by-shop-id')

    def test_get_all_stores(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_store_by_barcode(self):
        response = self.client.get(f"{self.url}?id=1")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Store')

    def test_get_store_by_non_existing_barcode(self):
        response = self.client.get(f"{self.url}?id=999")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)