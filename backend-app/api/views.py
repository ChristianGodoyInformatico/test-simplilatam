
# Create your views here.
from django.http import HttpResponse
from rest_framework import generics
from .models import Empresa, Empleado
from .serializers import EmpresaSerializer, EmpleadoSerializer

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

def welcome(request):
    return HttpResponse("<h1>Welcome to my API Rest</h1>")

class EmpresaListCreate(generics.ListCreateAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class EmpleadoListCreate(generics.ListCreateAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class EmpresaRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class EmpleadoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class EmpleadosPorEmpresaView(APIView):
    def get(self, request, empresa_id):
        try:
            empresa = Empresa.objects.get(id=empresa_id)
        except Empresa.DoesNotExist:
            return Response({"error": "Empresa no encontrada"}, status=status.HTTP_404_NOT_FOUND)

        empleados = Empleado.objects.filter(empresa=empresa)
        serializer = EmpleadoSerializer(empleados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)