import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehiculo, VehiculoService } from '../../servicios/Vehiculo.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { validadorCodigo } from '../../validaciones/VahiculoValidaciones';

@Component({
  selector: 'app-VehiculoDetalle',
  templateUrl: './VehiculoDetalle.component.html',
  styleUrls: ['./VehiculoDetalle.component.css']
})
export class VehiculoDetalleComponent implements OnInit {

  vehiculo?: Vehiculo;
  formulario: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private vehiculoService: VehiculoService,
    private formBuilder: FormBuilder
    ) { 
      this.formulario = this.formBuilder.group({
        "codigo": ['',[Validators.required, validadorCodigo()]],
        "marca": ['',[Validators.required]],
        "modelo": ['',[Validators.required]],
        "anio": ['',[Validators.required]],
        "kilometraje": ['',[Validators.required]],
        "precio": [],
        "calificacion": ['',[Validators.required]]
      });
      this.formulario.controls['codigo'].disable();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params =>{
      this.vehiculoService.getVehiculo(params['codigo']).subscribe( data => {
        if(data.codigo == '1'){
          this.vehiculo = data.data;
          this.formulario.controls['codigo'].setValue(this.vehiculo?.codigo);
          this.formulario.controls['marca'].setValue(this.vehiculo?.marca);
          this.formulario.controls['modelo'].setValue(this.vehiculo?.modelo);
          this.formulario.controls['anio'].setValue(this.vehiculo?.anio);
          this.formulario.controls['calificacion'].setValue(this.vehiculo?.calificacion);
          this.formulario.controls['precio'].setValue(this.vehiculo?.precio);
          this.formulario.controls['kilometraje'].setValue(this.vehiculo?.kilometraje);
        }else{
          Swal.fire({
            title: "Mensaje de Alerta",
            text: "No se pudo cargar la informacion",
            icon: "error"
          });
        }
      });
    });
  }

  guardar(){
    if(this.formulario.valid){
      this.vehiculoService.actualizarVehiculo({...this.formulario.value}, this.formulario.controls['codigo'].value).subscribe(data =>{
        if(data.codigo == '1'){
          Swal.fire(
            {
              title: "Mensaje",
              text: "Vehículo actualizado con exito",
              icon: "info"
            }
          );
        }else{
          Swal.fire(
            {
              title: "Mensaje",
              text: "No se pudo actualizar: "+data.mensaje,
              icon: "info"
            }
          );
        }
      });
    }else{
      Swal.fire(
        {
          title: "Mensaje",
          text: "Faltan llenar campos",
          icon: "error"
        }
      );
    }
  }

  imprimir(){
    console.log('Formulario: ', this.formulario);
    let password = this.formulario.get('password');
    let nuevosValidadores = [Validators.required, Validators.email];
    if(password){
      password.setValidators(nuevosValidadores);
      password.updateValueAndValidity();
    }
	
	if (this.formulario.valid) {
		
	}
  }

}

export function passwordMatchValidator() {
  return (control: FormGroup): ValidationErrors | null => {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('passwordConfirm');

    if (!passwordControl || !confirmPasswordControl) {
      return null;  // Si alguno de los controles no está presente, no aplicamos la validación
    }

    // Comparamos los valores de los dos controles
    if (passwordControl.value !== confirmPasswordControl.value) {
      // Devolvemos un objeto con una propiedad personalizada para indicar el error
      return { 'passwordMismatch': true };
    }

    // Si los valores son iguales, la validación pasa
    return null;
  };
}

export function validarCedula(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null =>{
    const value: string = control.value;

    if (!value) {
      // Si no hay valor, la validación pasa
      return null;
    }

    // Patrón para verificar si la cédula tiene 10 dígitos y otros criterios según sea necesario
    const cedulaPattern = /^\d{10}$/;

    if (!cedulaPattern.test(value)) {
      // Si no coincide con el patrón, devolvemos un error
      return { 'cedulaInvalida': true };
    }

    return null;
  }
}