from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token



class CitaSerializer(serializers.ModelSerializer):
    fecha_de_solicitud = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S')
    fecha_de_asignacion = serializers.DateTimeField(
    format='%d-%m-%Y %H:%M:%S',
    input_formats=['%d-%m-%Y %H:%M:%S', '%d-%m-%Y', '%Y/%m/%d']
)


    class Meta:
        model = Cita
        fields = [
            'id', 
            'fecha_de_solicitud',
            'fecha_de_asignacion',
            'prioridad',
            'cups',
            'paciente',
            'medico',
            'estado'
        ]
