from django.db import models

# Create your models here.
from django.db import models
from .manager import *

import datetime
from usuarios.models import Usuario, Medico, Paciente
from Gestor_Th.models import Cups


# Create your models here.
# el CUPS es la Clasificación Única de Procedimientos en Salud
# class Cups(models.Model):
#     codigo_cups = models.CharField(max_length=10, verbose_name='Código del procedimiento')
#     nombre_cups = models.TextField( verbose_name='Nombre del procedimiento')
#     descripcion_cups = models.TextField(verbose_name='Descripcion del procedimiento')

#     def __str__(self):
#         return f"{self.codigo_cups} - {self.nombre_cups}"



class Anamnesis(models.Model):
    motivo_consulta = models.TextField(null=False, blank=False, verbose_name='Motivo de la Consulta')
    inicio_sintomas = models.DateField( verbose_name='Inicio de los Sintomas')
    sintomas = models.TextField(null=False, blank=False, verbose_name='Sintomas')
    alergias = models.CharField(max_length=50, null=False, blank=False, verbose_name='Alergias')
    enfermedades_base = models.CharField(max_length=100, null=False, blank=False, verbose_name='Enfermedades de Base')
    SUSTANCIAS = [
        ('Tabaco', 'Tabaco'),
        ('Alcohol', 'Alcohol'),
        ('Drogas', 'Drogas'),
        ('No', 'No Aplica')
    ]
    habitos = models.CharField(max_length=10, null=False, blank=False, verbose_name='Consumo de sustancias', choices=SUSTANCIAS)
    examen_fisico = models.TextField(verbose_name='Examen Físico')

    def __str__(self):
        return f"Anamnesis de {self.motivo_consulta[:30]}"

# El CIE-10 es la Clasificación Internacional de Enfermedades 
class Cie10(models.Model):
    codigo_cie10 = models.CharField(max_length=15 ,verbose_name='Código dde la enfermedad')
    nombre_cie10 = models.TextField( verbose_name='Nombre de la enfermedad')
    descripcion_cie10 = models.TextField(verbose_name='Descripcion de la enfermedad')

    def __str__(self):
        return f"{self.codigo_cie10} - {self.nombre_cie10}"



class Diagnostico(models.Model):
    cie10 = models.ForeignKey(Cie10, on_delete=models.CASCADE,verbose_name='Cie10')
    TIPO_DIA = [
        ('Principal', 'Diagnóstico Principal'),
        ('Secundarios', 'Diagnósticos Secundarios'),
        ('Diferencial', 'Diagnóstico Diferencial'),
        ('Confirmado', 'Diagnóstico Confirmado'),
        ('Enfermedad Aguda', 'Diagnóstico de Enfermedad Aguda'),
        ('Rehabilitacion', 'Diagnóstico de Rehabilitación'),
        ('Salud Mental', 'Diagnóstico de Salud Mental'),
        ('Preventivo', 'Diagnóstico Preventivo'),
        ('Riesgo', 'Diagnóstico de Riesgo'),
        ('Sindrome', 'Diagnóstico de Síndrome'),
        
    ]

    tipo_diagnostico = models.CharField(max_length=20, null=False, blank=False, verbose_name='Tipo de Diagnóstico', choices=TIPO_DIA )
    fecha_diagnostico = models.DateField()
    observaciones = models.CharField(max_length=200, null=True, blank=True, verbose_name='Observaciones')

    def __str__(self):
        return f"Diagnóstico: {self.cie10.nombre_cie10} ({self.tipo_diagnostico})"




