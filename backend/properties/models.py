from email import message
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_delete
import os



class Location(models.Model):
    city = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.city
    
class Agents(models.Model):
    name=models.CharField(max_length=50)
    phone=models.CharField(max_length=13, unique=True)
    email=models.EmailField( unique=True)
    city=models.ForeignKey(Location, on_delete=models.PROTECT)
    profile_image=models.ImageField(blank=False, default='img.png', upload_to='agentimages')
    def __str__(self):
        return f"{self.name}"

        
class PropertyType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class PropertyTenure(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Properties(models.Model):
    property_name = models.CharField(max_length=100)
    property_description = models.CharField(max_length=1000)
    property_city = models.ForeignKey(Location, on_delete=models.PROTECT)
    property_type = models.ForeignKey(PropertyType, on_delete=models.PROTECT)
    property_tenure = models.ForeignKey(PropertyTenure, on_delete=models.PROTECT)
    agent=models.ForeignKey(Agents, on_delete=models.DO_NOTHING, blank=True)
    property_address = models.CharField(max_length=100)
    property_price = models.FloatField()
    property_bedrooms = models.IntegerField()
    features=models.JSONField(blank=True, null=True, default='Not Specified')
    is_active=models.BooleanField(default=True)

 
   
    def __str__(self):
        return self.property_name

def image_file_path(instance, filename):
    # Define the file path for uploading images
    return os.path.join('property_images', filename)

class PropertyImages(models.Model):
    property = models.ForeignKey(Properties, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=image_file_path)  # Use the defined function for file path

class UserResponse(models.Model):
    property=models.ForeignKey(Properties, on_delete=models.SET_NULL, blank=True, null=True)
    name=models.CharField(max_length=30)
    email=models.EmailField(blank=True)
    phonenumber=models.CharField(max_length=13)
    subject=models.CharField(max_length=30, blank=True, null=True)
    message=models.TextField(max_length=500)
    agent=models.ForeignKey(Agents, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.name


class Blogs(models.Model):
    title=models.CharField(max_length=1000)
    body= models.TextField(max_length=50000)
    image= models.ImageField(upload_to='blogs', default='Not set')
