from django.contrib import admin
from .models import User, Product, Store
# Register your models here.

@admin.register(User)
class Users(admin.ModelAdmin):
    list_display = ["user_id", "email", "first_name","last_name", "number","is_verified", "verification_code", 'account_type']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "description", "price", "quantity", "expiry"]

@admin.register(Store)
class StoreAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "description", "barcode", "address"]
