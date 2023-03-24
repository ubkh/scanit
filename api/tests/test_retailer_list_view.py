from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Store, User

class RetailerListTests(APITestCase):

    def setUp(self):
            self.store = Store(name='Test Store', description='This is a test store', barcode='123456')
            self.store.save()

            self.user1 = User.objects.create(
                email='teststaff@example.com',
                first_name='Test',
                last_name='Staff',
                number='01234567891',
                account_type=User.Account.RETAIL_STAFF,
                verification_code='123456',
                employed_at=self.store
            )

            self.user2 = User.objects.create(
                email='testowner@example.com',
                first_name='Test',
                last_name='Owner',
                number='01234567890',
                account_type=User.Account.RETAIL_OWNER,
                verification_code='654321',
                employed_at=self.store
            )

            self.user3 = User.objects.create(
            email='testuser@example.com',
            first_name='Test',
            last_name='User',
            number='01234567890',
            account_type=User.Account.CUSTOMER,
            verification_code='123657'
            )

            self.url = reverse('get-all-retailers')

    def test_get_all_retailers(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
    