import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagListaAutosComponent } from './paginas/PagListaAutos/PagListaAutos.component';
import { VehiculoDetalleComponent } from './paginas/VehiculoDetalle/VehiculoDetalle.component';
import { PagHomeComponent } from './paginas/PagHome/PagHome.component';
import { PagVehiculoRegistroComponent } from './paginas/PagVehiculoRegistro/PagVehiculoRegistro.component';

const routes: Routes = [
  {
    path:"inicio",
    component: PagHomeComponent
  },
  {
    path:"vehiculos",
    component: PagListaAutosComponent
  },
  {
    path:"vehiculo/:codigo",
    component: VehiculoDetalleComponent
  },
  {
    path:"vehiculo",
    component: PagVehiculoRegistroComponent
  },
  {
    path:"",
    component: PagListaAutosComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
