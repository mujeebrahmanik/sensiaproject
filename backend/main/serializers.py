from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings

class User_login_serializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
        
        
class SuperuserTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.user.is_superuser:
            raise AuthenticationFailed('You are not authorized to access this.')

        return data
    
    
class Comment_serializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model=Comment
        fields=['id','comment','user','time']
        
        
class User_serializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','username','email','password']
        
        extra_kwargs = {
            'password': {'write_only': True,'required':False}
        }

    def create(self, validated_data):
        password=get_random_string(10)
        user=User.objects.create_user(password=password,**validated_data)
    
        send_mail(
            subject="Your Account Password",
            message=(
                f"Hello {user.username} \n \n"
                f"Your account has been created successfully.\n"
                f"Username: {user.username}\n"
                f"Password: {password}\n\n"
                f"Please log in and change your password as soon as possible."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False
        )
        
        return user
    
    
class Permission_serializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model=Permission
        fields=['id','user','can_add','can_view','can_edit','can_delete']
        
        
class Recover_password_serializer(serializers.Serializer):
    username=serializers.CharField()