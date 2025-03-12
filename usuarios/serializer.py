from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token


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

    def create(self, validated_data):
        password = validated_data.pop('password')  # Se extrae la contraseña
        usuario = Usuario.objects.create(**validated_data)
        usuario.set_password(password) 
        token, created = Token.objects.get_or_create(user=usuario)# Se asegura de que la contraseña esté cifrada
        usuario.save()
        return usuario 
        
class MedicoSerializador(serializers.ModelSerializer):
    usuario = UsuarioSerializer()        
    
    class Meta : 
        model = Medico
        fields = "__all__"
    
    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')  # Extrae los datos del usuario
        usuario = UsuarioSerializer.create(UsuarioSerializer(), validated_data=usuario_data)# Crea el usuario
        token, created = Token.objects.get_or_create(user=usuario)  #crear token para el usuario
        medico = Medico.objects.create(usuario=usuario, **validated_data)  # Crea el médico
        return medico
    
class Gestor_thSerializador(serializers.ModelSerializer):
    usuario=UsuarioSerializer()

    class Meta:
        model=Gestor_TH
        fields="__all__"

    def create(self, validated_data):
        usuario_data=validated_data.pop('usuario')
        usuario=UsuarioSerializer.create(UsuarioSerializer(),validated_data=usuario_data)
        token, created = Token.objects.get_or_create(user=usuario)  #crear token para el usuario
        gestor_th=Gestor_TH.objects.create(usuario=usuario, **validated_data)
        return gestor_th
    
class PacienteSerializador(serializers.ModelSerializer):
    class Meta:
        models = Paciente
        fields="__all__"

    def create(self, validated_data):
        usuario_data=validated_data.pop('usuario')
        usuario=UsuarioSerializer.create(UsuarioSerializer(),validated_data=usuario_data)
        token, created = Token.objects.get_or_create(user=usuario)  #crear token para el usuario
        paciente = Paciente.objects.create(usuario = usuario, **validated_data )
        return paciente