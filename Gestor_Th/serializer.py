from rest_framework import serializers
from .models import *
from usuarios.serializer import *

class HojaVidaSerializer(serializers.ModelSerializer):
    class Meta:
            model=Hoja_Vida
            fields = [
                "id",
                "personal_medico",
                "gestor_th",
                "fecha_creacion"
            ]
    
    def create(self, validated_data):
        hv = Hoja_Vida.objects.create(**validated_data)
        return hv

class HojaVidaSerializerListar(serializers.ModelSerializer):
    personal_medico = MedicoSerializador(read_only = True)
    class Meta:
        model=Hoja_Vida
        fields = [
                "id",
                "personal_medico",
                "gestor_th",
                "fecha_creacion"
            ]



class ExpLaSerializer(serializers.ModelSerializer):
    fecha_inicio = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y", "%Y-%m-%d"])
    fecha_finalizacion = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y", "%Y-%m-%d"])
    class Meta:
        model = Experiencia_laboral
        fields = [
            "id",
            "nombre_empresa",
            "cargo",
            "fecha_inicio",
            "fecha_finalizacion",
            "tipo_contrato",
            "hoja_vida"
        ]
    def create(self, validated_data):
        exp_la = Experiencia_laboral.objects.create(**validated_data)
        return exp_la
    
class AcademicoSerializer(serializers.ModelSerializer):
    fecha_inicio = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y", "%Y-%m-%d"])
    fecha_culminado = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y", "%Y-%m-%d"])
    class Meta:
        model = Academico
        fields = [
            "id",
            "titulo_obtenido",
            "institucion_educativa",
            "fecha_inicio",
            "fecha_culminado",
            "nivel_educativo",
            "hoja_vida",
        ]
    def create(self, validated_data):
        academico = Academico.objects.create(**validated_data)
        return academico
    
class IpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ips
        fields = [
            "id",
            "nombre",
            "direccion",
            "nivel_categorizacion",
            "telefono",
        ]
    def create(self, validated_data):
        ips = Ips.objects.create(** validated_data)
        return ips

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cups
        fields = [
            "nombre",
            "descripcion",
            "ips",
            "activo",
            "codigo",
        ]
    def create(self, validated_data):
        servicio = Cups.objects.create(**validated_data)
        return servicio

class SolicitudAcHvSerializer(serializers.ModelSerializer):
    fecha_solicitud = serializers.DateField(format="%d/%m/%Y", input_formats=["%d/%m/%Y"])
    class Meta:
        model = SolicitudActualizacionHV
        fields = [
            "personal_medico",
            "fecha_solicitud",
            "descripcion",
            "estado",
        ]
    def create(self, validated_data):
        solicitud = SolicitudActualizacionHV.objects.create(**validated_data)
        return solicitud
    
class CargoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cargo
        fields = [
            "id",
            "ips",
            "nombre",
            "descripcion",
            "estado",
            "fecha_creacion",
        ]
    def create(self, validated_data):
        cargo = Cargo.objects.create(**validated_data)
        return cargo
        