class AntecedentesMedicos(models.Model):
    cie10 = models.ForeignKey(Cie10, on_delete=models.CASCADE, verbose_name='Código de la enfermedad')
    TIPO_DIA = [
        ('Principal', 'Diagnóstico Principal'),
        ('Secundarios', 'Diagnósticos Secundarios'),
        ('Diferencial', 'Diagnóstico Diferencial'),
        ('Confirmado', 'Diagnóstico Confirmado'),
        ('Enfermedad Aguda', 'Diagnóstico de Enfermedad Aguda'),
        ('Rehabilitacion', 'Diagnóstico de Rehabilitación'),
        ('Salud Mental', 'Diagnóstico de Salud Mental'),
        ('Preventivo', 'Diagnóstico Preventivo'),
        ('Riesgo', 'Diagnóstico de Riesgo'),
        ('Sindrome', 'Diagnóstico de Síndrome'),
        
    ]
    tipo_diagnostico = models.CharField(max_length=20, null=False, blank=False, verbose_name='Tipo de Diagnóstico', choices=TIPO_DIA )
    descripcion = models.TextField(null=False, blank=False, verbose_name='Descripcion del Diagnostico')

    def __str__(self):
        return f"Antecedente: {self.cie10.nombre_cie10}"


class SignosVitales(models.Model):
    frecuencia_cardiaca = models.FloatField(null=False, blank=False, verbose_name='Frecuencia Cardiaca')
    presion_arterial = models.FloatField(null=False, blank=False, verbose_name='Presion Arterial')
    frecuencia_respiratoria = models.FloatField(null=False, blank=False, verbose_name='Frecuencia Respiratoria')
    temperatura_corporal = models.FloatField(null=False, blank=False, verbose_name='Temperatura Corporal')
    saturacion = models.CharField(max_length=10, null=False, blank=False, verbose_name='Saturación')
    peso = models.FloatField(null=False, blank=False, verbose_name='Peso')
    talla = models.FloatField(null=False, blank=False, verbose_name='Talla')
    imc = models.FloatField(null=True, blank=True, verbose_name='Indice de masa Corporal')

    def __str__(self):
        return f"Signos Vitales - PA: {self.presion_arterial}, FC: {self.frecuencia_cardiaca}"



class Paraclinicos(models.Model):
    resultados = models.TextField(verbose_name='Resultados de los examenes')
    analisis =  models.TextField(verbose_name='Análisis de los resultados')

    def __str__(self):
        return f"Paraclínicos - Análisis: {self.analisis[:30]}..."



class OrdenDeProcedimientos(models.Model):
    codigo = models.CharField(max_length=10, null=True, blank=True, verbose_name='Código del procedimiento')
    cups = models.ForeignKey(Cups, on_delete=models.CASCADE)
    descripcion = models.TextField(null=True)
    cantidad = models.CharField(max_length=10, null=True, blank=True, verbose_name='Cantidad')
    ESTADO_CHOICES = (
        ('RT', 'Rutinario'),
        ('UR', 'Urgente'),
        ('EM', 'Emergencia'),
        ('PD', 'Pendiente'),
        ('EP', 'En Proceso'),
        ('PG', 'Programado'),
        ('CP', 'Completado'),
        ('RA', 'Requiere Autorizacion'),
        ('NR', 'No Realizado'),
        ('SP', 'Suspendido'),
        ('DR', 'Derivado')

    )
    estado = models.CharField(max_length=2, null=False, blank=False, verbose_name='Estado', choices=ESTADO_CHOICES)
    observacion = models.CharField(max_length=100, null=True, blank=True, verbose_name='Observación')

    def __str__(self):
        return f"Orden: {self.cups.nombre_cups} - Estado: {self.estado}"


class Medicamento(models.Model):
    nombre_medicamento = models.CharField(max_length=100, verbose_name='Nombre del Medicamento' )
    concentracion = models.CharField(max_length=50, verbose_name='Concentracion del Medicamento')
    forma_farmaceutica = models.CharField(max_length=50, verbose_name='Forma Farmaceútica del Medicamento')
    dosis = models.CharField(max_length=50, verbose_name='Dosis')
    VIA_ADMIN_CHOICES = [
        ('VO', 'Vía oral'),
        ('VR', 'Vía rectal'),
        ('VT', 'Vía tópica'),
        ('TD', 'Vía transdérmica '),
        ('VI', 'Vía inhalatoria '),
        ('IV', 'Vía intravenosa'),
        ('IM', 'Vía intramuscular'),
        ('SC', 'Vía subcutánea'),
        ('IO', 'Vía intraósea'),
        ('IT', 'Vía intratecal'),
        ('SL', 'Vía sublingual')
    ]
    via_administracion = models.CharField(max_length=2, choices=VIA_ADMIN_CHOICES, verbose_name='Vía de Administración')
    frecuencia = models.CharField(max_length=20, verbose_name='Frecuencia del Medicamento')
    tiempo_tratamiento = models.CharField(max_length=30, verbose_name='Tiempo del Tratamiento')
    cantidad = models.CharField(max_length=10, verbose_name='Cantidad del Medicamento')
    cantidad_letras = models.CharField(max_length=50, verbose_name='Cantidad en letras')
    posologia = models.CharField(max_length=100, verbose_name='Posología')
    recomendaciones = models.CharField(max_length=100,null=True, blank=True, verbose_name='Recomendaciones')

    def __str__(self):
        return f"Medicamento: {self.nombre_medicamento} - {self.dosis}"

