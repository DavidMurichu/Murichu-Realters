from rest_framework import viewsets, mixins
from .models import Agents, Location, PropertyType, Blogs, PropertyTenure, Properties, PropertyImages, UserResponse
from .serializer import AgentGetSerializer, MessageSerializer, AgentSerializer, LocationSerializer, PropertyGetSerializer, PropertyTypeSerializer, PropertyTenureSerializer, PropertiesSerializer, PropertyImagesSerializer, UserResponsSerializer, BlogsSerializer
from .permissions import get_custom_permissions

from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.conf import settings
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.core.mail import send_mail
from rest_framework.views import APIView
import os
from dotenv import load_dotenv
load_dotenv()
import threading




class UserResponseViewSet(viewsets.ModelViewSet):
    queryset = UserResponse.objects.all()
    serializer_class = UserResponsSerializer
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['GET', 'DELETE','PATCH', 'PUT' ]  # Example of restricted HTTP methods
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()

    def perform_create(self, serializer):
        # Save user response (main thread)
        user_response = serializer.save()

        # Prepare email details
        property_name = user_response.property.property_name if user_response.property else "N/A"
        property_address = user_response.property.property_address if user_response.property else "N/A"
        agent_name = user_response.agent.name if user_response.agent else "N/A"

        subject = f"New User Response from {user_response.name}"
        message = (
            f"You have received a new response.\n\n"
            f"Name: {user_response.name}\n"
            f"Email: {user_response.email}\n"
            f"Phone Number: {user_response.phonenumber}\n"
            f"Message: {user_response.message}\n"
            f"Property Name: {property_name}\n"
            f"Property Address: {property_address}\n"
            f"Agent: {agent_name}\n"
            f"Subject: {user_response.subject if user_response.subject else 'No Subject'}\n"
        )
        from_email = os.getenv('ADMIN_EMAIL')
        admin_email = os.getenv('ADMIN_EMAIL')

        # Start a new thread for sending the email
        email_thread = threading.Thread(target=self.send_email_thread, args=(subject, message, from_email, admin_email))
        email_thread.start()

    def send_email_thread(self, subject, message, from_email, admin_email):
        try:
            send_mail(
                subject,
                message,
                from_email,
                [admin_email],
                fail_silently=False,
            )
            print(f"Email sent successfully to {admin_email}")
        except Exception as e:
            # Handle email sending failure (log it or raise an exception)
            print(f"Error sending email: {e}")



class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['PATCH', 'PUT' ,'POST', 'DELETE']  # Example of restricted HTTP methods
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()
class PropertyTypeViewSet(viewsets.ModelViewSet):
    queryset = PropertyType.objects.all()
    serializer_class = PropertyTypeSerializer
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['GET','PATCH', 'PUT', 'POST', 'DELETE']
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()

class PropertyTenureViewSet(viewsets.ModelViewSet):
    queryset = PropertyTenure.objects.all()
    serializer_class = PropertyTenureSerializer
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['PATCH', 'PUT', 'POST', 'DELETE']
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()

class PropertiesViewSet(viewsets.ModelViewSet):
    queryset = Properties.objects.all()
    print(queryset)
    serializer_class = PropertiesSerializer
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['GET','PATCH', 'PUT', 'POST', 'DELETE']
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()

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
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['PATCH', 'PUT', 'POST', 'DELETE']
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()
      
    def create(self, request, *args, **kwargs):
        property_id = int(request.data.get('property'))
        files = request.FILES.getlist('images[]')
        print('file', request.data)
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
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['GET','PATCH', 'PUT', 'POST', 'DELETE']
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()

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
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['PATCH', 'PUT', 'POST', 'DELETE']
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()

class BlogsViewSet(viewsets.ModelViewSet):
    queryset = Blogs.objects.all()
    serializer_class= BlogsSerializer
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['PATCH', 'PUT', 'POST', 'DELETE']
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()


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
    def get_permissions(self):
        # Pass the restricted HTTP methods (e.g., POST, GET, PUT, DELETE)
        restricted_methods = ['PATCH', 'PUT', 'POST', 'DELETE']
        return get_custom_permissions(self.action, restricted_methods) or super().get_permissions()

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {'request': self.request}
    

class SendMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            subject = serializer.validated_data['subject']
            message = serializer.validated_data['message']
            from_email = serializer.validated_data['email_from']
            email = serializer.validated_data['email']


            try:
                send_mail(
                    subject,
                    message,
                    from_email,
                    [email],
                    fail_silently=True,
                )
                return Response({'status': 'success', 'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def send_email(self, subject, message, from_email, email):
        try:
            send_mail(
                subject,
                message,
                from_email,
                [email],
                fail_silently=True,
            )
        except Exception as e:
            return str(e)
        return None