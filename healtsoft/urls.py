from django.contrib import admin
from django.urls import path
from usuarios.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('registrar' , registrar),
    path('login', login)
]
