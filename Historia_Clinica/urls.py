
from rest_framework import routers
from . import views

#
from django.contrib import admin
from django.urls import path
# from usuarios.views import *


app_name = 'historia_clinica_app'


router = routers.DefaultRouter()  # nos ayuda a contruir una especie de url segun los estandares de viewsets, internamente contruye las urls en el formato que conocemos

router.register(r'cups', views.CupsViewSet, basename='')
router.register(r'anamnesis', views.AnamnesisViewset, basename='anamnesis')
router.register(r'cie10', views.Cie10Viewset, basename='cie10')
router.register(r'diagnostico', views.DiagnosticoViewset, basename='diagnostico')
router.register(r'antecedentesmedicos', views.AntecedentesMedicosViewset, basename='antecedentes')
router.register(r'signosvitales', views.SignosVitalesViewset, basename='signos_vitales')
router.register(r'paraclinicos', views.ParaclinicosViewset, basename='paraclinicos')
router.register(r'ordendeprocedimientos', views.OrdenDeProcedimientosViewset, basename='orden_procedimiento')
router.register(r'medicamento', views.MedicamentoViewset, basename='medicamento')
router.register(r'formulamedica', views.FormulaMedicaViewset, basename='formula_medica')
router.register(r'evolucion', views.EvolucionViewset, basename='evolucion')
router.register(r'historiaclinica', views.HistoriaClinicaViewset, basename='historia')




urlpatterns = router.urls
