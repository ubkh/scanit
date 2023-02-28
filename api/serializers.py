# Translates models into JSON objects
from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
    class Meta:
        model = get_user_model()
        fields = ['email', 'first_name', 'last_name', 'number', 'password']

    def create(self, validated_data):
        user_password = validated_data.get('password', None)
        db_instance = self.Meta.model(email=validated_data.get('email'), first_name=validated_data.get('first_name'), last_name=validated_data.get('last_name'), number=validated_data.get('number'))
        db_instance.set_password(user_password)
        db_instance.save()
        return db_instance

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
    token = serializers.CharField(max_length=255, read_only=True)

class UserVerificationSerializer(serializers.Serializer):
    verification_code = serializers.CharField(max_length=6, required=True)

    def validate_verification_code(self, value):
        if len(value) != 6:
            raise serializers.ValidationError('Verification code must contain 6 characters')

        return value
    
class UserPasswordResetSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    
class UserConfirmPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
    confirm_password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
