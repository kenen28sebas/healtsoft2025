from rest_framework import serializers
from Gestor_Th.models import *

class Ipsserializador(serializers.ModelSerializer):
    class Meta:
        model=Ips
        fields='__all__'

class Cupsserializador(serializers.ModelSerializer):
    class Meta:
        model=Cups
        fields='__all__'

class Hojaserializador(serializers.ModelSerializer):
    class Meta:
        model=Hoja_Vida
        fields='__all__'

class Academicoserializador(serializers.ModelSerializer):
    class Meta:
        model=Academico
        fields='__all__'

class Experienciaserializador(serializers.ModelSerializer):
    class Meta:
        model=Experiencia_laboral
        fields='__all__'

class SolicitudSerializador(serializers.ModelSerializer):
    class Meta:
        model=SolicitudActualizacionHV
        fields='__all__'

