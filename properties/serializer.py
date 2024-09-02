from rest_framework import serializers
from .models import Agents, Location, PropertyType, PropertyTenure, Properties, PropertyImages, UserResponse, Blogs


class UserResponsSerializer(serializers.ModelSerializer):
    property_name = serializers.SerializerMethodField()
    property_address = serializers.SerializerMethodField()
    agent = serializers.SerializerMethodField()

    class Meta:
        model = UserResponse
        fields = ['id', 'name', 'email', 'phonenumber', 'message', 'property_name', 'property_address', 'agent', 'subject']

    def get_agent(self, obj):
        if obj.agent:
            return obj.agent.name
        return None
    def get_property_name(self, obj):
        if obj.property:
            return obj.property.property_name
        return None

    def get_property_address(self, obj):
        if obj.property:
            return obj.property.property_address
        return None
    
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
        fields = ['id', 'name', 'description']

class PropertyImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImages
        fields = ['id', 'image', 'property']

class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = ['id', 'title', 'body', 'image']

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
            'id', 'property_name','property_description', 'property_city', 'property_type', 'features',
            'property_tenure', 'property_address', 'property_price', 
            'property_bedrooms', 'agent', 'is_active'
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
    properties = serializers.SerializerMethodField()

    class Meta:
        model = Agents
        fields = ['id', 'name', 'phone', 'email', 'city_name', 'profile_image', 'properties_count', 'properties']

    def get_profile_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.profile_image.url) if request else obj.profile_image.url

    def get_properties_count(self, obj):
        return Properties.objects.filter(agent=obj).count()

    def get_properties(self, obj):
        properties = Properties.objects.filter(agent=obj)
        return PropertyGetSerializer(properties, many=True, context=self.context).data

class PropertyAgentGetSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source='city.city')
    profile_image = serializers.SerializerMethodField()
    properties_count = serializers.SerializerMethodField()
   

    class Meta:
        model = Agents
        fields = ['id', 'name', 'phone', 'email', 'city_name', 'profile_image', 'properties_count']

    def get_profile_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.profile_image.url) if request else obj.profile_image.url

    def get_properties_count(self, obj):
        return Properties.objects.filter(agent=obj).count()

class PropertyGetSerializer(serializers.ModelSerializer):
    property_city = serializers.CharField(source='property_city.city')
    property_type = serializers.CharField(source='property_type.name')
    property_tenure = serializers.CharField(source='property_tenure.name')
    property_images = serializers.SerializerMethodField()
    agent = serializers.SerializerMethodField()

    class Meta:
        model = Properties
        fields = '__all__'

    def get_property_images(self, obj):
        images = PropertyImages.objects.filter(property=obj)
        request = self.context.get('request')
        return [request.build_absolute_uri(image.image.url) for image in images] if request else [image.image.url for image in images]

    def get_agent(self, obj):
        return PropertyAgentGetSerializer(obj.agent, context=self.context).data
    
class MessageSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=100)
    message = serializers.CharField()
    email_from = serializers.CharField()
    email = serializers.EmailField()