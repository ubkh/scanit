# Translates models into JSON objects
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, Store, User

import datetime



class StoreRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['name', 'description', 'address']

    def validate(self, data):

        print("see if something prints")
        print(data)

        return data

    def create(self, validated_data):
        # store = Store.objects.create(**validated_data)
        # print("print a string as well")
        # print(self)
        # print(validated_data)
        store_address = validated_data['address']
        store_name = validated_data['name']
        store_description = validated_data['description']


        # print("over here creating")
        # store = self.Meta.model(name=validated_data.get('name'),
        #                         description=validated_data.get('description'),
        #                         address=validated_data.get('address')
        #                         )
        # print("model made")
        # store.save()
        # print("model saved")
        # return store

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
        # fields = ['email', 'first_name', 'last_name', 'number', 'password', 'account_type', 'employed_at_id']
        fields = ['email', 'first_name', 'last_name', 'number', 'password', 'account_type']

    def create(self, validated_data):
        user_password = validated_data.get('password', None)
        account_type = validated_data.get('account_type')
        # employed_at_id = validated_data.get('employed_at_id', None)
        # employed_at = None

        # if account_type == User.Account.RETAIL_STAFF:
        #     employed_at = Store.objects.get(id=employed_at_id)

        # if account_type == User.Account.RETAIL_OWNER:
        #     print("im here abc")
        #     print(self.data)
        #     store_serializer = StoreRegistrationSerializer(data=self.data)
        #     print("im here a")
        #     store_instance = store_serializer.save()
        #     print("im here b")
        #     validated_data['employed_at'] = store_instance
        #     print("im here c")

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
            print("banana bread")
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
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
        
        # if not (isinstance(value, float) or isinstance(value,int)):
        #     raise serializers.ValidationError("Invalid price entered.")

        # if value < 0:
        #     raise serializers.ValidationError("Price cannot be negative.")
        # return value

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

        print("id is ", value)
        # print("store is ", Store.objects.filter(id=value))
        # stores = Store.objects.get(id = value)

        # if stores.count() == 0:
        #     raise serializers.ValidationError("Store does not exist.")
        
        # if isinstance(value, Store):
        #     raise serializers.ValidationError("Store does not exist.")
        
        return value


    def create(self,validated_data):

        print("store id ting is ", validated_data)

        # store = Store.objects.get(id=validated_data.get('store_id'))
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



    # def create(self, validated_data):
    #     user_password = validated_data.get('password', None)
    #     product_instance = self.Meta.model(retailerID=validated_data.get('email'), first_name=validated_data.get('first_name'), last_name=validated_data.get('last_name'), number=validated_data.get('number'), store_address=validated_data.get('store_address'))
    #     product_instance.save()
    #     return product_instance
