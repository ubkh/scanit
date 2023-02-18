from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
import datetime

# Create your models here.
class Test(models.Model):
    text = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=750, blank=True)
    price = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    expiry = models.DateField()
    barcode = models.CharField(max_length=20)
    # retailer = models.ForeignKey(on_delete= models.CASCADE)

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
    
    