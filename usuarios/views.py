from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from .models import *
from .serializer import *
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

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
        case "auxiliar":
            serializer = AuxiliarAdminSerializador(data = request.data)   
            print(serializer.is_valid())
            if serializer.is_valid():
                
                serializer.save()
                return Response({"user":serializer.data})


    return Response({"error": "error" ,"user" : request.data})


@api_view(["POST"])
def login (request):
    print(request.user)
    tipo_ususrio = request.data["tipo_usuario"]
    usuario = get_object_or_404(Usuario , nro_doc = request.data["nro_doc"])

    if not usuario.check_password(request.data["password"]):
        return Response({"error" : "clave incorrecta"})
    
    match tipo_ususrio:
        case "medico":
            try:
                medico = get_object_or_404(Medico , usuario_id = request.data["nro_doc"])
                token,create = Token.objects.get_or_create( user = usuario)
                datos_medico = MedicoSerializador(instance = medico)
                return Response ({"user" : datos_medico.data , "token" : token.key})
            except:
                print("medico sexual no encotrado1")        
    
        case "gestor_th":
            try:
                gestor_th = get_object_or_404(Gestor_TH , usuario_id = request.data["nro_doc"])
                token,create = Token.objects.get_or_create( user = usuario)
                datos_gestor_th = Gestor_thSerializador(instance = gestor_th)
                return Response ( {"user" : datos_gestor_th.data  , "token" : token.key } )  
            except:
                print("medico sexual no encotrado")    

        case "paciente":
            try : 
                paciente = get_object_or_404(Paciente , usuario_id = request.data["nro_doc"])
                token,create = Token.objects.get_or_create( user = usuario)
                datos_paciente = PacienteSerializador(instane = paciente)
                return Response ({"user" : datos_paciente.data  , "token" : token.key })
            except:
                print("medico sexual no encotrado") 
        case "auxiliar":
            try : 
                auxiliar = get_object_or_404(Aux_adm , usuario_id = request.data["nro_doc"])
                token,create = Token.objects.get_or_create( user = usuario)
                datos_paciente = AuxiliarAdminSerializador(instane = auxiliar)
                return Response ({"user" : datos_paciente.data  , "token" : token.key })
            except:
                print("medico sexual no encotrado") 

 
    return Response ( {"error" : "erro en la validacion de cuenta " } )    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def perfil(request):

    print(request.user.nro_doc)     
    usuario = UsuarioSerializer( instance = request.user )
    print(usuario.data)
    try:
        medico = get_object_or_404(Medico , usuario_id = request.user.nro_doc)
        datos_medico = MedicoSerializador(instance = medico)
        return Response ({"user" : datos_medico.data})
    except:
        print("medico sexual no encotrado1")        
    

    try:
        gestor_th = get_object_or_404(Gestor_TH , usuario_id = request.data["nro_doc"])
        datos_gestor_th = Gestor_thSerializador(instance = gestor_th)
        return Response ( {"user" : datos_gestor_th.data  } )  
    except:
        print("medico sexual no encotrado")   

    try : 
        paciente = get_object_or_404(Paciente , usuario_id = request.data["nro_doc"])
        datos_paciente = PacienteSerializador(instane = paciente)
        return Response ({"user" : datos_paciente.data  })
    except:
        print("medico sexual no encotrado") 

    try : 
        auxiliar = get_object_or_404(Aux_adm , usuario_id = request.data["nro_doc"])
        datos_paciente = AuxiliarAdminSerializador(instane = auxiliar)
        return Response ({"user" : datos_paciente.data  })
    except:
        print("medico sexual no encotrado")     

    return Response({})    