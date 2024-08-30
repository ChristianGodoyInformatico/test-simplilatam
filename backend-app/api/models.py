from django.db import models

from mybackend.validators import validate_rut

# Create your models here.
class Empresa(models.Model):
    nombre = models.CharField(max_length=255, blank=False)
    direccion = models.CharField(max_length=255, blank=False)
    rut = models.CharField(max_length=12, unique=True, blank=False, validators=[validate_rut])
    telefono = models.CharField(max_length=20, blank=False)

    def __str__(self):
        return self.nombre

class Empleado(models.Model):
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='empleados')
    nombre_completo = models.CharField(max_length=255, blank=False)
    rut = models.CharField(max_length=12, unique=True, blank=False, validators=[validate_rut])
    email = models.EmailField(unique=True, blank=False)

    def __str__(self):
        return self.nombre_completo