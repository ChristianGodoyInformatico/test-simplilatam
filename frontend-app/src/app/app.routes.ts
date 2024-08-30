import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { EmpresaFormComponent } from './components/empresas/componentes/empresa-form/empresa-form.component';
import { EmpleadosFormComponent } from './components/empleados/componentes/empleados-form/empleados-form.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'empresas',
        component: EmpresasComponent,
    },
    {
        path: 'empresas/nueva',
        component: EmpresaFormComponent
    },
    {
        path: 'empleados',
        component: EmpleadosComponent
    },
    {
        path: 'empleados/nueva',
        component: EmpleadosFormComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }