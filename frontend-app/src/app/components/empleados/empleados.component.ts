import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Empresa } from '../empresas/componentes/empresa-form/empresa-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent {
  displayedColumns: string[] = ['nombre_completo', 'rut', 'email', 'empresa'];
  empleados = new MatTableDataSource<any>();
  filteredEmpleados = new MatTableDataSource<any>();
  empresas: Empresa[] = [];
  selectedEmpresa: number | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchEmpleados();
    this.fetchEmpresas();
  }

  fetchEmpleados(): void {
    this.apiService.getEmpleados().subscribe(data => {
      this.empleados.data = [...data];
      this.filteredEmpleados.data = [...data];
    });
  }

  fetchEmpresas() {
    this.apiService.getEmpresas().subscribe(data => {
      this.empresas = data;
    });
  }

  onEmpresaChange(event: any): void {
    const empresaId = event.target.value;
    this.selectedEmpresa = empresaId === "null" ? null : parseInt(empresaId, 10);

    if (this.selectedEmpresa === null) {
      this.filteredEmpleados.data = [...this.empleados.data];
      this.displayedColumns = ['nombre_completo', 'rut', 'email', 'empresa'];
    } else {
      this.filteredEmpleados.data = [...this.empleados.data.filter((empleado: any) => empleado.empresa.id === this.selectedEmpresa)];
      this.displayedColumns = ['nombre_completo', 'rut', 'email'];
    }
  }

  onAddNew(): void {
    this.router.navigate(['/empleados/nueva']);
  }
}
