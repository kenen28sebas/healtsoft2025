from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.authentication import TokenAuthentication

#Generar PDF
from django.http import HttpResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from reportlab.pdfgen import canvas
from io import BytesIO
import base64
#
from Gestor_Th.models import Cups 
from .models import *
from .serializer import *
# Create your views here.


from rest_framework import status
from rest_framework.response import Response
#



# con esta funcion lo que se busca es, no permitir la eliminacion ni la actualizacion de una tabla de la historia clinica
class BaseReadCreateViewSet(viewsets.ModelViewSet):
    """ViewSet base que solo permite listar y crear registros"""
    http_method_names = ['get', 'post']

    def update(self, request, *args, **kwargs):
        return Response({'error': 'No puedes modificar este recurso'}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        return Response({'error': 'No puedes eliminar este recurso'}, status=status.HTTP_403_FORBIDDEN)




class SoloMedicos(BasePermission):

    def has_permission(self, request, view):
        try:
            # Verifica si existe un Medico con este usuario
            es_medico = Medico.objects.filter(usuario=request.user).exists()
            if es_medico:
                return True
            else:
                self.message = f"Señor(a) {request.user.first_name} {request.user.last_name}, usted no tiene permisos para realizar registros en Historia Clínica."
                return False
        except Exception as e:
            self.message = "Error al verificar permisos de usuario."
            return False



class CupsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CupsSerializer
    queryset = Cups.objects.all()

    

    def list(self, request, *args, **kwargs):
        """Devuelve solo los códigos y nombres de los CUPS para seleccionar"""
        cups = Cups.objects.all().values( 'codigo', 'Nombre')
        return Response(cups)

class AnamnesisViewset(viewsets.ModelViewSet):
    schema = None
    serializer_class = AnamnesisSerializer
    queryset = Anamnesis.objects.all()
    http_method_names = ['get', 'post']

    def create(self, request):
        serializer = AnamnesisSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Anamnesis creado con exito'})



class Cie10Viewset(viewsets.ModelViewSet):
    serializer_class = Cie10Serializer
    queryset = Cie10.objects.all()
    http_method_names = ['get', 'post']
    


    def create(self, request):
        serializer = Cie10Serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Cie-10 Registrado con Exito'})

class DiagnosticoViewset(viewsets.ModelViewSet):
    serializer_class = DiagnosticoSerializer
    queryset = Diagnostico.objects.all()
    http_method_names = ['get', 'post']


    def create(self, request):
        serializer = AntecedentesMedicosSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Antecedentes Registrados con Exito'})


class AntecedentesMedicosViewset(viewsets.ModelViewSet):
    serializer_class = AntecedentesMedicosSerializer
    queryset = AntecedentesMedicos.objects.all()
    http_method_names = ['get', 'post']


    def create(self, request):
        serializer = AntecedentesMedicosSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Antecedentes Registrados con Exito'})
    
class SignosVitalesViewset(viewsets.ModelViewSet):
    serializer_class = SignosVitalesSerializer
    queryset = SignosVitales.objects.all()
    http_method_names = ['get', 'post']


    def create(self, request):
        serializer = SignosVitalesSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Signos Registrados con Exito'})
    
class ParaclinicosViewset(viewsets.ModelViewSet):
    serializer_class = ParaclinicosSerializer
    queryset = Paraclinicos.objects.all()
    http_method_names = ['get', 'post']


    def create(self, request):
        serializer = ParaclinicosSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Examenes Registrados con Exito'})
        

class OrdenDeProcedimientosViewset(viewsets.ModelViewSet):
    serializer_class = OrdenDeProcedimientosSerializer
    queryset = OrdenDeProcedimientos.objects.all()
    http_method_names = ['get', 'post']


    def create(self, request):
        serializer = OrdenDeProcedimientosSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Orden Registrada con Exito'})

    # para crear el pdf y descargar la orden
    @action(detail=True, methods=['get'])
    def generar_pdf(self, request, pk=None):
    #"""Genera un PDF con la información de la orden de procedimiento en base64"""
        try:
            orden = self.get_object()
            historia = HistoriaClinica.objects.filter(orden_de_procedimientos=orden).first()

            if not historia:
                return Response({"error": "No se encontró la historia clínica asociada"}, status=404)

            buffer = BytesIO()
            p = canvas.Canvas(buffer)

            # Agregar contenido al PDF
            p.drawString(100, 800, f"Orden de Procedimiento N° {orden.id}")
            p.drawString(100, 780, f"Paciente: {historia.paciente.usuario.first_name} {historia.paciente.usuario.last_name}")
            p.drawString(100, 760, f"Médico: {historia.medico.usuario.first_name} {historia.medico.usuario.last_name}")
            p.drawString(100, 740, f"Procedimiento: {orden.cups.codigo_cups} - {orden.cups.descripcion_cups}")

            p.showPage()
            p.save()

            buffer.seek(0)
            pdf_base64 = base64.b64encode(buffer.read()).decode('utf-8')

            return Response({"pdf_base64": pdf_base64}, status=200)

        except OrdenDeProcedimientos.DoesNotExist:
            return Response({"error": "Orden de procedimiento no encontrada"}, status=404)



class MedicamentoViewset(viewsets.ModelViewSet):
    serializer_class = MedicamentoSerializer
    queryset = Medicamento.objects.all()
    http_method_names = ['get', 'post']


    def create(self, request):
        serializer = MedicamentoSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Medicamento Registrado con Exito'})


class FormulaMedicaViewset(viewsets.ModelViewSet):
    serializer_class = FormulaMedicaSerializer
    queryset = FormulaMedica.objects.all()
    http_method_names = ['get', 'post']


    def create(self, request):
        serializer = FormulaMedicaSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':'Fórmula Registrada con Exito'})



class EvolucionViewset(viewsets.ModelViewSet):
    serializer_class = EvolucionSerializer
    queryset = Evolucion.objects.all()
    http_method_names = ['get', 'post']


    def create_evolucion(self, request):
        serializer = EvolucionSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'status':'Evolucion Registrada con Éxito'})



class HistoriaClinicaViewset(viewsets.ModelViewSet):
    serializer_class = HistoriaClinicaSerializer
    queryset = HistoriaClinica.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, SoloMedicos]
    http_method_names = ['get', 'post']

    def create(self, request):
        serializer = HistoriaClinicaSerializer(data = request.data)
        if not serializer.is_valid:
            print(serializer.errors)
        serializer.is_valid(raise_exception=True)
        historia = serializer.save()
        return Response({'status':'creado con exito',
        'historia_clinica': HistoriaClinicaSerializer(historia).data
        })


    def get_queryset(self):
        nro_doc = self.request.query_params.get('nro_doc')
        # Obtener nro_doc desde los parámetros de la URL
        print(nro_doc)
        year = self.request.query_params.get('year')
        if nro_doc:
            paciente = Paciente.objects.get(usuario_id = nro_doc)
            print(f' 1{self.queryset.filter(Nro_historia = paciente.usuario_id)}')
            filtrado = HistoriaClinica.objects.filter(Nro_historia=paciente.usuario_id)
            return filtrado
            if not serializer.is_valid():
                print(historias.errors)

            return HistoriaClinica.historia_manager.listar_historia_documento(nro_doc)
        return super().get_queryset() 

        # si quiero buscar las historias por año de registro
        if year and yaer.isdigit():  # Verifica que sea un número que se le pase
            
            queryset = queryset.filter(fecha_atencion__year=int(year))

        return queryset
