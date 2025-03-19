from django.shortcuts import render
from Gestor_Th.serializer import *
from Gestor_Th.models import *
from .serializer import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,authentication_classes,permission_classes


# Create your views here.

class Ipsvista(viewsets.ModelViewSet):
    serializer_class=Ipsserializador
    queryset=Ips.objects.all()

class Serviciovista(viewsets.ModelViewSet):
    serializer_class=Servicioserializador
    queryset=Servicio.objects.all()


class Hojavista(viewsets.ModelViewSet):
    serializer_class=Hojaserializador
    queryset=Hoja_Vida.objects.all()

class Academicosvista(viewsets.ModelViewSet):
    serializer_class=Academicoserializador
    queryset=Academico.objects.all()

class Experienciavista(viewsets.ModelViewSet):
    serializer_class=Experienciaserializador
    queryset=Experiencia_laboral.objects.all()

# class SolicitudActualizacionVista(APIView):
#     def get(self,request):
#         solicitudes=SolicitudActualizacionHV.objects.all()
#         serializer=SolicitudSerializador(solicitudes,many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     def post(self, request):
#         serializer=SolicitudSerializador(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# class SolicitudActualizacionVista(viewsets.ModelViewSet):
#     serializer_class=SolicitudSerializador
#     queryset=SolicitudActualizacionHV.objects.all()



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def solicitud_actualizacion_hv(request):
    """Cualquier usuario autenticado puede hacer una solicitud de actualización de hoja de vida."""
    
    if request.method == 'POST':
        medico = Medico.objects.filter(usuario=request.user).first()
        if not medico:
            return Response({"error": "Solo los médicos pueden solicitar una actualización"}, status=403)

        serializer = SolicitudSerializador(data=request.data)
        if serializer.is_valid():
            serializer.save(personal_medico=medico)
            return Response({"mensaje": "Tu solicitud ha sido enviada"}, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET','PATCH'])
@permission_classes([IsAuthenticated])
def gestion_solicitud(request,solicitud_id=None):

    if request.method=="GET":
        solicitudes=SolicitudActualizacionHV.objects.filter(estado="pendiente")
        serializer=SolicitudSerializador(solicitudes,many=True)
        return Response(serializer.data)
    
    if request.method=='PATCH':
        if not solicitud_id:
            return Response({"error":"se requiere un id de solicitud"},status=400)
        
        try:
            solicitud=SolicitudActualizacionHV.objects.get(id=solicitud_id)
        except SolicitudActualizacionHV.DoesNotExist:
            return Response({"error":"no se encontro la solicitud"},status=404)
        
        serializer=SolicitudSerializador(solicitud, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje":f"solicitud {serializer.validated_data ['estado']} correctamente"},status=200)
        return Response(serializer.errors,status=400)
    


