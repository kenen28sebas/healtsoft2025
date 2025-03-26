from django.db import models
from usuarios.models import Paciente,Medico,Aux_adm
from Gestor_Th.models import Cups

# Create your models here.

class Cita(models.Model):
    fecha_de_solicitud = models.DateTimeField(auto_now_add=True)
    fecha_de_asignacion = models.DateTimeField()
    choises_priridad = [
        ("Prta", "Prioritaria"),
        ("no", "noacoradrme")
    ]
    prioridad = models.CharField(max_length=20, choices=choises_priridad)
    cups = models.ForeignKey(Cups, on_delete=models.CASCADE)
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    medico = models.ForeignKey(Medico, on_delete=models.CASCADE)
    choises_estado = [
        ("pendiente", "Pendiente"),
        ("confirmada", "Confirmada"),
        ("cancelada", "Cancelada")
    ]
    estado = models.CharField(max_length=20, choices=choises_estado)
