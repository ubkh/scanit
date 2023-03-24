# from django.test import TestCase
# from datetime import date
# from api.models import Product, Store
# from api.serializers import RetailerUploadItemSerializer


# class RetailerUploadItemSerializerTestCase(TestCase):

#     def setUp(self):
#         self.store = Store(name='My Store')
#         self.store.save()
   
#         self.valid_data = {
#             'barcode': '123456789',
#             'name': 'Test Product',
#             'description': 'This is a test product',
#             'price': '10.00',
#             'quantity': 5,
#             'expiry': date.today(),
#             'store': self.store.id,
#         }

#     def test_valid_data(self):
#         serializer = RetailerUploadItemSerializer(data=self.valid_data)
#         self.assertTrue(serializer.is_valid())
#         product = serializer.save()
#         self.assertEqual(Product.objects.count(), 1)
#         self.assertEqual(product.barcode, '123456789')
#         self.assertEqual(product.name, 'Test Product')
#         self.assertEqual(product.description, 'This is a test product')
#         self.assertEqual(product.price, 10.00)
#         self.assertEqual(product.quantity, 5)
#         self.assertEqual(product.expiry, date.today())
#         self.assertEqual(product.store, self.store)

#     def test_empty_barcode(self):
#         invalid_data = self.valid_data.copy()
#         invalid_data['barcode'] = ''
#         serializer = RetailerUploadItemSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         self.assertEqual(serializer.errors['barcode'][0], 'Product barcode is invalid.')

#     def test_empty_name(self):
#         invalid_data = self.valid_data.copy()
#         invalid_data['name'] = ''
#         serializer = RetailerUploadItemSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         self.assertEqual(serializer.errors['name'][0], 'Name cannot be empty.')

#     def test_empty_description(self):
#         invalid_data = self.valid_data.copy()
#         invalid_data['description'] = ''
#         serializer = RetailerUploadItemSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         self.assertEqual(serializer.errors['description'][0], 'Description cannot be empty.')

#     def test_negative_price(self):
#         invalid_data = self.valid_data.copy()
#         invalid_data['price'] = '-10.00'
#         serializer = RetailerUploadItemSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         self.assertEqual(serializer.errors['price'][0], 'Price cannot be negative.')

#     def test_invalid_price(self):
#         invalid_data = self.valid_data.copy()
#         invalid_data['price'] = 'not a price'
#         serializer = RetailerUploadItemSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         self.assertEqual(serializer.errors['price'][0], 'Invalid price entered.')

#     def test_negative_quantity(self):
#         invalid_data = self.valid_data.copy()
#         invalid_data['quantity'] = -5
#         serializer = RetailerUploadItemSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         self.assertEqual(serializer.errors['quantity'][0], 'Quantity cannot be less than zero.')

#     def test_invalid_expiry(self):
#         invalid_data = self.valid_data.copy()
#         invalid_data['expiry'] = 'not a date'
#         serializer = RetailerUploadItemSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         self.assertEqual(serializer.errors['expiry'][0], 'Invalid date entered.')

#     def test_invalid_store(self):
#         invalid_data = self.valid_data.copy()
#         invalid_data['store'] = 999  # non-existent store id
#         serializer = RetailerUploadItemSerializer(data=invalid_data)
#         self.assertFalse(serializer.is_valid())
#         # self.assertEqual(serializer.errors['store'][0], 'Invalid pk "999