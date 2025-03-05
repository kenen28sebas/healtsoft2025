from rest_framework import serializers
from .models import *

class UsuarioSerializer (serializers.ModelSerializer):
    fecha_exp_doc = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y"])
    fecha_nacimiento = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y"])

    class Meta :
        model = Usuario
        fields =[
            "nro_doc", 
            "tipo_doc",
            "lugar_exp_doc",
            "fecha_exp_doc",
            "sexo" ,
            "fecha_nacimiento" ,
            "estado_civil" ,
            "telefono", 
            "nacionalidad", 
            "municipio" ,
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
        ]