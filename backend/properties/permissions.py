from rest_framework.permissions import IsAuthenticated

# Mapping of HTTP methods to DRF actions
HTTP_METHOD_ACTION_MAP = {
    'GET': ['list', 'retrieve'],
    'POST': ['create'],
    'PUT': ['update'],
    'PATCH': ['partial_update'],
    'DELETE': ['destroy'],
}

# Function to determine permissions based on HTTP methods
def get_custom_permissions(action, restricted_methods):
    # Convert restricted HTTP methods to the corresponding DRF actions
    restricted_actions = [
        HTTP_METHOD_ACTION_MAP.get(method, []) for method in restricted_methods
    ]
    restricted_actions = [action for sublist in restricted_actions for action in sublist]

    # Check if the current action is in the restricted actions list
    if action in restricted_actions:
        return [IsAuthenticated()]

    # No restrictions for other actions
    return []