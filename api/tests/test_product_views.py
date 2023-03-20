from django.test import TestCase
from django.urls import reverse
from api.models import Product
import json
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed

UNHASHED_RETAILER_PASS = "BigBarack00"

class AddProductViewTestCase(TestCase):
    fixtures = [
        "api/tests/fixtures/default_retailer.json"
    ]

    def setUp(self):
        self.json = {
            "name": "IQ enhancing pills",
            "description": "Become more intelligent only by ingesting these",
            "price": 395,
            "quantity": 25,
            "expiry": "2023-10-10",
            "barcode": "2100210021",
        }
        self.retailer = get_user_model().objects.get(user_id = 1)

    def send_req(self):
        return self.client.post(reverse("retailer-add-product"), json.dumps(self.json), content_type="application/json; charset=utf-8")

    def log_in(self):
        return self.client.post(reverse("user_login"), {"email": self.retailer.email, "password": UNHASHED_RETAILER_PASS})

    def test_unauth_retailer_add_product(self):
        before = Product.objects.filter(retailer = self.retailer).count()
        # with self.assertRaises(AuthenticationFailed):
        res = self.send_req()
        self.assertEqual(res.status_code, 401)
        after = Product.objects.filter(retailer = self.retailer).count()
        self.assertEqual(before, after)

    def test_add_valid_product(self):
        before = Product.objects.filter(retailer = self.retailer).count()
        login = self.log_in()
        self.assertEqual(login.status_code, 200)
        self.assertIn('access_token', login.cookies)
        res = self.send_req()
        self.assertEqual(res.status_code, 200)
        after = Product.objects.filter(retailer = self.retailer).count()
        self.assertEqual(before + 1, after)

    def test_add_product_invalid_expiry(self):
        before = Product.objects.filter(retailer = self.retailer).count()
        self.log_in()
        self.json["expiry"] = "2025-25-25"
        res = self.send_req()
        self.assertEqual(res.status_code, 400)
        after = Product.objects.filter(retailer = self.retailer).count()
        self.assertEqual(before, after)

    def test_update_product(self):
        self.log_in()
        res = self.send_req()
        self.assertEqual(res.status_code, 200)
        before = Product.objects.filter(retailer = self.retailer).count()
        prev_quantity = self.json["quantity"]
        self.json["quantity"] = 10
        next_res = self.send_req()
        self.assertEqual(next_res.status_code, 200)
        added_product = Product.objects.filter(retailer = self.retailer).first()
        self.assertEqual(added_product.quantity, prev_quantity + self.json["quantity"])
        after = Product.objects.filter(retailer = self.retailer).count()
        self.assertEqual(before, after)

    # testing if full_clean() is called when updating the product entry
    def test_update_product_invalid_expiry(self):
        self.log_in()
        res = self.send_req()
        self.assertEqual(res.status_code, 200)
        self.json["expiry"] = "2025-25-25"
        next_res = self.send_req()
        self.assertEqual(next_res.status_code, 400)
        product_obj = Product.objects.filter(retailer = self.retailer).first()
        self.assertNotEqual(product_obj.expiry, self.json["expiry"])

class GetProductViewTestCase(TestCase):
    fixtures = [
        "api/tests/fixtures/default_retailer.json", 
        "api/tests/fixtures/default_product.json",
    ]

    def setUp(self):
        self.barcode = "5050404"    # default_product fixture barcode
        self.retailer = get_user_model().objects.get(user_id = 1)

    def log_in(self):
        return self.client.post(reverse("user_login"), {"email": self.retailer.email, "password": UNHASHED_RETAILER_PASS})

    def send_req(self):
        return self.client.get(reverse("retailer-get-product", args=[self.barcode]))

    
    def test_unauth_retailer_get_product(self):
        # with self.assertRaises(AuthenticationFailed):
        res = self.send_req()
        self.assertEqual(res.status_code, 401)

    def test_valid_get_product(self):
        self.log_in()
        res = self.send_req()
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["barcode"], self.barcode)

    def test_invalid_get_product(self):
        self.log_in()
        self.barcode = "21212121"
        res = self.send_req()
        self.assertEqual(res.status_code, 400)

        
