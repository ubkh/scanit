# Generated by Django 4.1.3 on 2023-03-14 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='store_address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
