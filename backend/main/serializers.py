from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from .models import *

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
        fields=['first_name','last_name','username','email','password']
        
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Use create_user to hash the password
        return User.objects.create_user(**validated_data)
    
    
class Permission_serializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model=Permission
        fields=['id','user','can_add','can_view','can_edit','can_delete']