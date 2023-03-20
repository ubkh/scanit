# Translates models into JSON objects
from rest_framework import serializers
from django.contrib.auth import get_user_model
<<<<<<< HEAD
from .models import Transaction
=======
from .models import Product, Store, User

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
        print("print a string as well")
        print(self)
        print(validated_data)
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
>>>>>>> item-loader

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
    
    class Meta:
        model = get_user_model()
        fields = ['email', 'first_name', 'last_name', 'number', 'password', 'account_type', 'employed_at_id']

    def create(self, validated_data):
        user_password = validated_data.get('password', None)
        account_type = validated_data.get('account_type')
        employed_at_id = validated_data.get('employed_at_id', None)
        employed_at = None

        if account_type == User.Account.RETAIL_STAFF:
            employed_at = Store.objects.get(id=employed_at_id)

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
                                    employed_at=employed_at
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
<<<<<<< HEAD

class UserSerializer(serializers.Serializer):
    class Meta:
        model = get_user_model()
        fields = ['user_id', 'email', 'first_name', 'last_name', 'number', 'store_address', 
                  'is_active', 'is_staff', 'is_retailer', 'retailer_id', 'verification_code', 
                  'is_verified', 'date_joined']

class TransactionSerializer(serializers.ModelSerializer):
    retailer = UserSerializer()
    customer = UserSerializer()

    class Meta:
        model = Transaction
        fields = ['id', 'retailer', 'customer', 'products', 'date']
=======
    
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
>>>>>>> item-loader
