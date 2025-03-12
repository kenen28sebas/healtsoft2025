from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializer import *
from rest_framework.authtoken.models import Token



@api_view(["POST"])
def registrar (request):

    tipo_ususrio = request.data["tipo_usuario"]
    print(tipo_ususrio)
    match tipo_ususrio:
        case "medico":
            serializer=MedicoSerializador(data= request.data)
            print(serializer)
            print(serializer.is_valid())
            if serializer.is_valid(): 
                serializer.save()
                
                return Response({"user":serializer.data})
        case "gestor_th":
            serializerTH=Gestor_thSerializador(data=request.data)
            print(serializerTH.is_valid())
            if serializerTH.is_valid():
                
                serializerTH.save()
                return Response({"user":serializerTH.data})
        case "paciente":
            serializer= PacienteSerializador(data = request.data)
            print(serializer.is_valid())
            if serializer.is_valid():
                
                serializer.save()
                return Response({"user":serializer.data})
        case "u":
            serializer = UsuarioSerializer(data = request.data)   
            print(serializer.is_valid())
            if serializer.is_valid():
                
                serializer.save()
                return Response({"user":serializer.data})


    return Response({"error": "error" ,"user" : request.data})


@api_view(["POST"])
def login (request):
    
    tipo_ususrio = request.data["tipo_usuario"]
    usuario = get_object_or_404(Usuario , nro_doc = request.data["nro_doc"])

    if not usuario.check_password(request.data["password"]):
        return Response({"error" : "clave incorrecta"})
    
    match tipo_ususrio:
        case "medico":
            try:
                medico = get_object_or_404(Medico , usuario_id = request.data["nro_doc"])
                datos_medico = MedicoSerializador(instance = medico)
                return Response ({"user" : datos_medico.data})
            except:
                print("medico sexual no encotrado1")        
    
        case "gestor_th":
            try:
                gestor_th = get_object_or_404(Gestor_TH , usuario_id = request.data["nro_doc"])
                datos_gestor_th = Gestor_thSerializador(instance = gestor_th)
                return Response ( {"user" : datos_gestor_th.data } )  
            except:
                print("medico sexual no encotrado")    

        case "paciente":
            try : 
                paciente = get_object_or_404(Gestor_TH , usuario_id = request.data["nro_doc"])
                datos_paciente = PacienteSerializador(instane = paciente)
                return Response ({"user" : datos_paciente.data})
            except:
                print("medico sexual no encotrado") 
 
    return Response ( {"error" : "erro en la validacion de cuenta " } )    