import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { VehiculoService } from '../../servicios/Vehiculo.service';
import { validadorCodigo } from '../../validaciones/VahiculoValidaciones';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-PagVehiculoRegistro',
  templateUrl: './PagVehiculoRegistro.component.html',
  styleUrls: ['./PagVehiculoRegistro.component.css']
})
export class PagVehiculoRegistroComponent implements OnInit {

  formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private vehiculoService: VehiculoService
  ) { 
    this.formulario = this.formBuilder.group({
      "codigo": ['',[Validators.required, validadorCodigo()]],
      "marca": ['',[Validators.required]],
      "modelo": ['',[Validators.required]],
      "anio": ['',[Validators.required]],
      "kilometraje": ['',[Validators.required]],
      "precio": [],
      "calificacion": ['',[Validators.required]],
      "foto": []
    });
  }

  ngOnInit() {
   
  }

  guardar(){
    if(this.formulario.valid){
      this.vehiculoService.insertVehiculo({...this.formulario.value}).subscribe(
        respuesta => {
          if(respuesta.codigo == '1'){
            Swal.fire({
              title: "Mensaje",
              text: "Vehiculo Registrado con Exito",
              icon: "success"
            }).then( res =>{
              this.formulario.reset();
            } );
          }else{
            Swal.fire({
              title: "Mensaje",
              text: "No se pudo registrar el vehiculo: "+respuesta.mensaje,
              icon: "error"
            });
          }
        }
      );
    }else{
      Swal.fire({
        title: "Mensaje",
        text: "Faltan llenar campos?",
        icon: "error"
      });
    }
  }
}



export function validarCodigoComparativo(){
  return (formulario: FormGroup):ValidationErrors|null => {
    let valor = formulario.controls['codigo'].value;
    let valor2 = formulario.controls['codigo_confirm'].value;
    if(valor === valor2){
      return null;
    }
    return {'codigocomparativo':true};
  }
}
