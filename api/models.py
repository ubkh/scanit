from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator


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
		user.is_staff = True
		user.save()
		return user


class User(AbstractBaseUser, PermissionsMixin):
	phone_regex = RegexValidator(regex=r'^\0?1?\d{11}$', message="Phone number must have 11 digits.")

	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=100, unique=True)
	first_name = models.CharField(max_length=32)
	last_name = models.CharField(max_length=32)
	number = models.CharField(validators=[phone_regex], max_length=11, blank=True)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	verification_code = models.CharField(max_length=6)
	is_verified = models.BooleanField(default=False)
	date_joined = models.DateField(auto_now_add=True)
	USERNAME_FIELD = 'email'
	objects = CustomUserManager()

	def __str__(self):
		return f'{self.first_name} {self.last_name}'




#     |
#     |
#     |
#  \  |  /
#   \ | /
#    \|/

# can we do this??

# class RetailerAccount(UserAccount):
#     retailerID = models.PositiveIntegerField()
#     retailBarcode = models.CharField()
#     shop_address = models.CharField()
#     payment_method = models.CharField()
#     balance = models.DecimalField()

    
# class CustomerAccount(UserAccount):
#     customerID = models.PositiveIntegerField()
#     personal_address = models.CharField()
#     payment_method = models.CharField()

# class AdminAccount(UserAccount):
#     adminID = models.PositiveIntegerField()