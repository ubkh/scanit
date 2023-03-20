from django.db import models, IntegrityError
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

import datetime
import barcode
from barcode.writer import ImageWriter


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

class Store(models.Model):
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=100, blank=False)
	description = models.CharField(max_length=750, blank=True)
	barcode = models.CharField(max_length=25, blank=False)
	address = models.CharField(max_length=100, blank=True, null=True)
        
	def save(self, *args, **kwargs):
                
		super().save(*args, **kwargs)

		if not self.barcode:
			try_count = 0
			while try_count < 10:
				try:
					# Generate unique barcode
					print("RETAILER BARCODE GENERATED")
					ean = barcode.get_barcode_class('ean13')
					print("WHAT IS MY STORE ID")
					print(self.id)
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
					print("Barcode not unique, trying again...")
				except Exception as e:
					print(e)
					raise

			raise ValueError("Failed to generate unique barcode!")
		else:
			super().save(*args, **kwargs)

class User(AbstractBaseUser, PermissionsMixin):
	
	class Account(models.IntegerChoices):
		CUSTOMER = 1
		RETAIL_STAFF = 2
		RETAIL_OWNER = 3
		DIRECTOR = 4

	

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

	def __str__(self):
		return f'{self.first_name} {self.last_name}'

class Test(models.Model):
    text = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=750, blank=True)
    price = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    expiry = models.DateField()
    barcode = models.CharField(max_length=20)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)

    def is_expiry_date_past(self):
        if self.expiry < datetime.date.today():
            return True
        return False

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



  