from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
import datetime
import barcode
from barcode.writer import ImageWriter

# Create your models here.
class Test(models.Model):
    text = models.CharField(max_length=100)

class Product(models.Model):
    retailerID = models.PositiveIntegerField() # this should be a foreign key to the retailer account
    barcodeID = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=750, blank=True)
    price = models.PositiveIntegerField(validators=[MinValueValidator(0)]) # accepts ints too. max price is 999.99
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    expiry = models.DateField()

    def is_expiry_date_past(self):
        if self.expiry < datetime.date.today(): return True
        else: return False

    def clean(self):
        if (self.is_expiry_date_past()):
            raise ValidationError("Expiry date cannot be in the past.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

# class UserAccount(User):
    
#     def __init__(self):
#         super(self)
    
#     name = models.CharField()
#     # email = models.EmailField()
#     # password = models.CharField()
#     dob = models.DateField()
    

# class RetailerAccount(UserAccount):
#     barcode = models.CharField(max_length=100, unique=True, null=True, blank=True)
#     shop_address = models.CharField()
#     payment_method = models.CharField()
#     balance = models.DecimalField()

#     # UNCOMMENT WHEN READY TO IMPLEMENT RETAILER ACCOUNTS
#     def save(self, *args, **kwargs):
#         if not self.barcode:
#             # Generate unique barcode
#             ean = barcode.get_barcode_class('ean13')
#             value = "8" + "0" * (12 - len(str(self.id))) + str(self.id)
#             self.barcode = ean(value, writer=ImageWriter()).get_fullcode()

#         super().save(*args, **kwargs)


    
# class CustomerAccount(UserAccount):
#     customerID = models.PositiveIntegerField()
#     personal_address = models.CharField()
#     payment_method = models.CharField()

# class AdminAccount(UserAccount):
#     adminID = models.PositiveIntegerField()
    
    