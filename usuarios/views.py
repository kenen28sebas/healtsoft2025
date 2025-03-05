from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Usuario
from .serializer import UsuarioSerializer
from rest_framework.authtoken.models import Token

@api_view(["POST"])
def registrar (request):
    serializer = UsuarioSerializer(data = request.data)
    print(serializer.is_valid())
    if serializer.is_valid():
        usuario = Usuario(
            nro_doc = serializer.validated_data["nro_doc"],
            tipo_doc = serializer.validated_data["tipo_doc"],
            lugar_exp_doc = serializer.validated_data["lugar_exp_doc"],
            fecha_exp_doc = serializer.validated_data["fecha_exp_doc"],
            sexo = serializer.validated_data["sexo"],
            fecha_nacimiento = serializer.validated_data["fecha_nacimiento"],
            estado_civil = serializer.validated_data["estado_civil"],
            telefono = serializer.validated_data["telefono"],
            nacionalidad = serializer.validated_data["nacionalidad"],
            municipio = serializer.validated_data["municipio"],
            username = serializer.validated_data["nro_doc"],
            first_name=serializer.validated_data["first_name"],
            last_name = serializer.validated_data["last_name"],
            email = serializer.validated_data["email"]
        )
        usuario.set_password(serializer.validated_data["password"])
        token = Token.objects.create(user = usuario)
        usuario.save()

        
        return Response({"token": token.key ,"user": serializer.data})

    return Response({"error": "error" ,"user": serializer.data})
