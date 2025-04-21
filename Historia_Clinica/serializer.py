from django.utils import timezone
from rest_framework import serializers
from django.shortcuts import get_object_or_404
#

from usuarios.serializer import PacienteSerializador
from usuarios.models import Medico, Paciente
from Gestor_Th.models import Cups 
from .models import *




class PacienteSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = Paciente
        fields = [
            'id',
            'nombre_completo',
            'grupo_sanguineo',
            'estrato',
            'regimen'
        ]

    def get_nombre_completo(self, obj):
        return f"{obj.usuario.first_name} {obj.usuario.last_name}".strip()


class MedicoSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = Medico
        fields = [
            'id',
            'nombre_completo',
            'especialidad'
        ]

    def get_nombre_completo(self, obj):
        return f"{obj.usuario.first_name} {obj.usuario.last_name}".strip() # El .strip() al final elimina espacios en caso de que last_name esté vacío    


class CupsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cups
        fields='__all__'


class AnamnesisSerializer(serializers.ModelSerializer):
    inicio_sintomas = serializers.DateField(
        format="%d/%m/%Y",  # Formato de salida
        input_formats=["%d/%m/%Y", "%Y-%m-%d"]  # Formatos de entrada permitidos
    )

    class Meta:
        model = Anamnesis
        fields = [
            'id',
            'motivo_consulta',
            'inicio_sintomas',
            'sintomas',
            'alergias',
            'enfermedades_base',
            'habitos',
            'examen_fisico'
        ]
#  esta funcion nos ayuda a validar que la fecha de inicio de los sintomas no sea mayor a la fecha de atencion
    def validate_inicio_sintomas(self, value):
        if value > timezone.now().date():
            raise serializers.ValidationError("La fecha de inicio de síntomas no puede ser en el futuro.")
        return value




class Cie10Serializer(serializers.ModelSerializer):

    class Meta:
        model = Cie10
        fields = [
            'id',
            'codigo_cie10',
            'nombre_cie10',
            'descripcion_cie10'
        ]

# class DiagnosticoSerializer(serializers.ModelSerializer):
    # cie10 = serializers.SlugRelatedField(
    #     queryset=Cie10.objects.all(),  
    #     slug_field='codigo_cie10'  # con esto puedo enviar el codigo del Cie 10 y Django lo asociara desde la BD
    # )
    # fecha_diagnostico = serializers.DateField(
    #     format="%d/%m/%Y",  # Formato de salida
    #     input_formats=["%d/%m/%Y", "%Y-%m-%d"]  # Formatos de entrada permitidos
    # )

    # class Meta:
    #     model = Diagnostico
    #     fields = [
    #         'cie10',
    #         'tipo_diagnostico',
    #         'fecha_diagnostico', 
    #         'observaciones'
    #     ]
    # def create(self, validated_data):
    #     return Diagnostico.objects.create(**validated_data)

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     if isinstance(data['cie10'], str):
    #         try:
    #             cie10_instance = Cie10.objects.get(codigo_cie10=data['cie10'])
    #             data['cie10'] = cie10_instance.codigo_cie10  # Asegurar que sea correcto
    #         except Cie10.DoesNotExist:
    #             data['cie10'] = None  # Si el código no existe, evitar el error
    #     return data

