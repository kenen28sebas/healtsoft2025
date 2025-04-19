from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import*
from .serializer import *
from usuarios.serializer import *
from Gestor_Th.serializer import Cupsserializador
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class CitaPacienteViewSet(ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post']

    @swagger_auto_schema(
        operation_description="Crear una nueva cita (Paciente)",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['medico', 'cups', 'fecha_de_asignacion'],
            properties={
                'medico': openapi.Schema(type=openapi.TYPE_STRING, description="Número de documento del médico"),
                'cups': openapi.Schema(type=openapi.TYPE_STRING, description="Código CUPS"),
                'fecha_de_asignacion': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    format='date-time',
                    description="Fecha y hora de la cita (formato: DD-MM-YYYY HH:MM:SS)"
                ),
                'prioridad': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    enum=['URGENTE', 'ALTA', 'MEDIA', 'BAJA'],
                    description="Prioridad de la cita"
                ),
                'estado': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    enum=['PENDIENTE', 'CONFIRMADA', 'CANCELADA'],
                    default='PENDIENTE'
                )
            }
        ),
        responses={
            201: openapi.Response(
                description="Cita creada exitosamente",
                schema=CitaSerializer
            ),
            400: "Datos inválidos",
            404: "Médico o CUPS no encontrado"
        },
        security=[{"Bearer": []}]
    )
    def create(self, request):
        print(request.user.last_name)
        print(request.data["medico"])
        paciente = get_object_or_404(Paciente, usuario_id = request.user.nro_doc )
        # serializersPaciente = PacienteSerializador(instance = paciente )
        medico = get_object_or_404(Medico, usuario_id = request.data["medico"] )
        # serializersMedico = MedicoSerializador(instance = medico)
        cups = get_object_or_404(Cups,codigo = request.data.get('cups'))
        data = request.data
        data["medico"] = medico.id
        data["paciente"] = paciente.id
        data["cups"] = cups.codigo
        # fecha_de_asignacion = request.data.get('fecha_de_asignacion')
        # prioridad = request.data.get('prioridad')
        # estado = request.data.get('estado')

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data = data)
        print(serializer.is_valid()) 
        if not serializer.is_valid():
            print(serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return Response({"cita" : serializer.data},status=status.HTTP_201_CREATED)



        # Crear la instancia de la cita
        # cita = Cita.objects.create(
        #     fecha_de_asignacion=fecha_de_asignacion,
        #     prioridad=prioridad,
        #     estado=estado,
        #     cups=cups,
        #     paciente=paciente,
        #     medico=medico
        # )

        return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_description="Detalle de una cita específica",
        responses={
            200: openapi.Response(
                description="Detalle de la cita",
                schema=CitaSerializer
            ),
            404: "Cita no encontrada"
        },
        security=[{"Bearer": []}]
    )
    def retrieve(self, request, pk=None, *args, **kwargs):
        self.queryset = self.queryset.filter(paciente_id = request.user.nro_doc)
        objeto = self.get_object()
        serializer = self.get_serializer(objeto)
        return Response({
            "message": "Detalle del objeto con datos personalizados",
            "data": serializer.data
        })
    
    @swagger_auto_schema(
        operation_description="Listar citas del paciente autenticado",
        responses={
            200: openapi.Response(
                description="Lista de citas",
                schema=CitaSerializer(many=True))
        },
        security=[{"Bearer": []}]
    )
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(paciente_id = request.user.nro_doc)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

