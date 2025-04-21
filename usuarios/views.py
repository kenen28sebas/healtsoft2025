from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from .models import *
from .serializer import *
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


@swagger_auto_schema(
    method='post',
    operation_description="Registra un nuevo auxiliar administrativo.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['tipo_usuario', 'usuario'],
        properties={
            'tipo_usuario': openapi.Schema(
                type=openapi.TYPE_STRING,
                enum=["auxiliar"],
                description="Debe ser 'auxiliar'"
            ),
            'tipo_contrato': openapi.Schema(
                type=openapi.TYPE_STRING,
                description="Tipo de contrato del auxiliar."
            ),
            'fecha_ingreso': openapi.Schema(
                type=openapi.TYPE_STRING,
                format="date",
                description="Fecha de ingreso (YYYY-MM-DD)."
            ),
            'usuario': openapi.Schema(
                type=openapi.TYPE_OBJECT,
                required=['nro_doc', 'tipo_doc', 'email', 'password'],
                properties={
                    'nro_doc': openapi.Schema(type=openapi.TYPE_STRING),
                    'tipo_doc': openapi.Schema(type=openapi.TYPE_STRING),
                    'lugar_exp_doc': openapi.Schema(type=openapi.TYPE_STRING),
                    'fecha_exp_doc': openapi.Schema(type=openapi.TYPE_STRING, format="date"),
                    'fecha_nacimiento': openapi.Schema(type=openapi.TYPE_STRING, format="date"),
                    'sexo': openapi.Schema(type=openapi.TYPE_STRING),
                    'estado_civil': openapi.Schema(type=openapi.TYPE_STRING),
                    'telefono': openapi.Schema(type=openapi.TYPE_STRING),
                    'nacionalidad': openapi.Schema(type=openapi.TYPE_STRING),
                    'municipio': openapi.Schema(type=openapi.TYPE_STRING),
                    'username': openapi.Schema(type=openapi.TYPE_STRING),
                    'first_name': openapi.Schema(type=openapi.TYPE_STRING),
                    'last_name': openapi.Schema(type=openapi.TYPE_STRING),
                    'email': openapi.Schema(type=openapi.TYPE_STRING, format="email"),
                    'password': openapi.Schema(type=openapi.TYPE_STRING, format="password"),
                }
            )
        }
    ),
    responses={
        200: "Auxiliar registrado exitosamente",
        400: "Error en los datos"
    }
)
@api_view(["POST"])
def registrar (request):
    
    tipo_ususrio = request.data["tipo_usuario"]
    print(tipo_ususrio)
    match tipo_ususrio:
        case "medico":
            serializer=MedicoSerializador(data= request.data)
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

            if not serializer.is_valid():
                # Acceder a los errores
                print(serializer.errors)
            if serializer.is_valid():
                
                serializer.save()
                return Response({"user":serializer.data})
        case "auxiliar":
            serializer = AuxiliarAdminSerializador(data = request.data)   
            print(serializer.is_valid())
            if not serializer.is_valid():
                # Acceder a los errores
                print(serializer.errors)
            if serializer.is_valid():
                
                serializer.save()
                return Response({"user":serializer.data})


    return Response({"error": "error" ,"user" : request.data})


@swagger_auto_schema(
    method='post',
    operation_description="Autentica a un usuario y devuelve un token JWT.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['tipo_usuario', 'nro_doc', 'password'],
        properties={
            'tipo_usuario': openapi.Schema(type=openapi.TYPE_STRING, enum=["medico", "gestor_th", "paciente", "auxiliar"], description="Tipo de usuario."),
            'nro_doc': openapi.Schema(type=openapi.TYPE_STRING, description="Número de documento del usuario."),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description="Contraseña del usuario."),
        },
    ),
    responses={
        200: openapi.Response(
            description="Login exitoso",
            examples={
                "application/json": {
                    "user": {
                        "nro_doc": "12345678",
                        "tipo_usuario": "medico",
                        # ... otros campos del serializador
                    },
                    "token": "abc123...",
                }
            }
        ),
        400: openapi.Response(
            description="Error en las credenciales",
            examples={
                "application/json": {
                    "error": "clave incorrecta"
                }
            }
        ),
        404: openapi.Response(
            description="Usuario no encontrado",
            examples={
                "application/json": {
                    "error": "erro en la validacion de cuenta"
                }
            }
        ),
    }
)
@api_view(["POST"])
def login (request):
    print(request.data)
    tipo_ususrio = request.data["tipo_usuario"]
    usuario = get_object_or_404(Usuario , nro_doc = request.data["nro_doc"])

    if not usuario.check_password(request.data["password"]):
        return Response({"error" : "clave incorrecta"},status=400)
    
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

 
    return Response ( {"error" : "erro en la validacion de cuenta " } )    
@swagger_auto_schema(
    method='post',
    operation_description="Obtiene el perfil del usuario autenticado (requiere token JWT).",
    security=[{"Bearer": []}],  # Indica que requiere autenticación
    responses={
        200: openapi.Response(
            description="Perfil del usuario",
            examples={
                "application/json": {
                    "user": {
                        "nro_doc": "12345678",
                        "tipo_usuario": "medico",
                        # ... otros campos del serializador
                    },
                    "tipo_usuario": "medico",
                }
            }
        ),
        401: openapi.Response(
            description="No autenticado",
            examples={
                "application/json": {
                    "detail": "Token inválido o no proporcionado."
                }
            }
        ),
    }
)
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
        paciente = get_object_or_404(Paciente , usuario_id = request.user.nro_doc)
        datos_paciente = PacienteSerializador(instance = paciente)
        return Response ({"user" : datos_paciente.data , "tipo_usuario" : "paciente" })
    except:
        print("paciente no encotrado") 

    try : 
        auxiliar = get_object_or_404(Aux_adm , usuario_id = request.user.nro_doc)
        datos_paciente = AuxiliarAdminSerializador(instance  = auxiliar)
        return Response ({"user" : datos_paciente.data , "tipo_usuario" : "auxiliar" })
    except:
        print("aux no encotrado")     

    return Response({})    