class DiagnosticoSerializer(serializers.ModelSerializer):
    cie10_detalle = Cie10Serializer(source='cie10', read_only=True) # asi puedo ver los detalles del cie10 en diagnostico
    cie10 = serializers.SlugRelatedField(
        queryset=Cie10.objects.all(),
        slug_field='codigo_cie10'  # de igual forma puedo seleccionar solo el codigo del cie-10 
    )
    fecha_diagnostico = serializers.DateField(input_formats=["%d/%m/%Y", "%Y-%m-%d"])

    class Meta:
        model = Diagnostico
        fields = [
            'id',
            'cie10_detalle',
            'cie10',
            'tipo_diagnostico', 
            'fecha_diagnostico',
            'observaciones'
            ]


    # def create(self, validated_data):

    #     codigo_cie10 = validated_data.pop('codigo_cie10')  # Extraer el código CIE10
    #     cie10_obj = get_object_or_404(Cie10, codigo_cie10=codigo_cie10)  # Buscar en la base de datos

    #     # Crear el Diagnóstico con el objeto Cie10 asociado
    #     diagnostico = Diagnostico.objects.create(cie10=cie10_obj, **validated_data)
    #     return diagnostico


    # cie10 = serializers.SlugRelatedField(
    #     queryset=Cie10.objects.all(),
    #     slug_field='codigo_cie10'  # Se usará el código en lugar del ID
    # )
    # fecha_diagnostico = serializers.DateField(
    #     format="%d/%m/%Y",  # Formato de salida
    #     input_formats=["%d/%m/%Y", "%Y-%m-%d"]  # Formatos de entrada permitidos
    # )
    # class Meta:
    #     model = Diagnostico
    #     fields = [
    #         'cie10',
    #         'tipo_diagnostico',
    #         'fecha_diagnostico',
    #         'observaciones'
    #     ]

    # def create(self, validated_data):
    #     cie10_codigo = validated_data.pop("cie10")  # Recibes el código CIE-10
    #     print("Código recibido en create:", cie10_codigo, "Tipo:", type(cie10_codigo))  # Depuración

    #     # Verifica si llega como string o instancia
    #     if isinstance(cie10_codigo, str):
    #         cie10_instance = Cie10.objects.filter(codigo_cie10=cie10_codigo).first()
    #         if not cie10_instance:
    #             raise serializers.ValidationError({"cie10": "Código CIE10 no encontrado en la base de datos."})
    #     elif isinstance(cie10_codigo, Cie10):
    #         cie10_instance = cie10_codigo
    #     else:
    #         raise serializers.ValidationError({"cie10": f"Tipo inesperado: {type(cie10_codigo)}"})

    #     validated_data["cie10"] = cie10_instance  # Guarda la instancia en lugar del string
    #     return Diagnostico.objects.create(**validated_data)

    # def to_representation(self, instance):

    #     data = super().to_representation(instance)

    #     print("Tipo de instance.cie10:", type(instance.cie10))  # Depuración
    #     if isinstance(instance.cie10, Cie10):
    #         data['cie10'] = instance.cie10.codigo_cie10  # Devolver solo el código
    #     elif isinstance(instance.cie10, str):
    #         print("ERROR: cie10 sigue siendo un string en to_representation:", instance.cie10)

    #     return data



    # def to_representation(self, instance):
    #     """
    #     Asegura que al serializar, cie10 se devuelva como código y no como una instancia del modelo.
    #     """
    #     data = super().to_representation(instance)
    #     if isinstance(instance.cie10, Cie10):  
    #         data['cie10'] = instance.cie10.codigo_cie10  # Convertimos la instancia a su código
    #     return data



            



    
    # Buscar si ya existe un diagnóstico igual
        # diagnostico, created = Diagnostico.objects.get_or_create(
        #     cie10=cie10_instance,
        #     tipo_diagnostico=validated_data["tipo_diagnostico"],
        #     fecha_diagnostico=validated_data["fecha_diagnostico"],
        #     observaciones=validated_data.get("observaciones", "")
        # )
        # return diagnostico


        # Aquí cie10 ya es una instancia de Cie10 gracias a SlugRelatedField


class AntecedentesMedicosSerializer(serializers.ModelSerializer):
    cie10_detalle = Cie10Serializer(source='cie10', read_only=True)
    cie10 = serializers.SlugRelatedField(
        queryset=Cie10.objects.all(),
        slug_field='codigo_cie10'  # de igual forma puedo seleccionar solo el codigo del cie-10 
    )

    class Meta:
        model = AntecedentesMedicos
        fields = [
            'id',
            'cie10_detalle',
            'cie10',
            'tipo_diagnostico',
            'descripcion'
        ]


class SignosVitalesSerializer(serializers.ModelSerializer):

    class Meta:
        model = SignosVitales
        fields = [
            'id',
            'frecuencia_cardiaca',
            'presion_arterial',
            'frecuencia_respiratoria',
            'temperatura_corporal',
            'saturacion',
            'peso',
            'talla',
            'imc'
        ]
class ParaclinicosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paraclinicos
        fields = [
            'id',
            'resultados',
            'analisis'
        ]

