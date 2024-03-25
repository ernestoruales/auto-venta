import { NgModule } from "@angular/core";
import { PagListaAutosComponent } from "./PagListaAutos/PagListaAutos.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AEspacioPipe } from "../util/pipes/aEspacio.pipe";
import { VehiculoDetalleComponent } from "./VehiculoDetalle/VehiculoDetalle.component";
import { RouterModule } from "@angular/router";
import { PagHomeComponent } from "./PagHome/PagHome.component";
import { PagVehiculoRegistroComponent } from "./PagVehiculoRegistro/PagVehiculoRegistro.component";
import { CalificacionComponent } from "../componentes/calificacion/calificacion.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations:[
        PagListaAutosComponent,
        VehiculoDetalleComponent,
        PagVehiculoRegistroComponent,
        PagHomeComponent,
        AEspacioPipe,
        CalificacionComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ],
    exports:[
        PagListaAutosComponent,
        VehiculoDetalleComponent,
        PagVehiculoRegistroComponent,
        PagHomeComponent,
        CalificacionComponent
    ]
})
export class PaginasModule {

}