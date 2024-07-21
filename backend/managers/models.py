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
    property_city = models.ForeignKey(Location, on_delete=models.PROTECT)
    property_type = models.ForeignKey(PropertyType, on_delete=models.PROTECT)
    property_tenure = models.ForeignKey(PropertyTenure, on_delete=models.PROTECT)
    agent=models.ForeignKey(Agents, on_delete=models.DO_NOTHING, blank=True)
    property_address = models.CharField(max_length=100)
    property_price = models.FloatField()
    property_bedrooms = models.IntegerField()

 
   
    def __str__(self):
        return self.property_name

def image_file_path(instance, filename):
    # Define the file path for uploading images
    return os.path.join('property_images', filename)

class PropertyImages(models.Model):
    property = models.ForeignKey(Properties, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=image_file_path)  # Use the defined function for file path

#     def __str__(self):
#         return f"Image for {self.property.property_name}"

#     def delete(self, *args, **kwargs):
#         # Delete the file from the filesystem when deleting the model instance
#         if self.image:
#             storage, path = self.image.storage, self.image.path
#             storage.delete(path)  # This will delete the file from the storage
#         super().delete(*args, **kwargs)

# # Signal to delete file when instance is deleted
# @receiver(post_delete, sender=PropertyImages)
# def delete_image_file(sender, instance, **kwargs):
#     if instance.image:
#         instance.image.delete(False)  # False means don't save model after delete

