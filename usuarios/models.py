from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario (AbstractUser):
    nro_doc = models.CharField(max_length=12,primary_key=True,null=False)
    tdoc = [
        ('CC', 'cedula de ciudadania'),
        ('CE', 'cedula de Extranjeria'),
        ('TI', 'Tarjeta de identidad'), 
        ('RC', 'Registro civil'),
        ('PA', 'Pasaporte'),
        ('ASI', 'Adulto sin identificaion'),
        ('MSI', 'Menor sin identificaion'),
    ]
    tipo_doc = models.CharField(max_length=3,null=False, choices=tdoc)
    lugar_exp_doc = models.CharField(max_length=50,null=False)
    fecha_exp_doc = models.DateField( auto_now=False, auto_now_add=False) 
    sex = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('I','Indeterminado')
    ]
    sexo = models.CharField(max_length=1,null=False,choices=sex)
    fecha_nacimiento = models.DateField( auto_now=False, auto_now_add=False)
    ec = [
        ('Soltero','Soltero'),
        ('Casado','Casado'),
        ('Divorciado','Divorciado'),
        ('Viudo','Viudo'),
        ('Union Libre','Union Libre'),
        ('Separado','Separado'),
    ]
    estado_civil = models.CharField(max_length=15,null=False,choices=ec)
    telefono = models.CharField(max_length=15,null=False)
    nacionalidad = models.CharField(max_length=30,null=False)
    municipio = models.CharField( max_length=50)
    is_superuser = models.BooleanField(default=True)


    