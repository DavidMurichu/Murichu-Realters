# Generated by Django 5.1 on 2024-08-27 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertytenure',
            name='description',
            field=models.CharField(default='Admin', max_length=100),
        ),
    ]
