from django.db import models
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
import datetime

# Create your models here.
class Test(models.Model):
    text = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=750, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.05)]) # accepts ints too. max price is 999.99
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