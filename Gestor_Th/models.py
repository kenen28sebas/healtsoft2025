from django.db import models

# Create your models here.
from django.db import models
from usuarios.models import Usuario
from usuarios.models import *




class Hoja_Vida(models.Model):
    personal_medico=models.ForeignKey(Medico,on_delete=models.CASCADE)
    gestor_th=models.ForeignKey(Gestor_TH,on_delete=models.CASCADE)
    fecha_creacion=models.DateField(auto_now_add=True, verbose_name='Fecha de Creación')


class Experiencia_laboral(models.Model):
    nombre_empresa=models.CharField(max_length=100,null=False, verbose_name='Nombre de la Empresa')
    cargo=models.CharField(max_length=100, null=False, verbose_name='Cargo')
    fecha_inicio=models.DateField(auto_now_add=False,auto_now=False, verbose_name='Fecha de Inicio')
    fecha_finalizacion=models.DateField(auto_now_add=False,auto_now=False, verbose_name='Fecha de Finalizacion')
    T_CONTRATO_CHOICES=[
        ("1","Contrato a término indefinido"),
        ("2","Contrato a término fijo"),
        ("3","Contrato por obra o labor"),
        ("4","Contrato ocasional, accidental o transitorio"),
        ("5","Contrato de aprendizaje"),
        ("6","Contrato de prestación de servicios"),
        ("7","Contrato sindical ")
    ]
    tipo_contrato=models.CharField(max_length=100, choices=T_CONTRATO_CHOICES,null=False,verbose_name="Tipo de contrato")
    hoja_vida=models.ForeignKey(Hoja_Vida,on_delete=models.CASCADE,null=True, blank=True)

class Academico(models.Model):
    titulo_obtenido=models.CharField(max_length=100,null=False, verbose_name='Título Obtenido')
    institucion_educativa=models.CharField(max_length=100, null=False, verbose_name='Institución Educativa' )
    fecha_inicio=models.DateField(auto_now=False,auto_now_add=False, verbose_name='Fecha de Inicio')
    fecha_culminado=models.DateField(auto_now_add=False,auto_now=False, verbose_name='Fecha de Culminado')
    nivel_educativo_choices=[
        ("1",'Tecnico laboral en salud'),
        ("2",'Auxiliar de enfermeria'),
        ("3",'Auxiliar en salud oral'),
        ("4",'Auxiliar en servicios farmaceuticos'),
        ("5",'Auxiliar en atencion Prehospitalaria'),
        ("6",'Tecnologo en salud'),
        ("7",'Tecnologia en regencia de farmacia'),
        ("8",'Tecnologia en atenciaon prehospitalaria'),
        ("9",'Tecnologo en laboratorio clinico'),
        ("10",'medicina'),
        ("11",'enfermeria'),
        ("12",'odontologia'),
        ("13",'Fisioterapia'),
        ("14",'Terapia ocupacional'),
        ("15",'Bacteriologia y laboratorio clinico'),

    ]
    nivel_educativo=models.CharField(max_length=100,choices=nivel_educativo_choices, verbose_name='Nivel Educativo', default='Tecnologo en salud')
    hoja_vida=models.ForeignKey(Hoja_Vida,on_delete=models.CASCADE,null=True, blank=True)

class Ips(models.Model):
    nombre=models.CharField(max_length=100,default="desconocida")
    direccion=models.CharField(max_length=100)
    NIVEL_CATEGORIZACION_CHOICES = [
        ('I', 'Nivel I'),
        ('II', 'Nivel II'),
        ('III', 'Nivel III'),
        ('IV', 'Nivel IV'),
    ]
    nivel_categorizacion=models.CharField(max_length=100, choices=NIVEL_CATEGORIZACION_CHOICES)
    telefono = models.CharField(max_length=20,verbose_name='Telefono')

    def __str__(self):
        return self.nombre

class Cups(models.Model):
    codigo = models.CharField(max_length=10,primary_key=True)
    nombre= models.CharField(max_length=100)
    descripcion=models.TextField()
    ips=models.ForeignKey(Ips,on_delete=models.CASCADE)
    activo=models.BooleanField(default=False)
    def __str__(self):
        return self.Nombre

class SolicitudActualizacionHV(models.Model):
    estado_solicitud=[
        ('pendiente','Pendiente'),
        ('aprobada','Aprobada'),
        ('rechazada','Rechazada'),
    ]
    personal_medico=models.ForeignKey(Medico,on_delete=models.CASCADE)
    fecha_solicitud=models.DateField(auto_now_add=True)
    descripcion=models.TextField()
    estado=models.CharField(max_length=12,choices=estado_solicitud,default='pendiente')

class Cargo(models.Model):
    ips = models.ForeignKey(Ips,on_delete=models.CASCADE)
    nombre = models.CharField(max_length=150,unique=True)
    descripcion = models.TextField(blank=True,null=True)
    estado = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
