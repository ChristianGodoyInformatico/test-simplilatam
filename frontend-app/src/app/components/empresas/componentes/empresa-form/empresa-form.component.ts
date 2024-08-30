import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { ApiService } from '../../../../services/api.service';

export interface Empresa {
  id?: number;
  nombre: string;
  direccion: string;
  rut: string;
  telefono: string;
}

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.scss'
})
export class EmpresaFormComponent {
  empresaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.empresaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      direccion: ['', [Validators.required, Validators.maxLength(255)]],
      rut: ['', [Validators.required, Validators.maxLength(12)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+56\d{9}$/), Validators.maxLength(20)]],
    });
  }

  onSubmit(): void {
    this.showLoading();

    if (this.empresaForm.valid) {
      setTimeout(() => {
        this.apiService.createEmpresa(this.empresaForm.value).subscribe({
          next: (value) => {
            Swal.close();
            this.router.navigate(['/empresas']);
          },
          error: (err) => {
            Swal.close();
            this.showErrorModal(this.errorHandlerService.extractErrorMessage(err));
          },
        })
      }, 3000)

    } else {
      this.empresaForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/empresas']);
  }

  showErrorModal(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: message.replace(/\n/g, '<br>'),
      confirmButtonText: 'Cerrar'
    });
  }

  showLoading(){
    Swal.fire({
      title: 'Creando empresa...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  } 
}
