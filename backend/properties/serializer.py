from rest_framework import serializers
from .models import Agents, Location, PropertyType, PropertyTenure, Properties, PropertyImages, UserResponse


class UserResponsSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserResponse
        fields=['id', 'name', 'email', 'phonenumber', 'message', 'property']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'city']

class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = ['id', 'name']

class PropertyTenureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyTenure
        fields = ['id', 'name']

class PropertyImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImages
        fields = ['id', 'image', 'property']

class AgentSerializer(serializers.ModelSerializer):
    city = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all())
    class Meta:
        model = Agents
        fields = ['id', 'name', 'phone', 'email', 'profile_image', 'city']

class PropertiesSerializer(serializers.ModelSerializer):
    property_city = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all())
    property_type = serializers.PrimaryKeyRelatedField(queryset=PropertyType.objects.all())
    property_tenure = serializers.PrimaryKeyRelatedField(queryset=PropertyTenure.objects.all())
    agent = serializers.PrimaryKeyRelatedField(queryset=Agents.objects.all())

    class Meta:
        model = Properties
        fields = [
            'id', 'property_name','property_description', 'property_city', 'property_type', 
            'property_tenure', 'property_address', 'property_price', 
            'property_bedrooms', 'agent'
        ]

    def create(self, validated_data):
        property_city = validated_data.pop('property_city')
        property_type = validated_data.pop('property_type')
        property_tenure = validated_data.pop('property_tenure')
        agent = validated_data.pop('agent')

        properties = Properties.objects.create(
            property_city=property_city,
            property_type=property_type,
            property_tenure=property_tenure,
            agent=agent,
            **validated_data
        )

        return properties
        
        



class AgentGetSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city')
    profile_image = serializers.SerializerMethodField()
    properties_count = serializers.SerializerMethodField()


    def get_profile_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.profile_image.url)
    def get_properties_count(self, obj):
            return Properties.objects.filter(agent=obj).count()

    class Meta:
        model = Agents
        fields = ['id', 'name', 'phone', 'email', 'profile_image', 'city','city_name', 'properties_count']
        

        
class PropertyGetSerializer(serializers.ModelSerializer):
    property_city = serializers.CharField(source='property_city.city')
    property_type = serializers.CharField(source='property_type.name')
    property_tenure = serializers.CharField(source='property_tenure.name')
    agent = AgentGetSerializer()
    property_images = serializers.SerializerMethodField()

    class Meta:
        model = Properties
        fields = '__all__'

    def get_property_images(self, obj):
        images = PropertyImages.objects.filter(property=obj)
        request = self.context.get('request')
        if request is not None:
            return [request.build_absolute_uri(image.image.url) for image in images]
        return [image.image.url for image in images]