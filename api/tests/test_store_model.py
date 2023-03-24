from django.test import TestCase
from api.models import Store
from django.db import IntegrityError

class StoreModelTests(TestCase):
    def test_save(self):
        # Create a store instance
        store = Store(name='Test Store', description='This is a test store')
        store.save()

        # Check that the store instance has an ID and a barcode
        self.assertIsNotNone(store.id)
        self.assertIsNotNone(store.barcode)

        # # # Try saving another store instance with the same barcode
        # store2 = Store(name='Another Test Store', description='This is another test store', barcode=store.barcode)
        # store2.save()
        # self.assertRaises(IntegrityError)


    def test_generate_barcode(self):
        # Create a store instance without a barcode
        store = Store(name='Test Store', description='This is a test store')
        store.save()

        # Check that the store instance has a generated barcode
        self.assertIsNotNone(store.barcode)

        # Try generating barcodes for multiple store instances
        for i in range(5):
            store = Store(name='Test Store {}'.format(i+1), description='This is another test store')
            store.save()
            self.assertIsNotNone(store.barcode)

        # Try generating a barcode for a store instance with a specific barcode value
        store = Store(name='Test Store', description='This is a test store', barcode='1234567890123')
        store.save()
        self.assertEqual(store.barcode, '1234567890123')

    def test_address_optional(self):
        # Create a store instance without an address
        store = Store(name='Test Store', description='This is a test store')
        store.save()

        # Check that the store instance does not have an address
        self.assertIsNone(store.address)

    def test_description_optional(self):
        # Create a store instance without a description
        store = Store(name='Test Store', barcode='1234567890123')
        store.save()

        # Check that the store instance does not have a description
        self.assertEqual(store.description, '')

    def test_barcode_uniqueness(self):
        # Create a store instance with a specific barcode
        store = Store(name='Test Store', description='This is a test store', barcode='1234567890123')
        store.save()

        # Try creating another store instance with the same barcode
        with self.assertRaises(IntegrityError):
            store2 = Store(name='Another Test Store', description='This is another test store', barcode='1234567890123')
            store2.save()