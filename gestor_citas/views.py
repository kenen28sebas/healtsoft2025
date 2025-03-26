from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import*
from .serializer import *
from usuarios.serializer import *

class CitaPacienteViewSet(ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post']

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

    def retrieve(self, request, pk=None, *args, **kwargs):
        self.queryset = self.queryset.filter(paciente_id = request.user.nro_doc)
        objeto = self.get_object()
        serializer = self.get_serializer(objeto)
        return Response({
            "message": "Detalle del objeto con datos personalizados",
            "data": serializer.data
        })
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(paciente_id = request.user.nro_doc)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

@api_view(["get"])
def getMedicos (resquest):
    medico = Medico.objects.all()
    serializer = MedicoSerializador(medico , many = True)
    return Response(serializer.data)

# @api_view(["GET"])
# def getCups (resquest):
#     cups = Cups.objects.all()
#     serializers = Cups

# class CitaPacienteViewSet(ModelViewSet):
#     queryset = Cita.objects.all()
#     serializer_class = CitaSerializer
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def create(self, request):
#         print(request.user.last_name)
#         print(request.data["medico"])
#         paciente = get_object_or_404(Paciente, usuario_id = request.data["nro_doc"] )
#         # serializersPaciente = PacienteSerializador(instance = paciente )
#         medico = get_object_or_404(Medico, usuario_id = request.data["medico"] )
#         # serializersMedico = MedicoSerializador(instance = medico)
#         cups = get_object_or_404(Cups,codigo = request.data.get('cups'))
#         data = request.data
#         data["medico"] = medico.id
#         data["paciente"] = paciente.id
#         data["cups"] = cups.codigo
#         # fecha_de_asignacion = request.data.get('fecha_de_asignacion')
#         # prioridad = request.data.get('prioridad')
#         # estado = request.data.get('estado')

#         serializer_class = self.get_serializer_class()
#         serializer = serializer_class(data = data)
#         print(serializer.is_valid()) 
#         if not serializer.is_valid():
#             print(serializer.errors)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"cita" : serializer.data},status=status.HTTP_201_CREATED)



#         # Crear la instancia de la cita
#         # cita = Cita.objects.create(
#         #     fecha_de_asignacion=fecha_de_asignacion,
#         #     prioridad=prioridad,
#         #     estado=estado,
#         #     cups=cups,
#         #     paciente=paciente,
#         #     medico=medico
#         # )

#         return Response(status=status.HTTP_201_CREATED)

#     def retrieve(self, request, pk=None, *args, **kwargs):
#         self.queryset = self.queryset.filter(paciente_id = request.user.nro_doc)
#         objeto = self.get_object()
#         serializer = self.get_serializer(objeto)
#         return Response({
#             "message": "Detalle del objeto con datos personalizados",
#             "data": serializer.data
#         })
#     def list(self, request, *args, **kwargs):
#         queryset = self.filter_queryset(self.get_queryset())
#         queryset = queryset.filter(paciente_id = request.user.nro_doc)
#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)