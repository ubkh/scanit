from django.test import TestCase
from django.core.exceptions import ValidationError
from api.models import Product

class ProductModelTestCase(TestCase):
    fixtures = [
        "api/tests/fixtures/default_product.json"
    ]

    def setUp(self):
        self.product = Product.objects.get(id = 1)

    def _assert_product_is_valid(self):
        try:
            self.product.full_clean()
        except (ValidationError):
            self.fail("Product details should be valid")
    
    def _assert_product_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.product.full_clean()
    
    def test_is_valid_product(self):
        self._assert_product_is_valid()

    def test_not_unique_name(self):
        notUniqueProd = Product(name= "Copium", price= 4.00, quantity= 25, expiry= "2022-10-10")
        with self.assertRaises(ValidationError):
            notUniqueProd.validate_unique()

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

    def test_integer_price(self):
        self.product.price = 5
        self._assert_product_is_valid()

    def test_invalid_decimal_price(self):
        self.product.price = 5.0101
        self._assert_product_is_invalid()

    def test_negative_price(self):
        self.product.price = -3.25
        self._assert_product_is_invalid()

    def test_invalid_quantity(self):
        self.product.quantity = 0
        self._assert_product_is_invalid()

    def test_past_expiry(self):
        self.product.expiry = "1945-05-08"
        self._assert_product_is_invalid()
    
    