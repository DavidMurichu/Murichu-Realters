# Generated by Django 5.0.6 on 2024-07-30 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0003_properties_is_active_userresponse_agent'),
    ]

    operations = [
        migrations.AddField(
            model_name='properties',
            name='features',
            field=models.JSONField(blank=True, default='Not Specified', null=True),
        ),
    ]
