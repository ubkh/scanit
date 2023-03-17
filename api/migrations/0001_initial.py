# Generated by Django 4.1.6 on 2023-03-16 22:56

from django.conf import settings
import django.core.serializers.json
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('first_name', models.CharField(max_length=32)),
                ('last_name', models.CharField(max_length=32)),
                ('number', models.CharField(blank=True, max_length=11, validators=[django.core.validators.RegexValidator(message='Phone number must have 11 digits.', regex='^\\0?1?\\d{11}$')])),
                ('retailer_barcode', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('store_address', models.CharField(blank=True, max_length=100, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_retailer', models.BooleanField(default=False)),
                ('verification_code', models.CharField(max_length=6)),
                ('is_verified', models.BooleanField(default=False)),
                ('date_joined', models.DateField(auto_now_add=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('retailerID', models.PositiveIntegerField()),
                ('barcodeID', models.CharField(max_length=20, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(blank=True, max_length=750)),
                ('price', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('quantity', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('expiry', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('transaction_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('products', models.JSONField(encoder=django.core.serializers.json.DjangoJSONEncoder)),
                ('date', models.DateField(auto_now_add=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions_as_customer', to=settings.AUTH_USER_MODEL)),
                ('retailer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions_as_retailer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