class OrdenDeProcedimientosSerializer(serializers.ModelSerializer):
    cups_detalle = CupsSerializer(source='cups', read_only=True) # para ver los detalles del cups en la orden
    cups = serializers.SlugRelatedField(
        queryset=Cups.objects.all(), 
        slug_field='codigo'  # esto me permite usar el codigo del cups en ves de ID
    )
    class Meta:
        model = OrdenDeProcedimientos
        fields = [
            'id',
            'codigo',
            'cups',
            'cups_detalle',
            'descripcion',
            'cantidad',
            'estado',
            'observacion',
        ]



    def create(self, validated_data):
        # `cups` ya es una instancia aquí gracias a SlugRelatedField, no es necesario hacer un get()
        cups_instance = validated_data.pop('cups')  

        # Crear la orden con la instancia de CUPS
        orden_procedimientos = OrdenDeProcedimientos.objects.create(cups=cups_instance, **validated_data)

        return orden_procedimientos



class MedicamentoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medicamento
        fields = [
            'id',
            'nombre_medicamento',
            'concentracion',
            'forma_farmaceutica',
            'dosis',
            'via_administracion',
            'frecuencia',
            'tiempo_tratamiento',
            'cantidad',
            'cantidad_letras',
            'posologia',
            'recomendaciones'
        ]




class FormulaMedicaSerializer(serializers.ModelSerializer):
    medico_detalle = MedicoSerializer(source='medico', read_only=True)
    medicamento = MedicamentoSerializer() 
    diagnostico = DiagnosticoSerializer()
    fecha_prescripcion = serializers.DateTimeField(
        read_only=True,  #  el campo de la fecha no es requerido en la entrada
        format="%d/%m/%Y %I:%M:%S %p" ,
        input_formats=["%d/%m/%Y", "%Y-%m-%d"] # Se formatea la fecha y la hora correctamente en la salida
    )
    
    class Meta:
        model = FormulaMedica
        fields = [
            'id',
            'medicamento',
            'medico',
            'medico_detalle',
            'diagnostico',
            'fecha_prescripcion'
        ]



class EvolucionSerializer(serializers.ModelSerializer):
    diagnostico = DiagnosticoSerializer()
    medico = serializers.PrimaryKeyRelatedField(queryset=Medico.objects.all())
    fecha_actual = serializers.DateField(read_only=True,
    format="%d/%m/%Y",
    input_formats=["%d/%m/%Y", "%Y-%m-%d"]
    )

    class Meta:
        model = Evolucion
        fields = [
            'id',
            'medico',
            'fecha_actual',
            'diagnostico',
            'plan_de_manejo',
            'evolucion',
            'recomendaciones',
            'interconsultas',
            'plan_de_seguimiento'
        ]




