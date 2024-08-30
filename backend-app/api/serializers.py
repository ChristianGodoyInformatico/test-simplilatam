# api/serializers.py

from rest_framework import serializers

from mybackend.validators import validate_rut
from .models import Empresa, Empleado

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    empresa = serializers.PrimaryKeyRelatedField(
        queryset=Empresa.objects.all(),
        error_messages={
            'required': "Debe seleccionar una empresa.",
            'null': "El campo empresa no puede estar vacío.",
            'invalid': "Empresa no válida.",
        }
    )
    rut = serializers.CharField(
        max_length=12,
        validators=[validate_rut],
        error_messages={
            'blank': "El RUT es obligatorio.",
            'null': "El RUT no puede ser nulo.",
            'invalid': "RUT inválido.",
        }
    )
    email = serializers.EmailField(
        error_messages={
            'invalid': "Ingrese un email válido.",
            'blank': "El email es obligatorio.",
        }
    )

    class Meta:
        model = Empleado
        fields = '__all__'

    def validate(self, data):
        validate_rut(data['rut'])  # Validar el RUT
        return data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['empresa'] = EmpresaSerializer(instance.empresa).data
        return representation