# Translates models into JSON objects
from rest_framework import serializers
import json
from django.contrib.auth import get_user_model
from .models import Product, Store
from .models import Transaction
import datetime

class StoreRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['name', 'description', 'address']

    def validate(self, data):

        return data

    def create(self, validated_data):
        store_address = validated_data['address']
        store_name = validated_data['name']
        store_description = validated_data['description']

        store = self.Meta.model(address=store_address,
                                name=store_name,
                                description=store_description,
                                )
        store.save()
        return store

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
    
    class Meta:
        model = get_user_model()
        fields = ['email', 'first_name', 'last_name', 'number', 'password', 'account_type']

    def create(self, validated_data):
        user_password = validated_data.get('password', None)
        account_type = validated_data.get('account_type')
        db_instance = self.Meta.model(email=validated_data.get('email'),
                                    first_name=validated_data.get('first_name'), 
                                    last_name=validated_data.get('last_name'), 
                                    number=validated_data.get('number'), 
                                    account_type=account_type,
                                    # employed_at=employed_at
                                    )
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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['user_id', 'email', 'first_name', 'last_name', 'number', 'is_active',
                  'account_type', 'verification_code', 'is_verified', 'date_joined']

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    store = StoreSerializer()

    class Meta:
        model = Product
        fields = '__all__'

class RetailerSerializer(serializers.ModelSerializer):
    employed_at = StoreSerializer()

    class Meta:
        model = get_user_model()
        fields = ['user_id', 'email', 'first_name', 'last_name', 'number', 'is_active',
                  'account_type', 'employed_at', 'verification_code', 'is_verified', 'date_joined']

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = ['date', 'transaction_id', 'shop', 'customer', 'amount','products']

    def validate_shop(self, value):
        return value
    
    def validate_customer(self, value):
        return value
    
    def validate_products(self, value):
        return json.dumps(value)

    def validate_amount(self, value):
        return value

    def create(self,validated_data):
        product = self.Meta.model(
                                shop=validated_data.get('shop'),
                                customer=validated_data.get('customer'),
                                products=validated_data.get('products'),
                                amount=validated_data.get('amount')
                                )

        product.save()
        return product
    
class RetailerUploadItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['barcode', 'name', 'description', 'price', 'quantity', 'expiry', 'store']

    
    def validate_barcode(self,value):
        if value == "":
            raise serializers.ValidationError("Product barcode is invalid.")
        return value
    
    
    def validate_name(self,value):   
        if value == "":
            raise serializers.ValidationError("Name cannot be empty.")
        return value
        
    def validate_description(self,value):
        if value == "":
            raise serializers.ValidationError("Description cannot be empty.")
        return value

    def validate_price(self,value):
        try:
            price = float(value)

            if (price < 0):
                raise serializers.ValidationError("Price cannot be negative.")
            
            return value
        
        except ValueError as e:
            raise serializers.ValidationError("Invalid price entered.")    

    def validate_quantity(self,value):
        if not (isinstance(value, int)):
            raise serializers.ValidationError("Quantity must be an integer.")
        
        if value < 0:
            raise serializers.ValidationError("Quantity cannot be less than zero.")
        return value

    def validate_expiry(self,value):    
        if not isinstance(value, datetime.date):
            raise serializers.ValidationError("Invalid date entered.")
        
        return value
    
    def validate_store(self, value):
        return value

    def create(self,validated_data):
        
        product = self.Meta.model(
                                barcode=validated_data.get('barcode'),
                                name=validated_data.get('name'),
                                description=validated_data.get('description'),
                                price=validated_data.get('price'),
                                quantity=validated_data.get('quantity'),
                                expiry=validated_data.get('expiry'),
                                store=validated_data.get('store'),
                                )
        product.save()
        return product