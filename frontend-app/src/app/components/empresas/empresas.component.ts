import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent {
  displayedColumns: string[] = ['nombre', 'direccion', 'rut', 'telefono'];
  empresas = new MatTableDataSource<any>();

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchEmpresas();
  }

  fetchEmpresas(): void {
    this.apiService.getEmpresas().subscribe(data => {
      this.empresas.data = data;
    });
  }

  onAddNew(): void {
    this.router.navigate(['/empresas/nueva'], );
  }

}
