from rest_framework import status
from rest_framework.viewsets import *
from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializer import *
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

#vistas hoja de vida
@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_hv(request):
    print (request.data)
    usuario = request.user
    gestor_th = get_object_or_404(Gestor_TH, usuario__nro_doc=usuario.nro_doc)
    nro_doc = request.data.get("nro_doc")
    print(request.data)
    print(nro_doc)
    if not nro_doc:
        return Response({"error":"ese señor no existe"})
    medico = get_object_or_404(Medico, usuario__nro_doc=nro_doc)
    medicoSerializado = MedicoSerializador(instance = medico)
    print(medicoSerializado.data["id"])
    print("sadasd")
    if Hoja_Vida.objects.filter(personal_medico = medico).exists():
        return Response({"error":"el señor ya tiene hoja de vida"},status=status.HTTP_400_BAD_REQUEST)
    
    hoja_vida = {"personal_medico" : medicoSerializado.data["id"], "gestor_th":gestor_th.id}
    serializerhv = HojaVidaSerializer(data = hoja_vida)
    print(hoja_vida)
    print(serializerhv.is_valid())
    if not serializerhv.is_valid():
        print(serializerhv.errors)
    if serializerhv.is_valid():
            serializerhv.save()
            return Response({"s": serializerhv.data})
    else:
        return Response(serializerhv.errors, status=status.HTTP_400_BAD_REQUEST)
    
    experiencias = request.data.get("experiencia_laboral",None)
    academicos = request.data.get("academico",None)

    if experiencias:
        for expl in experiencias:
            expl["hoja_vida"]=hoja_vida.id
        
        explaserializer = ExpLaSerializer(data = experiencias, many = True)
        if explaserializer.is_valid():
            explaserializer.save()
        else:
            return Response(explaserializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if academicos:
        for aca in academicos:
            aca["hoja_vida"]=hoja_vida.id

        acaserializer = AcademicoSerializer(data = academicos, many = True)
        if acaserializer.is_valid():
            acaserializer.save()
        else:
            return Response(acaserializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    return Response({"mensaje":"Hoja de vida genial creada correctamente"},status=status.HTTP_201_CREATED)

@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_hv(request,nro_doc):
    usuario = request.user
    gestor_th = get_object_or_404(Gestor_TH , usuario__nro_doc = usuario.nro_doc)
    medico = get_object_or_404(Medico , usuario_id = nro_doc)
    hoja_vida = get_object_or_404(Hoja_Vida , personal_medico_id = medico)
    serializer = HojaVidaSerializer(hoja_vida , data = request.data , partial = True)
    print(serializer.is_valid())
    if serializer.is_valid():
        serializer.save()
        return Response ({"mensaje":"Hoja de vida actualizada correctamente"})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consultar_hv(request):
    usuario = request.query_params.get('nro_doc')
    print(usuario)
    personal_medico = Medico.objects.filter(usuario_id = usuario).first()

    if not personal_medico:
        return Response({"error":"no puede hacer eso señor"},status=status.HTTP_403_FORBIDDEN)
    
    hoja_vida = Hoja_Vida.objects.filter(personal_medico_id = personal_medico).first()
    if not hoja_vida:
        return Response({"error":"no se encontro hoja de vida pa usted jijiji"},status=status.HTTP_404_NOT_FOUND)
    
    academicos = Academico.objects.filter(hoja_vida = hoja_vida)
    experiencia = Experiencia_laboral.objects.filter(hoja_vida = hoja_vida)

    serializerhv = HojaVidaSerializer(hoja_vida).data
    serializeraca = AcademicoSerializer(academicos , many = True).data
    serializerexpl = ExpLaSerializer(experiencia,many=True).data

    return Response({
        "hoja_vida":serializerhv,
        "academicos":serializeraca,
        "experiencia":serializerexpl
    },status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consultar_todas_hv(request):
    hojas_vida = Hoja_Vida.objects.all()
    serializer = HojaVidaSerializer(hojas_vida)

    return Response(serializer.data)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_hv(request,id):
    usuario = request.user

    gestor_th = get_object_or_404(Gestor_TH, usuario__nro_doc=usuario.nro_doc)
    if not gestor_th:
        return Response({"error":"usted no puede hacer eso"},status=status.HTTP_403_FORBIDDEN)
    
    hoja_vida = get_object_or_404(Hoja_Vida,id = id)
    hoja_vida.delete()
    return Response({"mensaje":"Se elimino correctamente"})

#vistas academicos miaus
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_academicos(request):
    usuario = request.user
    gestor_th = get_object_or_404(Gestor_TH, usuario__nro_doc=usuario.nro_doc)
    nro_doc = request.data.get("nro_doc")
    medico = get_object_or_404(Medico, usuario__nro_doc=nro_doc)
    hoja_vida = get_object_or_404(Hoja_Vida, personal_medico = medico)

    academico_datos = request.data.get("academico")
    if not academico_datos:
        return Response({"error":"pero escriba algo hermano"},status=status.HTTP_400_BAD_REQUEST)
    
    for a in academico_datos:
        a["hoja_vida"] = hoja_vida.id
    
    serializer = AcademicoSerializer(data = academico_datos,many = True)
    if serializer.is_valid():
        serializer.save()

        return Response({"mensaje":"registro creado correctamente excelente jose"},status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_academico(request,id):
    usuario = request.user
    gestor_th = Gestor_TH.objects.filter(usuario__nro_doc = usuario.nro_doc).first()

    if not gestor_th:
        return Response ({"error":"usted no puede señor abra paso"},status=status.HTTP_403_FORBIDDEN)
    
    academico = Academico.objects.filter(id = id).first()
    if not academico:
        return Response({"error":"academico no encontrado jijiji"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = AcademicoSerializer(academico ,  data = request.data , partial = True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_academico(request,id):
    usuario = request.user

    gestor_th = Gestor_TH.objects.filter(usuario__nro_doc = usuario.nro_doc).first()

    if not gestor_th:
        return Response ({"error":"uste no puede hacer eso adios"},status=status.HTTP_403_FORBIDDEN)
    
    academico = get_object_or_404(Academico,id= id)
    academico.delete()
    return Response({"mensaje":"se elimino correctamente"})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consultar_academicos(request,nro_doc):
    usuario = request.user
    personal_medico = Medico.objects.filter(usuario__nro_doc = nro_doc).first()
    if not personal_medico:
        return Response({"error":"el medico no existe"}, status=status.HTTP_404_NOT_FOUND)
    
    hoja_vida = Hoja_Vida.objects.filter(personal_medico=personal_medico).first()
    if not hoja_vida:
        return Response({"error":"ese man no tiene hoja de vida"},status=status.HTTP_404_NOT_FOUND)
    
    academicos = Academico.objects.filter(hoja_vida=hoja_vida)

    serializer = AcademicoSerializer(academicos,many = True)
    return Response(serializer.data)

#vistas experiencia laboral
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_experiencia(request):
    usuario = request.user
    gestor_th = get_object_or_404(Gestor_TH, usuario__nro_doc = usuario.nro_doc)
    nro_doc = request.data.get("nro_doc")
    medico = get_object_or_404(Medico, usuario__nro_doc=nro_doc)
    hoja_vida = get_object_or_404(Hoja_Vida, personal_medico = medico)
    print(1)
    experiencia_datos = request.data.get("experiencia_laboral",[])
    if not experiencia_datos:
        return Response ({"error":"pero escriba algo hermano"})
    
    for e in experiencia_datos:
        e["hoja_vida"]=hoja_vida.id

    serializer = ExpLaSerializer(data = experiencia_datos, many = True)
    if not serializer.is_valid():
        print(serializer.errors)

    if serializer.is_valid():
        serializer.save()
        return Response({"mensaje":"registro cerado correctamente"},status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_experiencia(request,id):
    usuario = request.user

    gestor_th = Gestor_TH.objects.filter(usuario__nro_doc = usuario.nro_doc).first()
    if not gestor_th:
        return Response({"error":"no tiene permiso para hacer eso viejo"}, status=status.HTTP_403_FORBIDDEN)
    experiencia = Experiencia_laboral.objects.filter(id = id).first()
    if not experiencia:
        return Response({"error":"experiencia no encontrada"}, status=status.HTTP_404_NOT_FOUND)
    print ("datos recibidos:" , request.data)
    serializer = ExpLaSerializer(experiencia , data=request.data , partial = True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    if not serializer.is_valid():
        print("Errores del serializer:", serializer.errors)

    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_experiencia(request,id):
    usuario = request.user

    gestor_th = Gestor_TH.objects.filter(usuario__nro_doc=usuario.nro_doc).first()

    if not gestor_th:
        return Response ({"error":"no tienes permiso"},status=status.HTTP_403_FORBIDDEN)
    
    experiencia = get_object_or_404(Experiencia_laboral,id=id)
    experiencia.delete()
    return Response({"mensaje":"se elimino correctamente"})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consultar_experiencias(request,nro_doc):
    usuario = request.user
    personal_medico = Medico.objects.filter(usuario__nro_doc = nro_doc).first()

    if not personal_medico:
        return Response({"error":"el medico no existe"},status=status.HTTP_404_NOT_FOUND)
    
    hoja_vida = Hoja_Vida.objects.filter(personal_medico = personal_medico).first()
    if not hoja_vida:
        return Response({"error":"ese man no tiene hoja de vida"},status=status.HTTP_404_NOT_FOUND)
    

    experiencias = Experiencia_laboral.objects.filter(hoja_vida=hoja_vida)
    serializer = ExpLaSerializer(experiencias,many=True)

    return Response(serializer.data)
#vistas ips
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_ips(request):
    usuario = request.user
    
    gerente = get_object_or_404(Gerente, usuario__nro_doc=usuario.nro_doc)
    serializer = IpsSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"mensaje":"bueeeeeena si se pudo jiji"},status=status.HTTP_201_CREATED)
    print(serializer.errors)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_ips(request , id):
    usuario = request.user
    gerente = Gerente.objects.filter(usuario__nro_doc = usuario.nro_doc).first()

    if not gerente:
        return Response({"error":"que no hermano, abra paso -.-"} , status=status.HTTP_403_FORBIDDEN)
    
    ips = Ips.objects.filter(id = id).first()

    if not ips:
        return Response ({"error":"esa ips solo existe en su imaginacion,abra paso"} , status=status.HTTP_404_NOT_FOUND)
    
    serializer = IpsSerializer(ips , data = request.data , partial = True)

    if serializer.is_valid():
        serializer.save()
        return Response({"mensaje":"ya se actualizo la vaina"} , status=status.HTTP_200_OK)
    return Response (serializer.errors , status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_ips(request , id):
    usuario = request.user
    gerente = Gerente.objects.filter(usuario__nro_doc = usuario.nro_doc).first()

    if not gerente:
        return Response({"error":"usted no puede jijijiji abra paso"},status=status.HTTP_403_FORBIDDEN)
    
    ips = Ips.objects.filter(id = id).first()

    if not ips:
        return Response({"error":"esa vaina no existe"} , status=status.HTTP_404_NOT_FOUND)
    
    ips.delete()
    return Response({"mensaje":"se elimino correctamente miauu"},status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consultar_ips(request):
    usuario = request.user
    gerente = Gerente.objects.filter(usuario__nro_doc = usuario.nro_doc).first()

    if not gerente:
        return Response({"error":"que no puedes hacer eso"})
    
    ips = Ips.objects.all()
    serializer = IpsSerializer(ips , many = True)
    return Response (serializer.data , status=status.HTTP_200_OK)

#vistas servicios jijiji
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_servicio(request):
    usuario = request.user

    gerente = get_object_or_404(Gerente, usuario__nro_doc=usuario.nro_doc)

    ips_id = request.data.get("ips_id")

    ips = get_object_or_404(Ips,id = ips_id)

    servicio_datos = request.data.copy()
    servicio_datos["ips"] = ips.id

    serializer = ServicioSerializer(data = servicio_datos)
    if serializer.is_valid():
        serializer.save()
        return Response({"mensaje":"se registro correctamente vieja"},status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_servicio(request , codigo):
    usuario = request.user
    gerente = Gerente.objects.filter(usuario__nro_doc = usuario.nro_doc).first()

    if not gerente:
        return Response ({"error":"usted no puede actualizar los servicios"},status=status.HTTP_403_FORBIDDEN)
    
    servicio = get_object_or_404(Cups , codigo = codigo)

    serializer = ServicioSerializer(servicio , data = request.data , partial = True)
    if serializer.is_valid():
        serializer.save()
        return Response({"mensaje":"se actualizo correctamente"})
    return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_servicio(request , codigo):
    usuario = request.user
    gerente = Gerente.objects.filter(usuario__nro_doc = usuario.nro_doc).first()
    if not gerente:
        return Response({"error":"no tienes permiso para eliminar el servicio"},status=status.HTTP_403_FORBIDDEN)
    
    servicio = get_object_or_404(Cups , codigo = codigo)

    servicio.delete()
    return Response({"mensaje":"se elimino correctamente, abra paso"},status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consultar_servicio(request):
    usuario = request.user
    gerente = Gerente.objects.filter(usuario__nro_doc = usuario.nro_doc).first()

    if not gerente:
        return Response({"error":"usted no puede hacer eso, abra paso"})
    
    servicios = Cups.objects.all()

    serializer = ServicioSerializer (servicios , many = True)
    return Response(serializer.data , status=status.HTTP_200_OK)
#vistas cargos miaus
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_cargo(request):
    usuario = request.user

    print(request.data)

    gerente = get_object_or_404(Gerente, usuario__nro_doc=usuario.nro_doc)

    ips_id = request.data.get("ips_id")
    
    if not ips_id:
        return Response({"error": "se le olvido el id amigo"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        ips = Ips.objects.get(id=ips_id)
    except Ips.DoesNotExist:
        return Response({"error": "esa vaina no existe jajsanhja"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()
    data['ips'] = ips.id 

    serializer = CargoSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#vista para la api genial de jesus aaaaa
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consultar_cargos(request):
    usuario = request.user 
    # gerente = get_object_or_404(Gerente, usuario=usuario)

    # try:
    #     gerente = get_object_or_404(Gerente, usuario = usuario)
    
    # except:
    #     gestor_th = get_object_or_404(Gestor_TH , usuario = usuario)

    
    cargos = Cargo.objects.all()
    serializer = CargoSerializer(cargos, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def consultar_cargos_filter(request,id):
    usuario = request.user 

    
    cargos = Cargo.objects.get(id = id)
    serializer = CargoSerializer(cargos)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def actualizar_cargo(request, cargo_id):
    usuario = request.user

    gerente = get_object_or_404(Gerente, usuario=usuario)

    if not gerente:
        return Response({"error":"No puedes hacer eso fuera"},status=status.HTTP_403_FORBIDDEN)
    
    cargo = get_object_or_404(Cargo,id = cargo_id)
    
    serializer = CargoSerializer(cargo,data=request.data,partial = True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def eliminar_cargo(request,id):
    usuario = request.user

    gerente = get_object_or_404(Gerente,usuario=usuario)

    if not gerente:
        return Response({"error":"que no hermano"},status=status.HTTP_403_FORBIDDEN)
    
    cargo = get_object_or_404(Cargo,id = id)
    cargo.delete()
    return Response({"mensaje":"cargo eliminado correctamente jijkj"},status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def listar_hv(request):
    usuario = request.user

    gestor_th = get_object_or_404(Gestor_TH , usuario = usuario)

    if not gestor_th:
        return Response({"error":"no tienes permiso de hacer eso"}, status=status.HTTP_403_FORBIDDEN)
    
    hojas_vida = Hoja_Vida.objects.all()
    serializer = HojaVidaSerializerListar(hojas_vida, many = True)

    return Response(serializer.data , status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def crear_solicitud(request):
    usuario = request.user

    personal_medico = get_object_or_404(Medico, usuario = usuario)

    if not personal_medico:
        return Response({"error":"nelson no puede hacer es, abra paso"}, status=status.HTTP_403_FORBIDDEN)
    
    data = request.data.copy()
    data["personal_medico_id"] = personal_medico.id

    serializer = SolicitudAcHvSerializer(data = data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data , status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def gestionar_personal(request , nro_doc):
    try:
        usuario = Usuario.objects.get(nro_doc = nro_doc)
        usuario.is_active = not usuario.is_active
        usuario.save()

        return Response ({"mensaje":"usuario genial "} , status=status.HTTP_200_OK)
    
    except Usuario.DoesNotExist:
        return Response ({"error":"no se encontro el señor"}, status=status.HTTP_404_NOT_FOUND)