class HistoriaClinicaSerializer(serializers.ModelSerializer):
    paciente = serializers.PrimaryKeyRelatedField(queryset=Paciente.objects.all())
    paciente_detalle = PacienteSerializer(source='paciente', read_only=True) # para ver los detalles del paciente
    anamnesis = AnamnesisSerializer()
    diagnostico = DiagnosticoSerializer()
    antecedentes_medicos = AntecedentesMedicosSerializer()
    signos_vitales = SignosVitalesSerializer()
    paraclinicos = ParaclinicosSerializer()
    orden_de_procedimientos = OrdenDeProcedimientosSerializer(required=False, allow_null=True)
    formula_medica = FormulaMedicaSerializer(required=False, allow_null=True)
    evolucion = EvolucionSerializer()
    medico = serializers.PrimaryKeyRelatedField(queryset=Medico.objects.all())
    medico_detalle = MedicoSerializer(source='medico', read_only=True)


    class Meta:
        model = HistoriaClinica
        fields = [
            'id',
            'paciente',
            'paciente_detalle',
            'anamnesis',
            'diagnostico',
            'antecedentes_medicos', 
            'signos_vitales',
            'paraclinicos', 
            'orden_de_procedimientos', 
            'formula_medica', 
            'evolucion', 
            'medico',
            'medico_detalle'
        ]
    def create(self, validated_data):
        import json
        print("📌 JSON Recibido en HistoriaClinicaSerializer:", json.dumps(validated_data, indent=4, default=str))

    def create(self, validated_data):

        import json
        print("📌 JSON Recibido en HistoriaClinicaSerializer:", json.dumps(validated_data, indent=4, default=str))
        print("Ejecutando create()...")

        # Extraer y crear instancias de los submodelos
        anamnesis_data = validated_data.pop('anamnesis', None)
        diagnostico_data = validated_data.pop('diagnostico', None)
        signos_vitales_data = validated_data.pop('signos_vitales', None)
        paraclinicos_data = validated_data.pop('paraclinicos', None)
        antecedentes_medicos_data = validated_data.pop('antecedentes_medicos', None)
        orden_procedimientos_data = validated_data.pop('orden_de_procedimientos', None)
        formula_medica_data = validated_data.pop('formula_medica', None)
        evolucion_data = validated_data.pop('evolucion', None)

        # Creación de objetos solo si existen datos
        anamnesis = Anamnesis.objects.create(**anamnesis_data) if anamnesis_data else None
        diagnostico = Diagnostico.objects.create(**diagnostico_data) if diagnostico_data else None
        signos_vitales = SignosVitales.objects.create(**signos_vitales_data) if signos_vitales_data else None
        paraclinicos = Paraclinicos.objects.create(**paraclinicos_data) if paraclinicos_data else None
        antecedentes_medicos = AntecedentesMedicos.objects.create(**antecedentes_medicos_data) if antecedentes_medicos_data else None

        # Orden de procedimientos: Usar el objeto existente en lugar de crear uno nuevo
        orden_procedimientos = None
        if orden_procedimientos_data:
            cups_instance = orden_procedimientos_data.pop('cups', None)  # Ya es una instancia, no necesitas buscarlo
            if cups_instance:
                orden_procedimientos = OrdenDeProcedimientos.objects.create(cups=cups_instance, **orden_procedimientos_data)

        # Creación de la fórmula médica
        formula_medica = None
        if formula_medica_data:
            medicamento_data = formula_medica_data.pop('medicamento', None)
            diagnostico_data_formula = formula_medica_data.pop('diagnostico', None)

            medicamento = Medicamento.objects.create(**medicamento_data) if medicamento_data else None
            diagnostico_formula = Diagnostico.objects.create(**diagnostico_data_formula) if diagnostico_data_formula else None

            if medicamento and diagnostico_formula:
                formula_medica = FormulaMedica.objects.create(
                    medicamento=medicamento,
                    diagnostico=diagnostico_formula,
                    **formula_medica_data
                )

        # Creación de la evolución
        evolucion = None
        if evolucion_data:
            diagnostico_evolucion_data = evolucion_data.pop("diagnostico", None)

            if isinstance(diagnostico_evolucion_data, str):
                diagnostico_evolucion = Diagnostico.objects.get(cie10__codigo_cie10=diagnostico_evolucion_data)
            elif isinstance(diagnostico_evolucion_data, dict):
                diagnostico_evolucion = Diagnostico.objects.create(**diagnostico_evolucion_data)
            else:
                diagnostico_evolucion = diagnostico_evolucion_data  # Ya es una instancia

            evolucion = Evolucion.objects.create(diagnostico=diagnostico_evolucion, **evolucion_data)

        # Obtener paciente y médico
        paciente = validated_data.get("paciente")
        medico = validated_data.get("medico")

        if not paciente or not medico:
            raise serializers.ValidationError("Paciente y médico son obligatorios.")

        # Crear la historia clínica
        historia_clinica = HistoriaClinica.objects.create(
            paciente=paciente,
            anamnesis=anamnesis,
            diagnostico=diagnostico,
            antecedentes_medicos=antecedentes_medicos,
            signos_vitales=signos_vitales,
            paraclinicos=paraclinicos,
            orden_de_procedimientos=orden_procedimientos,
            formula_medica=formula_medica,
            evolucion=evolucion,
            medico=medico
        )

        return historia_clinica



#  ¿Qué es extra_kwargs?
# Es un diccionario especial dentro de Meta en un serializer que te permite personalizar el comportamiento de ciertos campos sin necesidad de declararlos explícitamente como atributos de la clase.

# Se usa para:
# ✔ Hacer que un campo sea de solo lectura (read_only=True)
# ✔ Hacer que un campo sea obligatorio o no (required=True / required=False)
# ✔ Cambiar validaciones o mensajes de error
# ✔ Configurar campos write_only (se envían pero no se devuelven en la respuesta)

