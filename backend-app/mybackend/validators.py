from django.core.exceptions import ValidationError
from rut_chile import rut_chile
import re

def validate_rut(rut):
     # Remover puntos y guiones para la validación
    rut = rut.upper().replace("-", "").replace(".", "")
    
    # Verificar que el RUT contenga solo números y una letra (para el dígito verificador)
    if not re.match(r'^\d{7,8}[0-9K]$', rut):
        raise ValidationError("Formato de RUT inválido. Debe ser de la forma XXXXXXXX-X.")
    
    # Validar usando la librería rut_chile
    if not rut_chile.is_valid_rut(rut):
        raise ValidationError("RUT inválido. Por favor, ingrese un RUT válido.")