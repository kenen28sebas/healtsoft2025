from django.contrib import admin
from django.urls import path
from usuarios.views import *
from django.contrib import admin
from django.urls import path,include
from usuarios import views
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

# router.register(r'ips',views.Ipsvista,'ips'),
router.register(r'cita',CitaPacienteViewSet,'cita'),
router.register(r'citaaux' , CitaAuxViewSet,'citaaux')
# router.register(r'servicio',views.Serviciovista,'servicio'),
# router.register(r'hoja/vida',views.Hojavista,'hoja/vida'),
# router.register(r'academico',views.Academicosvista,'academico'),
# router.register(r'experiencia',views.Experienciavista,'experiencia'),



# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
#     path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
#     path('registrar' , registrar),
#     path('login', login),
#     path('perfil' , perfil),
#     # path('solicitud/',solicitud_actualizacion_hv,name='solicitud'),
#     # path('gestion/<int:solicitud_id>/', gestion_solicitud, name='gestion_solicitud'),
#     path('getMedico' , getMedicos ),
#     path('getCups' , getCups),
#     path('getPaciente/<str:nro_doc>/' , getPaciente)
# ]


urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('registrar' , registrar),
    path('api/',include(router.urls)),
    path('login', login),
    path('perfil' , perfil),
    # path('solicitud/',solicitud_actualizacion_hv,name='solicitud'),
    # path('gestion/<int:solicitud_id>/', gestion_solicitud, name='gestion_solicitud'),
    path('getMedico' , getMedicos ),
    path('getCups' , getCups),
    path('getPaciente/<str:nro_doc>/' , getPaciente),
    path('veriP/<str:nro_doc>/' , verificarDocumentoExistente),
    path('', include('Historia_Clinica.urls')),
    path('hoja/vida',crear_hv,name='hoja_vida'),
    path('consultar/hoja/vida',consultar_hv,name='consultar_hv'),
    path('eliminar/hoja/vida/<int:id>/',eliminar_hv,name='eliminar_hoja_vida'),
    path ('listar/hv',consultar_todas_hv),
    path('academico/',crear_academicos,name='academico'),
    path('academico/eliminar/<int:id>/',eliminar_academico,name='eliminar_academico'),
    path('actualizar/academico/<int:id>/',actualizar_academico,name='actualizar_academico'),
    path('consultar/academicos/<str:nro_doc>/',consultar_academicos,name='actualizar_academico'),
    path('experiencia/',crear_experiencia,name='experiencia'),
    path('experiencia/actualizar/<int:id>/',actualizar_experiencia,name='actualizar_experiencia'),
    path('experiencia/eliminar/<int:id>/',eliminar_experiencia,name='eliminar_experiencia'),
    path('consultar/experiencias/<str:nro_doc>/',consultar_experiencias,name='consultar_experiencias'),
    path('ips/',crear_ips,name='ips'),
    path('ips/actualizar/<int:id>/',actualizar_ips,name='actualizar_ips'),
    path('eliminar/ips/<int:id>/',eliminar_ips,name='eliminar_ips'),
    path('actualizar/servicios/<str:codigo>/',actualizar_servicio,name='servicio'),
    path('eliminar/servicio/<str:codigo>/',eliminar_servicio,name='eliminar'),
    path('consultar/servicio',consultar_servicio,name='consultar_servicio'),
    path('crear/cargo',crear_cargo,name='crear_cargo'),
    path('consultar/cargos',consultar_cargos,name='consultar_cargos'),
    path('consultar/cargos/<int:id>/',consultar_cargos_filter,name='consultar_cargos'),
    path('actualizar/cargos/<int:cargo_id>/',actualizar_cargo,name='actualizar_cargo'),
    path('eliminar/cargo/<int:id>/',eliminar_cargo,name='eliminar_cargo'),
    path('listar/hv/',listar_hv,name='listar_hv'),
    path('crear/solicitud',crear_solicitud,name='crear_solicitud'),
    path('consultar/ips/',consultar_ips , name='consultar_ips'),
    path ('gestionar/personal/<str:nro_doc>/', gestionar_personal, name='gestionar_personal'),
    path ('actualizar/hv/<str:nro_doc>/' , actualizar_hv , name='actualizar_hv'),
    path('crear/servicio/' , crear_servicio , name='crear_servicio'),
    path('eliminar/Usuario/<str:nro_doc>/' , eliminar_usuario , name='eliminar_medico'),
    path('actualizar/medico/<str:nro_doc>/',actualizar_usuario , name='actualizar_usuario'),
]

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('registrar' , registrar),
#     path('login', login),
#     path('perfil' , perfil),
#     path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
#     path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
#     #estas rutas son de el modulo de gestion de talento humano hechas por linita la mas bonita
#     path('hoja/vida',crear_hv,name='hoja_vida'),
#     path('consultar/hoja/vida',consultar_hv,name='consultar_hv'),
#     path('eliminar/hoja/vida/<int:id>/',eliminar_hv,name='eliminar_hoja_vida'),
#     path ('listar/hv',consultar_todas_hv),
#     path('academico/',crear_academicos,name='academico'),
#     path('academico/eliminar/<int:id>/',eliminar_academico,name='eliminar_academico'),
#     path('actualizar/academico/<int:id>/',actualizar_academico,name='actualizar_academico'),
#     path('consultar/academicos/<str:nro_doc>/',consultar_academicos,name='actualizar_academico'),
#     path('experiencia/',crear_experiencia,name='experiencia'),
#     path('experiencia/actualizar/<int:id>/',actualizar_experiencia,name='actualizar_experiencia'),
#     path('experiencia/eliminar/<int:id>/',eliminar_experiencia,name='eliminar_experiencia'),
#     path('consultar/experiencias/<str:nro_doc>/',consultar_experiencias,name='consultar_experiencias'),
#     path('ips/',crear_ips,name='ips'),
#     path('ips/actualizar/<int:id>/',actualizar_ips,name='actualizar_ips'),
#     path('eliminar/ips/<int:id>/',eliminar_ips,name='eliminar_ips'),
#     path('actualizar/servicios/<str:codigo>/',actualizar_servicio,name='servicio'),
#     path('eliminar/servicio/<str:codigo>/',eliminar_servicio,name='eliminar'),
#     path('consultar/servicio',consultar_servicio,name='consultar_servicio'),
#     path('crear/cargo',crear_cargo,name='crear_cargo'),
#     path('consultar/cargos',consultar_cargos,name='consultar_cargos'),
#     path('consultar/cargos/<int:id>/',consultar_cargos_filter,name='consultar_cargos'),
#     path('actualizar/cargos/<int:cargo_id>/',actualizar_cargo,name='actualizar_cargo'),
#     path('eliminar/cargo/<int:id>/',eliminar_cargo,name='eliminar_cargo'),
#     path('listar/hv/',listar_hv,name='listar_hv'),
#     path('crear/solicitud',crear_solicitud,name='crear_solicitud'),
#     path('consultar/ips/',consultar_ips , name='consultar_ips'),
#     path ('gestionar/personal/<str:nro_doc>/', gestionar_personal, name='gestionar_personal'),
#     path ('actualizar/hv/<str:nro_doc>/' , actualizar_hv , name='actualizar_hv'),
#     path('crear/servicio/' , crear_servicio , name='crear_servicio'),
#     path('eliminar/Usuario/<str:nro_doc>/' , eliminar_usuario , name='eliminar_medico'),
#     path('actualizar/medico/<str:nro_doc>/',actualizar_usuario , name='actualizar_usuario'),


