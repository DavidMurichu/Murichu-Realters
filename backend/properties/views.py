from rest_framework import viewsets
from .models import Agents, Location, PropertyType, PropertyTenure, Properties, PropertyImages
from .serializer import AgentGetSerializer, AgentSerializer, LocationSerializer, PropertyGetSerializer, PropertyTypeSerializer, PropertyTenureSerializer, PropertiesSerializer, PropertyImagesSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.conf import settings
from rest_framework.decorators import api_view
from django.http import JsonResponse

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class PropertyTypeViewSet(viewsets.ModelViewSet):
    queryset = PropertyType.objects.all()
    serializer_class = PropertyTypeSerializer

class PropertyTenureViewSet(viewsets.ModelViewSet):
    queryset = PropertyTenure.objects.all()
    serializer_class = PropertyTenureSerializer

class PropertiesViewSet(viewsets.ModelViewSet):
    queryset = Properties.objects.all()
    print(queryset)
    serializer_class = PropertiesSerializer

    def list(self, request, *args, **kwargs):
        properties = self.queryset
        response_data = []

        for property in properties:
            property_images = PropertyImages.objects.filter(property=property)
            images = [
                request.build_absolute_uri(image.image.url) for image in property_images
            ]

            # Ensure all fields are JSON-serializable
            property_data = {
                "id": property.id,
                # "property_description": property.property_description,
                "property_name": property.property_name,
                "property_city": str(property.property_city),  # Convert to string if necessary
                "property_address": str(property.property_address),  # Convert to string if necessary
                "property_price": property.property_price,
                "property_tenure": str(property.property_tenure),
                "property_type": str(property.property_type),
                "property_bedrooms": property.property_bedrooms,
                "property_images": {
                    "images": images
                }
            }
            response_data.append(property_data)

        return Response(response_data, status=status.HTTP_200_OK)

    
    


    

class PropertyImagesViewSet(viewsets.ModelViewSet):
    queryset = PropertyImages.objects.all()
    serializer_class = PropertyImagesSerializer
    parser_classes = (MultiPartParser, FormParser)         
    def create(self, request, *args, **kwargs):
        property_id = int(request.data.get('property'))
        files = request.FILES.getlist('images[]')
        property = Properties.objects.get(id=property_id)
        
        images = []
     
        for file in files:
            image = PropertyImages(property=property, image=file)
            image.save()
            images.append(image)

        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AgentsViewSet(viewsets.ModelViewSet):
    queryset = Agents.objects.all()
    serializer_class = AgentSerializer
    
    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        print(serializer)
        serializer.is_valid(raise_exception=True)
        
        # Optionally, perform custom processing before saving
        # For example, you could modify or validate data here

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class AgentGetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Agents.objects.all()
    serializer_class = AgentGetSerializer

@api_view(['POST'])
def verify_token(request):
    token = request.data.get('token')
    
    if not token:
        return Response({'error': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Decode the token to extract user information
        decoded_token = AccessToken(token)
        user_id = decoded_token['user_id']
        
        # Check if the user exists (you might have your own logic here)
        user = User.objects.get(id=user_id)
        
        # If the user exists, token is valid
        return Response({'valid': True}, status=status.HTTP_200_OK)
    
    except Exception as e:
        print(e)  # Handle specific exceptions as needed
        return Response({'valid': False}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['GET'])
def get_properties(request):
    try:
        # Fetch all properties
        properties = Properties.objects.all()
        
        response_data = []
        for property in properties:
            # Collect property images
            images = [
                request.build_absolute_uri(image.image.url) for image in property.images.all()
            ]

            # Use the serializer to ensure all fields are JSON-serializable
            property_data = PropertiesSerializer(property).data
            property_data['property_images'] = {"images": images}

            response_data.append(property_data)

        return JsonResponse(response_data, safe=False, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class PropertiesGetViewSet(viewsets.ModelViewSet):
    queryset = Properties.objects.all()
    serializer_class = PropertyGetSerializer

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {'request': self.request}