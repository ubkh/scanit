from django.test import TestCase
from django.core.exceptions import ValidationError
from decimal import Decimal
from datetime import date, timedelta
from api.models import Product, Store

class ProductModelTestCase(TestCase):
    
    def setUp(self):
        self.store = Store(name='Test Store', description='This is a test store')
        self.store.save()

        self.product= Product.objects.create(
            name='Test Product',
            price=Decimal('10.00'),
            quantity=5,
            expiry=date.today() + timedelta(days=30),
            barcode='1234567890123',
            store=self.store,
        )

    def _assert_product_is_valid(self):
        try:
            self.product.full_clean()
        except (ValidationError):
            self.fail("Product details should be valid")
    
    def _assert_product_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.product.full_clean()
    
    
    def test_product_creation(self):
        product = Product.objects.create(
            name='Test Product',
            price=Decimal('10.00'),
            quantity=5,
            expiry=date.today() + timedelta(days=30),
            barcode='1234567890123',
            store=self.store,
        )
        self.assertEqual(Product.objects.count(), 2)
        self.assertEqual(product.name, 'Test Product')
        self.assertEqual(product.price, Decimal('10.00'))
        self.assertEqual(product.quantity, 5)
        self.assertEqual(product.expiry, date.today() + timedelta(days=30))
        self.assertEqual(product.barcode, '1234567890123')
        self.assertEqual(product.store, self.store)
    
    def test_invalid_expiry_date(self):
        with self.assertRaises(ValidationError):
            product = Product.objects.create(
                name='Test Product',
                price=Decimal('10.00'),
                quantity=5,
                expiry=date.today() - timedelta(days=1),
                barcode='1234567890123',
                store=self.store,
            )
    
    def test_invalid_barcode(self):
        with self.assertRaises(ValidationError):
            product = Product.objects.create(
                name='Test Product',
                price=Decimal('10.00'),
                quantity=5,
                expiry=date.today() + timedelta(days=30),
                barcode='abc123',
                store=self.store,
            )

    def test_price_validation(self):
        # Test that a valid price is accepted
        self.product.price = Decimal('1.23')
        self.product.clean_fields()
        self.product.full_clean()
        self.product.save()

    # Test that a price of 0 is accepted
    def sixdigit_price_validation(self):
        self.product.price = Decimal('0')
        self.product.clean_fields()
        self.product.full_clean()
        self.product.save()

       
    # Test that a price with more than 6 digits is not accepted
    def sixdigit_price_validation(self):
        with self.assertRaises(ValidationError):
            self.product.price = Decimal('123456.78')
            self.product.clean_fields()
            self.product.full_clean()
            self.product.save()
            self._assert_product_is_invalid()


    # Test that a price with more than 2 decimal places is not accepted
    def decimal_price_validation(self):
        with self.assertRaises(ValidationError):
            self.product.price = Decimal('1.234')
            self.product.clean_fields()
            self.product.full_clean()
            self.product.save()
            self._assert_product_is_invalid()

    
    # Test that a negative price is not accepted
    def negative_price_validation(self):
            with self.assertRaises(ValidationError):
                self.product.price = Decimal('-1.23')
                self.product.clean_fields()
                self.product.full_clean()
                self.product.save()
                self._assert_product_is_invalid()

    def test_quantity_validation(self):
        # Test that a valid quantity is accepted
        self.product.quantity = 1
        self.product.clean_fields()
        self.product.full_clean()
        self.product.save()

        # Test that a quantity less than 1 is not accepted
        with self.assertRaises(ValidationError):
            self.product.quantity = 0
            self.product.clean_fields()
            self.product.full_clean()
            self.product.save()

        # Test that a quantity of 1 is accepted
        self.product.quantity = 1
        self.product.clean_fields()
        self.product.full_clean()
        self.product.save()

        # Test that a quantity greater than 1 is accepted
        self.product.quantity = 100
        self.product.clean_fields()
        self.product.full_clean()
        self.product.save()

    def test_too_long_name(self):
        string = "Kebab"
        for _ in range(100):
            self.product.name += string
        self._assert_product_is_invalid()
    
    def test_too_long_desc(self):
        string = "Impeccable kebab"
        for _ in range(100):
            self.product.description += string
        self._assert_product_is_invalid()

    def test_past_expiry(self):
        self.product.expiry = "1945-05-08"
        self._assert_product_is_invalid() 