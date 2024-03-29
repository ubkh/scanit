from django.db import models, IntegrityError
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
import uuid
import datetime
import barcode
from barcode.writer import ImageWriter

# A custom user manager to handle authentication
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError('A user email is needed.')

        if not password:
            raise ValueError('A user password is needed.')

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, username=None):
        if not email:
            raise ValueError('A user email is needed.')

        if not password:
            raise ValueError('A user password is needed.')

        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user

#The store model to store the shop where items are
class Store(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=750, blank=True)
    barcode = models.CharField(max_length=25, blank=False, unique=True)
    address = models.CharField(max_length=100, blank=True, null=True)
        
    def save(self, *args, **kwargs):
                
        super().save(*args, **kwargs)
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=750, blank=True)
    barcode = models.CharField(max_length=25, blank=False, unique=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    
    # save method which generates barcode automatically
    def save(self, *args, **kwargs): 
        super().save(*args, **kwargs)

        if not self.barcode:
            try_count = 0
            while try_count < 10:
                try:
                    # Generate unique barcode
                    ean = barcode.get_barcode_class('ean13')
                    value = '8' + '0' * (11 - len(str(self.id))) + str(self.id)
                    checksum = sum(int(digit) * (3 if i % 2 == 0 else 1) for i, digit in enumerate(reversed(value)))
                    value += str((10 - (checksum % 10)) % 10)
                    barcode_value = ean(value, writer=ImageWriter())
                    self.barcode = barcode_value.get_fullcode()
                    self.barcode = value
                    super().save(*args, **kwargs)
                    return
                except IntegrityError:
                    try_count += 1
                except Exception as e:
                    raise

            raise ValueError("Failed to generate unique barcode!")
        else:
            super().save(*args, **kwargs)

#the user model which stores the various accounts
class User(AbstractBaseUser, PermissionsMixin):
    
    class Account(models.IntegerChoices):
        CUSTOMER = 1
        RETAIL_STAFF = 2
        RETAIL_OWNER = 3
        DIRECTOR = 4

    

    phone_regex = RegexValidator(regex=r'^\0?1?\d{11}$', message="Phone number must have 11 digits.")
    phone_regex = RegexValidator(regex=r'^\0?1?\d{11}$', message="Phone number must have 11 digits.")

    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    number = models.CharField(validators=[phone_regex], max_length=11, blank=True)
    #retailer_barcode = models.CharField(max_length=100, unique=True, null=True, blank=True)
    #store_address = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    # is_staff = models.BooleanField(default=False)
    #is_retailer = models.BooleanField(default=False)
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    number = models.CharField(validators=[phone_regex], max_length=11, blank=True)
    is_active = models.BooleanField(default=True)

    account_type = models.SmallIntegerField(
        choices = Account.choices,
        default = Account.CUSTOMER
    )
    #store the store which the staff works at
    employed_at = models.ForeignKey(Store, blank=True, null=True, on_delete=models.CASCADE)

    # retailer_id= models.CharField(max_length=8, blank=True)
    verification_code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)
    USERNAME_FIELD = 'email'
    objects = CustomUserManager()
    #store which the staff works at
    employed_at = models.ForeignKey(Store, blank=True, null=True, on_delete=models.CASCADE)
    verification_code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)
    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

class Test(models.Model):
    text = models.CharField(max_length=100)

#Model for storing each product 
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=750, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, validators=[MinValueValidator(0)])
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    expiry = models.DateField()
    barcode = models.CharField(max_length=20)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    is_suspended = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    #check whether product is expired
    def is_expiry_date_past(self):
        if self.expiry < datetime.date.today():
            return True
        return False

    # check whether barcode is valid
    def is_invalid_barcode(self):
        if (all(char.isdigit() for char in self.barcode)):
            return False
        return True

    def clean(self):
        if (self.is_expiry_date_past()):
            raise ValidationError("Expiry date cannot be in the past.")
        if (self.is_invalid_barcode()):
            raise ValidationError("Invalid barcode")

    def save(self, *args, **kwargs):
        # even though full_clean() should call clean_fields() before clean(), it does not, and expiry date is not checked if valid
        self.clean_fields()
        self.full_clean()
        super().save(*args, **kwargs)

#Model to store the reciepts
class Transaction(models.Model):
    transaction_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shop = models.ForeignKey(Store, related_name='transactions_as_store', on_delete=models.CASCADE)
    customer = models.ForeignKey(User, related_name='transactions_as_customer', on_delete=models.CASCADE)
    products = models.JSONField(encoder=DjangoJSONEncoder)
    date = models.DateField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)