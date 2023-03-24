
from django.test import TestCase
from api.models import Store

class StoreModelTestCase(TestCase):
    def setUp(self):
        self.store = Store(name='Test Store', barcode='123456')
        self.store.save()

    def test_store_creation(self):
        self.assertTrue(isinstance(self.store, Store))
        # self.assertEqual(self.store.__str__(), self.store.name)
        self.assertEqual(self.store.barcode, "123456")

    def test_store_update(self):
        self.store.barcode = "654321"
        self.store.save()
        updated_store = Store.objects.get(id=self.store.id)
        self.assertEqual(updated_store.barcode, "654321")
        
    def test_store_deletion(self):
        store_id = self.store.id
        self.store.delete()
        with self.assertRaises(Store.DoesNotExist):
            Store.objects.get(id=store_id)