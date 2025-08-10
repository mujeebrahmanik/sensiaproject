from django.shortcuts import render
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str


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
    
    
class Recover_password_view(generics.GenericAPIView):
    serializer_class=Recover_password_serializer
    
    def post(self,request,*args,**kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username=serializer.validated_data['username']
        
        try:
            user=User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error':'User Not Found'},status=status.HTTP_404_NOT_FOUND)
        
        uid=urlsafe_base64_encode(force_bytes(user.pk))
        token=default_token_generator.make_token(user)
        reset_link=f"http://localhost:5173/reset_password/{uid}/{token}"
        
        send_mail(
            subject="Reset Password",
            message=(
                f"Hello {user.username} \n \n"
                f"Please click this link to reset yor password :{reset_link} "
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False
        )
        
        return Response({'success':'Mail Sent Successfully'},status=status.HTTP_200_OK)
    
    
class Reset_password(generics.GenericAPIView):
    def post(self,request,uidb64,token):
        new_password=request.data.get('password')
        
        if not new_password:
            return Response({'error':'Password is Required'},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            uid=force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error':'Invalid User'},status=status.HTTP_400_BAD_REQUEST)
        
        if not default_token_generator.check_token(user,token):
            return Response({'error':'Invalid or Expired Token , Please recover Again'},status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        
        return Response({'success':'Password Reset is Successfull'},status=status.HTTP_200_OK)
    
    
class Edit_user_view(generics.RetrieveUpdateDestroyAPIView):
    queryset=User.objects.all()
    serializer_class=User_serializer
    permission_classes=[IsAdminUser]
    lookup_field='pk'
  
