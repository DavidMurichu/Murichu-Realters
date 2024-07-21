from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AgentGetViewSet, AgentsViewSet, LocationViewSet, PropertiesGetViewSet, PropertyTypeViewSet, PropertyTenureViewSet, PropertiesViewSet, PropertyImagesViewSet, get_properties, verify_token

router = DefaultRouter()
router.register(r'locations', LocationViewSet)
router.register(r'property-types', PropertyTypeViewSet)
router.register(r'property-tenures', PropertyTenureViewSet)
router.register(r'properties', PropertiesViewSet)
router.register(r'get-properties', PropertiesGetViewSet, basename='get-properties')
router.register(r'property-images', PropertyImagesViewSet)
router.register(r'agents', AgentsViewSet)
router.register(r'get-agents', AgentGetViewSet, basename='get-agents')


urlpatterns = [
    path('', include(router.urls)),
    path('verify-token', verify_token, name='verify_token'),
    # path('get-properties', get_properties, name='get-properties'),
]