@swagger_auto_schema(
    method='get',
    operation_description="Obtener lista de médicos",
    responses={
        200: openapi.Response(
            description="Lista de médicos",
            schema=MedicoSerializador(many=True))
    },
    security=[{"Bearer": []}]
)
@api_view(["get"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getMedicos (resquest):
    medico = Medico.objects.all()
    serializer = MedicoSerializador(medico , many = True)
    return Response(serializer.data)

@swagger_auto_schema(
    method='get',
    operation_description="Obtener lista de códigos CUPS",
    responses={
        200: openapi.Response(
            description="Lista de CUPS",
            schema=Cupsserializador(many=True))
    },
    security=[{"Bearer": []}]
)
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getCups (resquest):
    cups = Cups.objects.all()
    serializers = Cupsserializador(cups , many = True)
    return Response(serializers.data)

class CitaAuxViewSet(ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Crear una cita (Auxiliar)",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['paciente', 'medico', 'cups'],
            properties={
                'paciente': openapi.Schema(type=openapi.TYPE_STRING, description="Número de documento del paciente"),
                'medico': openapi.Schema(type=openapi.TYPE_STRING, description="Número de documento del médico"),
                'cups': openapi.Schema(type=openapi.TYPE_STRING, description="Código CUPS"),
                'fecha_de_asignacion': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    format='date-time',
                    description="Fecha y hora de la cita (formato: DD-MM-YYYY HH:MM:SS)"
                ),
                'prioridad': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    enum=['URGENTE', 'ALTA', 'MEDIA', 'BAJA']
                )
            }
        ),
        responses={
            201: openapi.Response("Cita creada", CitaSerializer),
            400: "Datos inválidos"
        },
        security=[{"Bearer": []}]
    )
    def create(self, request):
        print(request.user.last_name)
        print(request.data["medico"])
        paciente = get_object_or_404(Paciente, usuario_id = request.data["paciente"] )
        # serializersPaciente = PacienteSerializador(instance = paciente )
        medico = get_object_or_404(Medico, usuario_id = request.data["medico"] )
        # serializersMedico = MedicoSerializador(instance = medico)
        cups = get_object_or_404(Cups,codigo = request.data.get('cups'))
        data = request.data
        data["medico"] = medico.id
        data["paciente"] = paciente.id
        data["cups"] = cups.codigo
        # fecha_de_asignacion = request.data.get('fecha_de_asignacion')
        # prioridad = request.data.get('prioridad')
        # estado = request.data.get('estado')

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data = data)
        print(serializer.is_valid()) 
        if not serializer.is_valid():
            print(serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return Response({"cita" : serializer.data},status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'nro_doc',
                openapi.IN_QUERY,
                description="Filtrar por número de documento del paciente",
                type=openapi.TYPE_STRING
            )
        ],
        responses={
            200: openapi.Response("Lista de citas", CitaSerializer(many=True))
        },
        security=[{"Bearer": []}]
    )
    def get_queryset(self):
            nro_doc = self.request.query_params.get('nro_doc', None)
            if nro_doc:
                print(self.queryset.filter(paciente_id=nro_doc))
                return self.queryset.filter(paciente_id=nro_doc)
            return self.queryset
    
    # def delete(self, request ):
    #     fechaSolicitud = self.request.query_params.get('fecha_de_asignacion', None)
    #     if fechaSolicitud:
    #         try:
    #             instance = Cita.objects.get(fecha_de_asignacion=fechaSolicitud)
    #             instance.delete()
    #             return Response({'mensaje': 'Objeto eliminado con éxito'}, status=204)
    #         except Cita.DoesNotExist:
    #             return Response({'error': 'Objeto no encontrado'}, status=404)
    #     return Response({'error': 'Parámetro fechaSolicitud no proporcionado'}, status=400)
        


        # Crear la instancia de la cita
        # cita = Cita.objects.create(
        #     fecha_de_asignacion=fecha_de_asignacion,
        #     prioridad=prioridad,
        #     estado=estado,
        #     cups=cups,
        #     paciente=paciente,
        #     medico=medico
        # )

#         return Response(status=status.HTTP_201_CREATED)

#     def retrieve(self, request, pk=None, *args, **kwargs):
#         self.queryset = self.queryset.filter(paciente_id = request.user.nro_doc)
#         objeto = self.get_object()
#         serializer = self.get_serializer(objeto)
#         return Response({
#             "message": "Detalle del objeto con datos personalizados",
#             "data": serializer.data
#         })
    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     queryset = queryset.filter(paciente_id = request.data["paciente"])
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)

    
@swagger_auto_schema(
    method='get',
    operation_description="Obtener datos de un paciente específico",
    manual_parameters=[
        openapi.Parameter(
            'nro_doc',
            openapi.IN_PATH,
            description="Número de documento del paciente",
            type=openapi.TYPE_STRING
        )
    ],
    responses={
        200: openapi.Response(
            description="Datos del paciente",
            schema=PacienteSerializador
        ),
        404: "Paciente no encontrado"
    },
    security=[{"Bearer": []}]
)
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPaciente(request,nro_doc):

    paciente = get_object_or_404(Paciente , usuario_id = nro_doc)
    serializer = PacienteSerializador(paciente)
    print(serializer.data)
    return Response({"datos" : serializer.data})

@api_view(["GET"])
def verificarDocumentoExistente(request,nro_doc):
    try:
        paciente = get_object_or_404(Usuario , nro_doc = nro_doc)
        return Response({"exist" : True})
    except:
        return Response({"exist" : False})