from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Usuario
from .serializer import *
from rest_framework.authtoken.models import Token



@api_view(["POST"])
def registrar (request):

    tipo_ususrio = request.data["tipo_usuario"]
    match tipo_ususrio:
        case "medico":
            serializer=MedicoSerializador(data= request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"user":serializer.data})
        case "gestor_th":
            serializerTH=gestor_thSerializador(data=request.data)
            print(serializerTH.is_valid())
            if serializerTH.is_valid():
                serializerTH.save()
                return Response({"user":serializerTH.data})
    


    return Response({"error": "error" })


@api_view(["POST"])
def login (request):
    
    
    usuario = get_object_or_404(Usuario , nro_doc = request.data["nro_doc"])
    
    if not usuario.check_password(request.data["password"]):
        return Response({"error" : "clave incorrecta"})
    
    try:
        medico = get_object_or_404(Medico , usuario_id = request.data["nro_doc"])
        datos_medico = MedicoSerializador(instance = medico)
        print(datos_medico.data)
    except:
        print("medico sexual no encotrado")        
    
    serializer = UsuarioSerializer(instance = usuario)
    
    return Response ( {"user" : datos_medico.data } )    