# Translates models into JSON objects
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
    
    class Meta:
        model = get_user_model()
        fields = ['email', 'first_name','last_name', 'number','store_address', 'password']

    def create(self, validated_data):
        user_password = validated_data.get('password', None)
        db_instance = self.Meta.model(email=validated_data.get('email'), first_name=validated_data.get('first_name'), last_name=validated_data.get('last_name'), number=validated_data.get('number'), store_address=validated_data.get('store_address'))
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
            print("banana bread")
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
class RetailerUploadItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['retailerID', 'barcodeID', 'name', 'description', 'price', 'quantity', 'expiry']

    # def validate_retailerID(self, value):
    #     if value 
    
    # def validate_barcodeID(self,value):

    # def validate_name(self,value):   

    # def validate_description(self,value):   

    # def validate_price(self,value):    

    # def validate_quantity(self,value):    

    # def validate_expiry(self,value):    
        

    # def create(self, validated_data):
    #     user_password = validated_data.get('password', None)
    #     product_instance = self.Meta.model(retailerID=validated_data.get('email'), first_name=validated_data.get('first_name'), last_name=validated_data.get('last_name'), number=validated_data.get('number'), store_address=validated_data.get('store_address'))
    #     product_instance.save()
    #     return product_instance