class FormulaMedica(models.Model):
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    diagnostico = models.ForeignKey(Diagnostico, on_delete=models.CASCADE)
    fecha_prescripcion =models.DateTimeField(auto_now_add=True) # Se asigna la fecha/hora actual al crear el objeto


    def __str__(self):
        return f"Fórmula: {self.medicamento.nombre_medicamento} - {self.diagnostico.cie10.codigo_cie10}"



class Evolucion(models.Model):
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    fecha_actual = models.DateField(auto_now_add=True)
    diagnostico = models.ForeignKey(Diagnostico, on_delete=models.CASCADE)
    plan_de_manejo = models.TextField(verbose_name='Plan de Manejo')
    evolucion = models.TextField()
    recomendaciones = models.CharField(max_length=200, verbose_name='Recomendaciones')
    interconsultas = models.CharField(max_length=100, null=True, blank=True, verbose_name='Interconsultas')
    plan_de_seguimiento = models.CharField(max_length=200, null=True, blank=True, verbose_name='Plan de Seguimiento')

    def __str__(self):
        return f"Evolución - {self.medico.usuario.get_full_name} - {self.fecha_actual}"


class HistoriaClinica(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE) 
    anamnesis = models.ForeignKey(Anamnesis, on_delete=models.CASCADE)
    diagnostico = models.ForeignKey(Diagnostico, on_delete=models.CASCADE)
    antecedentes_medicos = models.ForeignKey(AntecedentesMedicos, on_delete=models.CASCADE)
    signos_vitales = models.ForeignKey(SignosVitales, on_delete=models.CASCADE)
    paraclinicos = models.ForeignKey(Paraclinicos, on_delete=models.CASCADE)
    orden_de_procedimientos = models.ForeignKey(OrdenDeProcedimientos, on_delete=models.CASCADE, related_name="historia_clinica")
    formula_medica = models.ForeignKey(FormulaMedica, on_delete=models.CASCADE)
    evolucion = models.ForeignKey(Evolucion, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    Nro_historia = models.CharField(max_length=15, verbose_name='Numero de historia')
    fecha_atencion = models.DateTimeField(auto_now_add=True) # Se asigna la fecha/hora actual al crear el objeto
    Nro_folio = models.PositiveIntegerField(blank=True, null=True)  

    objects = models.Manager() # Agregar el manager por defecto
    historia_manager = HistoriaManager()  # vincula el manager con el modelo
    folio_manager = FolioManager() # vincula el manager que genera el folio automatico


    # lo que se busca con esta funcion es que al registrar una nueva historia, se genere un numero de folio que sera auto incrementable
    def save(self, *args, **kwargs):

    # Asigna Nro_historia con el número de documento del usuario si no está definido
        if not self.Nro_historia:
            self.Nro_historia = self.paciente.usuario.nro_doc  

    
        if not self.Nro_folio:
            # Cuenta cuántas historias tiene ese paciente paciente y añade otra 
            ultimo_folio = HistoriaClinica.objects.filter(paciente=self.paciente).count()
            self.Nro_folio = ultimo_folio + 1  # se incrementa el folio para este paciente

        super().save(*args, **kwargs)

    def __str__(self):
        return f'Historia {self.Nro_historia} - Folio {self.Nro_folio}'


        



    

    

