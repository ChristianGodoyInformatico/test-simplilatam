from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Empresa, Empleado

admin.site.register(Empresa)
admin.site.register(Empleado)