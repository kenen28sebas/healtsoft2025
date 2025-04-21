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

    tipo_usuario = request.data["tipo_usuario"]
    match tipo_usuario:
        case "medico":
            serializer=MedicoSerializador(data= request.data)
            print(serializer.is_valid())
            print(serializer.errors)
            if serializer.is_valid(): 
                serializer.save()
                
                return Response({"user":serializer.data})
        case "gestor_th":
            serializerTH=Gestor_thSerializador(data=request.data)
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
            
        case "gerente":
            serializer =GerenteSerializador(data = request.data)   
            if serializer.is_valid():
                
                serializer.save()
                return Response({"user":serializer.data})
            else:
                print(serializer.errors)


    return Response({"error": "error" ,"user" : request.data})


@api_view(["POST"])
def login (request):
    print(request.data)
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
                return Response ({"user" : datos_medico.data , "token" : token.key , "tipo de usuario":"medico"})
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
                datos_paciente = PacienteSerializador(instance  = paciente)
                return Response ({"user" : datos_paciente.data  , "token" : token.key })
            except:
                print("medico sexual no encotrado") 
        case "auxiliar":
            try : 
                auxiliar = get_object_or_404(Aux_adm , usuario_id = request.data["nro_doc"])
                token,create = Token.objects.get_or_create( user = usuario)
                datos_paciente = AuxiliarAdminSerializador(instance  = auxiliar)
                return Response ({"user" : datos_paciente.data  , "token" : token.key })
            except:
                print("medico sexual no encotrado")

        case "gerente":
            try:
                gerente=get_object_or_404(Gerente,usuario_id = request.data["nro_doc"])
                token,create=Token.objects.get_or_create(user = usuario)
                datos_gerente = GerenteSerializador(instance=gerente)
                return Response ({"user": datos_gerente.data , "token": token.key})
            except:
                print("señor gerente no encontrado jijiji")

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
        return Response ({"user" : datos_medico.data, "tipo_usuario" : "medico"})
    except:
        print("medico no encotrado1")        
    

    try:
        gestor_th = get_object_or_404(Gestor_TH , usuario_id = request.user.nro_doc)
        datos_gestor_th = Gestor_thSerializador(instance = gestor_th)
        return Response ( {"user" : datos_gestor_th.data , "tipo_usuario" : "gestor_th" } )  
    except:
        print("gth no encotrado")   

    try : 
        paciente = get_object_or_404(Paciente , usuario_id = request.data["nro_doc"])
        datos_paciente = PacienteSerializador(instance = paciente)
        return Response ({"user" : datos_paciente.data  })
    except:
        print("paciente no encotrado") 

    try : 
        auxiliar = get_object_or_404(Aux_adm , usuario_id = request.user.nro_doc)
        datos_paciente = AuxiliarAdminSerializador(instance  = auxiliar)
        return Response ({"user" : datos_paciente.data , "tipo_usuario" : "auxiliar" })
    except:
        print("medico sexual no encotrado")     

    try:
        gerente=get_object_or_404(Gerente,usuario_id = request.data["nro_doc"])
        datos_gerente = GerenteSerializador(instance = gerente)
        return Response ({"user":datos_gerente.data})
    except:
        print("jijjijij nop")

    return Response({})    


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_usuario(request,nro_doc):
    usuario = get_object_or_404(Usuario, nro_doc=nro_doc)
    usuario.delete()
    return Response({"message": "Usuario eliminado correctamente."})

@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_usuario(request, nro_doc):
    usuario_autenticado = request.user
    gestor_th = get_object_or_404(Gestor_TH, usuario=usuario_autenticado)

    medico = get_object_or_404(Medico, usuario__nro_doc=nro_doc)
    usuario = medico.usuario

    usuario_serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
    medico_serializer = MedicoSerializador(medico, data=request.data, partial=True)

    usuario_valido = usuario_serializer.is_valid()
    medico_valido = medico_serializer.is_valid()

    if usuario_valido and medico_valido:
        usuario_serializer.save()
        medico_serializer.save()
        return Response({"message": "Usuario y médico actualizados correctamente"})

    errores = {}
    if not usuario_valido:
        errores["usuario_errors"] = usuario_serializer.errors
    if not medico_valido:
        errores["medico_errors"] = medico_serializer.errors

    return Response({"error": "Error en la actualización", "details": errores})
