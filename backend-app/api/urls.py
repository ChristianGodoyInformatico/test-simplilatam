from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome),
    path('empresas/', views.EmpresaListCreate.as_view(), name='empresa-list-create'),
    path('empresas/<int:pk>/', views.EmpresaRetrieveUpdateDestroy.as_view(), name='empresa-detail'),
    path('empleados/', views.EmpleadoListCreate.as_view(), name='empleado-list-create'),
    path('empleados/<int:pk>/', views.EmpleadoRetrieveUpdateDestroy.as_view(), name='empleado-detail'),
    path('empresas/<int:empresa_id>/empleados/', views.EmpleadosPorEmpresaView.as_view(), name='empleados-por-empresa'),
]
