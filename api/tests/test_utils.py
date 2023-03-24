from django.test import TestCase
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
from unittest.mock import patch, Mock
from api import utils


class TestUtils(TestCase):
    def setUp(self):
        self.user_model = get_user_model()
        self.user = self.user_model.objects.create_user(
            email='testuser', password='testpass'
        )

    def test_generate_access_token(self):
        token = utils.generate_access_token(self.user)
        self.assertIsNotNone(token)

    def test_get_logged_in_user_with_valid_token(self):
        payload = {
            'user_id': self.user.user_id,
            'exp': datetime.utcnow() + timedelta(days=1, minutes=0),
            'iat': datetime.utcnow(),
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        with patch('jwt.decode', return_value=payload):
            user = utils.get_logged_in_user(token)
            self.assertIsNotNone(user)
            self.assertEqual(user, self.user)
