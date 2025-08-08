from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import *

from django.urls import path

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Refresh token
    path('superuser-token/', SuperuserTokenObtainPairView.as_view(), name='superuser_token_obtain_pair'),
    path('comments/', Comment_view.as_view(), name='comment'),
    path('comments/<int:pk>/', Comment_Detail_view.as_view(), name='comment_detail'),
    path('users/', User_view.as_view(), name='user_view'),
    path('current_user/', Current_user_view.as_view(), name='current_user_view'),
    path('permission/', Permission_user_view.as_view(), name='permission_view'),
    path('my_permission/', My_permission_view.as_view(), name='my_permission_view'),
    path('edit_permission/<int:pk>/', Edit_permission_view.as_view(), name='edit_permission_view'),









   
]