from django.test import TestCase
from api.models import Store
from api.serializers import StoreRegistrationSerializer


class StoreRegistrationSerializerTestCase(TestCase):
    def test_valid_data(self):
        data = {
            'name': 'Test Store',
            'description': 'A test store',
            'address': '123 Test St'
        }
        serializer = StoreRegistrationSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_missing_data(self):
        data = {
            'address': '123 Test St'
        }
        serializer = StoreRegistrationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {'name'})

    def test_create_store(self):
        data = {
            'name': 'Test Store',
            'description': 'A test store',
            'address': '123 Test St'
        }
        serializer = StoreRegistrationSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        store = serializer.save()
        self.assertIsInstance(store, Store)
        self.assertEqual(store.name, data['name'])
        self.assertEqual(store.description, data['description'])
        self.assertEqual(store.address, data['address'])

    def test_extra_data(self):
        data = {
            'name': 'Test Store',
            'description': 'A test store',
            'address': '123 Test St',
            'extra_field': 'should not be included'
        }
        serializer = StoreRegistrationSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        store = serializer.save()
        self.assertIsInstance(store, Store)
        self.assertEqual(store.name, data['name'])
        self.assertEqual(store.description, data['description'])
        self.assertEqual(store.address, data['address'])
        self.assertFalse(hasattr(store, 'extra_field'))

    def test_empty_string(self):
        data = {
            'name': '',
            'description': 'A test store',
            'address': '123 Test St'
        }
        serializer = StoreRegistrationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)

    def test_address_length(self):
        data = {
            'name': 'Test Store',
            'description': 'A test store',
            'address': 'a' * 201
        }
        serializer = StoreRegistrationSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('address', serializer.errors)