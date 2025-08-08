from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Comment(models.Model):
    comment=models.TextField()
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    time=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.user.username
    
    
class Permission(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,unique=True)
    can_view=models.BooleanField(default=True)
    can_add=models.BooleanField(default=False)
    can_edit=models.BooleanField(default=False)
    can_delete=models.BooleanField(default=False)
    
    
@receiver(post_save,sender=User)
def create_permission(sender,instance,created,**kwargs):
    if created:
        Permission.objects.create(user=instance)


