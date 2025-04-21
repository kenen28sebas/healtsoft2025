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

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="Descripción de tu API",
        terms_of_service="https://www.tuapi.com/terms/",
        contact=openapi.Contact(email="contacto@tuapi.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


router=routers.DefaultRouter()

router.register(r'ips',views.Ipsvista,'ips'),
router.register(r'cita',CitaPacienteViewSet,'cita'),
router.register(r'citaaux' , CitaAuxViewSet,'citaaux')
# router.register(r'servicio',views.Serviciovista,'servicio'),
router.register(r'hoja/vida',views.Hojavista,'hoja/vida'),
router.register(r'academico',views.Academicosvista,'academico'),
router.register(r'experiencia',views.Experienciavista,'experiencia'),



urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('registrar' , registrar),
    path('api/',include(router.urls)),
    path('login', login),
    path('perfil' , perfil),
    path('solicitud/',solicitud_actualizacion_hv,name='solicitud'),
    path('gestion/<int:solicitud_id>/', gestion_solicitud, name='gestion_solicitud'),
    path('getMedico' , getMedicos ),
    path('getCups' , getCups),
    path('getPaciente/<str:nro_doc>/' , getPaciente),
    path('veriP/<str:nro_doc>/' , verificarDocumentoExistente),
    path('', include('Historia_Clinica.urls')),
]





