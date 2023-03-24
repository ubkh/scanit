from django.test import TestCase
from rest_framework import serializers
from api.serializers import (

    UserVerificationSerializer,
    
    ) 

class UserVerificationSerializerTestCase(TestCase):
    
    def setUp(self):
        self.valid_verification_code = '123456'
        self.invalid_verification_code = '12345'
        
    def test_valid_verification_code(self):
        serializer_data = {'verification_code': self.valid_verification_code}
        serializer = UserVerificationSerializer(data=serializer_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['verification_code'], self.valid_verification_code)
        
    def test_invalid_verification_code(self):
        serializer_data = {'verification_code': self.invalid_verification_code}
        serializer = UserVerificationSerializer(data=serializer_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(len(serializer.errors), 1)
        self.assertEqual(serializer.errors['verification_code'][0], 'Verification code must contain 6 characters')