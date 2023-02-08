from django.db import models

# Create your models here.
class Test(models.Model):
    text = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=750, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.PositiveIntegerField()
    expiry = models.DateField()