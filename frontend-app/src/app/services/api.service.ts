import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Métodos para manejar Empresas
  getEmpresas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresas/`);
  }

  getEmpresa(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresas/${id}/`);
  }

  createEmpresa(empresa: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/empresas/`, empresa);
  }

  updateEmpresa(id: number, empresa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/empresas/${id}/`, empresa);
  }

  deleteEmpresa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empresas/${id}/`);
  }

  // Métodos para manejar Empleados
  getEmpleados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/empleados/`);
  }

  getEmpleado(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/empleados/${id}/`);
  }

  createEmpleado(empleado: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/empleados/`, empleado);
  }

  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/empleados/${id}/`, empleado);
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empleados/${id}/`);
  }

}
