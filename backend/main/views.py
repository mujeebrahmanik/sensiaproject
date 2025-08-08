from django.shortcuts import render
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class SuperuserTokenObtainPairView(TokenObtainPairView):
    serializer_class=SuperuserTokenObtainPairSerializer
    
class Comment_view(generics.ListCreateAPIView):
    queryset=Comment.objects.all()
    serializer_class=Comment_serializer
    permission_classes=[IsAuthenticated]
    
    
    def perform_create(self, serializer):
        # Automatically assign the logged-in user as comment's user
        serializer.save(user=self.request.user)
        
        
class Comment_Detail_view(generics.RetrieveUpdateDestroyAPIView):
    queryset=Comment.objects.all()
    serializer_class=Comment_serializer
    permission_classes=[IsAuthenticated]
    lookup_field='pk'
    
    

    
    
class User_view(generics.ListCreateAPIView):
    queryset=User.objects.all()
    serializer_class=User_serializer
    permission_classes=[IsAdminUser]
    
class Current_user_view(generics.GenericAPIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        user=request.user
        data={
            'username':user.username,
            'is_staff':user.is_staff,
        }
        return Response(data)
    
    
class Permission_user_view(generics.ListCreateAPIView):
    queryset=Permission.objects.all()
    serializer_class=Permission_serializer
    permission_classes=[IsAdminUser]
    
    

class My_permission_view(generics.RetrieveAPIView):
    serializer_class = Permission_serializer
    permission_classes = [IsAuthenticated]
    lookup_field = None  

    def get_object(self):
        obj = Permission.objects.filter(user=self.request.user).first()
        if not obj:
            from rest_framework.exceptions import NotFound
            raise NotFound('Permission not found for user.')
        return obj
    
    
class Edit_permission_view(generics.RetrieveUpdateAPIView):
    queryset=Permission.objects.all()
    serializer_class=Permission_serializer
    lookup_field='pk'
  
