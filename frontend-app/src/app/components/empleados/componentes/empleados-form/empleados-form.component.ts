import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorHandlerService } from '../../../../services/error-handler.service';

@Component({
  selector: 'app-empleados-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './empleados-form.component.html',
  styleUrl: './empleados-form.component.scss'
})
export class EmpleadosFormComponent {
  empleadoForm!: FormGroup;
  empresas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchEmpresas(); 
  }

  initForm(): void {
    this.empleadoForm = this.fb.group({
      empresa: ['',], 
      nombre_completo: ['', [Validators.required, Validators.maxLength(255)]],
      rut: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  fetchEmpresas(): void {
    this.apiService.getEmpresas().subscribe(data => {
      this.empresas = data;
    });
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      this.showLoading();

      setTimeout(() => {
        this.apiService.createEmpleado(this.empleadoForm.value).subscribe({
          next: () => {
            Swal.close(); 
            this.router.navigate(['/empleados']);
          },
          error: (err: any) => {
            Swal.close(); 
            this.showErrorModal(this.errorHandlerService.extractErrorMessage(err));
          }
        });
      }, 3000);
    } else {
      this.empleadoForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/empleados']);
  }

  showLoading(): void {
    Swal.fire({
      title: 'Creando empleado...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  showErrorModal(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: message.replace(/\n/g, '<br>'),
      confirmButtonText: 'Cerrar'
    });
  }
}
