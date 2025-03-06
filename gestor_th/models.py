from django.db import models
from usuarios.models import Usuario
from usuarios.models import *

# Create your models here.

class Experiencia_laboral(models.Model):

    nombre_empresa=models.CharField(max_length=100,null=False, verbose_name='Nombre de la Empresa')
    cargo=models.CharField(max_length=100, null=False, verbose_name='Cargo')
    fecha_inicio=models.DateField(auto_now_add=False,auto_now=False, verbose_name='Fecha de Inicio')
    fecha_finalizacion=models.DateField(auto_now_add=False,auto_now=False, verbose_name='Fecha de Finalizacion')
    # T_CONTRATO_CHOICES=[
    #     ("Contrato a término indefinido"),
    #     ("Contrato a término fijo"),
    #     ("Contrato por obra o labor"),
    #     ("Contrato ocasional, accidental o transitorio"),
    #     ("Contrato de aprendizaje"),
    #     ("Contrato de prestación de servicios"),
    #     ("Contrato sindical ")
    # ]
    # tipo_contrato=models.CharField(max_length=100, choices=T_CONTRATO_CHOICES,null=False,verbose_name="Tipo de contrato")
    # certificado=models.FieldFile(upload_to='ruta del documento')


class Academico(models.Model):
    titulo_obtenido=models.CharField(max_length=100,null=False, verbose_name='Título Obtenido')
    institucion_educativa=models.CharField(max_length=100, null=False, verbose_name='Institución Educativa' )
    fecha_inicio=models.DateField(auto_now=False,auto_now_add=False, verbose_name='Fecha de Inicio')
    fecha_culminado=models.DateField(auto_now_add=False,auto_now=False, verbose_name='Fecha de Culminado')
    # nivel_educativo_choices=[
    #     ('Tecnico laboral en salud'),
    #     ('Auxiliar de enfermeria'),
    #     ('Auxiliar en salud oral'),
    #     ('Auxiliar en servicios farmaceuticos'),
    #     ('Auxiliar en atencion Prehospitalaria'),
    #     ('Tecnologo en salud'),
    #     ('Tecnologia en regencia de farmacia'),
    #     ('Tecnologia en atenciaon prehospitalaria'),
    #     ('Tecnologo en laboratorio clinico'),
    #     ('medicina'),
    #     ('enfermeria'),
    #     ('odontologia'),
    #     ('Fisioterapia'),
    #     ('Terapia ocupacional'),
    #     ('Bacteriologia y laboratorio clinico'),

    # ]
    # nivel_educativo=models.CharField(max_length=1,choices=nivel_educativo_choices, verbose_name='Nivel Educativo')
    # certificado=models.FieldFile(upload_to='ruta del documento')

class Hoja_Vida(models.Model):
    personal_medico=models.ForeignKey(Medico,on_delete=models.CASCADE)
    gestor_th=models.ForeignKey(Gestor_TH,on_delete=models.CASCADE)
    experiencia=models.ForeignKey(Experiencia_laboral,on_delete=models.CASCADE)
    academico=models.ForeignKey(Academico,on_delete=models.CASCADE)
    fecha_creacion=models.DateField(auto_now_add=True, verbose_name='Fecha de Creación')