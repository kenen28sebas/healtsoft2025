from django.db import models
import datetime
from usuarios.models import Usuario, Medico


# Create your models here.
class Paciente(Usuario):
    ocupacion = models.CharField(max_length=100, null=False, blank=False, verbose_name='Ocupacion')
    REG = [
        ('RC', 'Régimen Contributivo'),
        ('RS', 'Régimen Subsidiado'),
        ('RE', 'Régimen Especial'),
        ('PA', 'Particular')
    ]
    regimen = models.CharField(max_length=10, null=False, blank=False, choices=REG )
    # eps = models.ForeignKey()
    ES = [
        ('1', 'Estrato 1'),
        ('2', 'Estrato 2'),
        ('3', 'Estrato 3'),
        ('4', 'Estrato 4'),
        ('5', 'Estrato 5'),
        ('6', 'Estrato 6')
    ]
    estrato = models.CharField(max_length=1, null=False, blank=False, verbose_name='Estrato', choices=ES)
    TIPO_A = [
        ('COT', 'Cotizante'),
        ('BEN', 'Beneficiario'),
        ('ADI', 'Adicional'),
        ('NC', 'No Cotizante')
    ]
    tipo_afiliacion = models.CharField(max_length=3, null=False, blank=False, verbose_name='Tipo de Afiliación', choices=TIPO_A)
    GRUPO_A_E = [
        ('I', 'Indígena'),
        ('N', 'Negro'),
        ('D', 'Desplazado'),
        ('O', 'Otro')
    ]
    grupo_atencion_especial = models.CharField(max_length=1, null=False, blank=False, verbose_name='Grupo de Atención Especial', choices=GRUPO_A_E)
    GRPO_SANG = [
        ('A+', 'A Positivo'),
        ('A-', 'A Negativo'),
        ('B+', 'B Positivo'),
        ('B-', 'B Negativo'),
        ('AB+', 'AB Positivo'),
        ('AB-', 'AB Negativo'),
        ('O+', 'O Positivo'),
        ('O-', 'O Negativo')
    ]
    grupo_sanguineo = models.CharField(max_length=3, null= False, blank= False, verbose_name='RH', choices=GRPO_SANG)


class HistoriaClinica(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    fecha_atencion = models.DateTimeField(default=datetime.date.today, null=False, blank=False, verbose_name='Fecha de Atención')


class Anamnesis(models.Model):
    historia = models.OneToOneField(HistoriaClinica, on_delete=models.CASCADE)
    motivo_consulta = models.TextField(null=False, blank=False, verbose_name='Motivo de la Consulta')
    inicio_sintomas = models.DateField(auto_created=False, auto_now=False, null=False, blank=False, verbose_name='Inicio de los Sintomas')
    sintomas = models.TextField(null=False, blank=False, verbose_name='Sintomas')
    alergias = models.CharField(max_length=50, null=False, blank=False, verbose_name='Alergias')
    enfermedades_base = models.CharField(max_length=100, null=False, blank=False, verbose_name='Enfermedades de Base')
    SUSTANCIAS = [
        'Tabaco', 'Tabaco',
        'Alcohol', 'Alcohol',
        'Drogas', 'Drogas',
    ]
    habitos = models.CharField(max_length=10, null=False, blank=False, verbose_name='Consumo de sustancias', choices=SUSTANCIAS)

class ExameFisico(models.Model):
    anamnesis = models.OneToOneField(Anamnesis, on_delete=models.CASCADE)
    descripcion = models.TextField(null=False, blank=False, verbose_name='Examen físico')


class AntecedentesMedicos(models.Model):
    anamnesis = models.ForeignKey(Anamnesis, on_delete=models.CASCADE)
    # codigo_cie10 = models.ForeignKey()
    # diagnostico = models.CharField()
    descripcion = models.TextField(null=False, blank=False, verbose_name='Descripcion del Diagnostico')
    TIPO_DIA = [
        'Principal', 'Diagnóstico Principal',
        'Secundarios', 'Diagnósticos Secundarios',
        'Diferencial', 'Diagnóstico Diferencial',
        'Confirmado', 'Diagnóstico Confirmado',
        'Enfermedad Aguda', 'Diagnóstico de Enfermedad Aguda',
        'Rehabilitacion', 'Diagnóstico de Rehabilitación',
        'Salud Mental', 'Diagnóstico de Salud Mental',
        'Preventivo', 'Diagnóstico Preventivo',
        'Riesgo', 'Diagnóstico de Riesgo',
        'Sindrome', 'Diagnóstico de Síndrome',
        
    ]

    tipo_diagnostico = models.CharField(max_length=20, null=False, blank=False, verbose_name='Tipo de Diagnóstico', choices=TIPO_DIA )
    
class OrdenDeProcedimientos(models.Model):
    codigo = models.CharField(max_length=10, null=False, blank=False, verbose_name='Código del procedimiento')
    cups = models.CharField(max_length=10, null=False)
    descripcion = models.TextField()
    cantidad = models.CharField(max_length=10, null=False, blank=False, verbose_name='Cantidad')
    estado = models.CharField(max_length=20, null=False, blank=False, verbose_name='Estado')
    observacion = models.CharField(max_length=100, null=False, blank=False, verbose_name='Observación')
    anamnesis = models.ForeignKey(Anamnesis, on_delete=models.CASCADE)



