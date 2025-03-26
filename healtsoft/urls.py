from django.contrib import admin
from django.urls import path
from usuarios.views import *
from django.contrib import admin
from django.urls import path,include
from usuarios.views import *
from Gestor_Th.views import *
from rest_framework import routers
from Gestor_Th import views
from gestor_citas.views import *

router=routers.DefaultRouter()

router.register(r'ips',views.Ipsvista,'ips'),
router.register(r'cita',CitaPacienteViewSet,'cita'),
# router.register(r'servicio',views.Serviciovista,'servicio'),
router.register(r'hoja/vida',views.Hojavista,'hoja/vida'),
router.register(r'academico',views.Academicosvista,'academico'),
router.register(r'experiencia',views.Experienciavista,'experiencia'),



urlpatterns = [
    path('admin/', admin.site.urls),
    path('registrar' , registrar),
    path('api/',include(router.urls)),
    path('login', login),
    path('perfil' , perfil),
    path('solicitud/',solicitud_actualizacion_hv,name='solicitud'),
    path('gestion/<int:solicitud_id>/', gestion_solicitud, name='gestion_solicitud'),
    path('getMedico' , getMedicos )
]





