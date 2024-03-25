import { Component, OnInit, input } from '@angular/core';
import { Vehiculo, VehiculoService } from '../../servicios/Vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-PagListaAutos',
  templateUrl: './PagListaAutos.component.html',
  styleUrls: ['./PagListaAutos.component.css']
})
export class PagListaAutosComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService) { }

  public mostrarImagen = false;
  public listaVehiculos:Array<Vehiculo> = [];

  //private _filtro: string = "";
  public rows:number = 10;
  public page:number = 1;
  public pages:number = 0;
  public filtro:string = "";

  /*get filtro(): string {
      return this._filtro;
  }

  set filtro( filtro: string ) {
      this._filtro = filtro;
      //this.listaVehiculos = this.listaVehiculosBD.filter( auto => auto.marca.toLocaleLowerCase().includes( this._filtro.toLocaleLowerCase() ));
  }*/

  ngOnInit() {
    console.log('Ingreso a ejecutarse');
    this.consultarVehiculos();
    //this.vehiculoService.addVehiculo({"codigo": "A007","marca": "HIUNDAI","modelo":"ACCENT", "color":"AZUL", "kilometraje": "50000", "precio": 17000,"foto":"https://kerner.hyundai.com.ec/images/catalogo/modelos/principales/1036.png","anio":2024,"calificacion":5});
    //this.vehiculoService.addVehiculo({"codigo": "A008","marca": "HIUNDAI","modelo":"ACCENT", "color":"AZUL", "kilometraje": "40000", "precio": 17000,"foto":"https://kerner.hyundai.com.ec/images/catalogo/modelos/principales/1036.png","anio":2024,"calificacion":5});
    //this.listaVehiculos = this.vehiculoService.getVehiculos();
    

    /*this.vehiculoService.getVehiculos().subscribe( 
      data => {
        this.listaVehiculos = data;
      },
      error =>{
        console.error('Error al obtener el vehículo:', error);
      }
    );*/
  }

  consultarVehiculos(){
    this.vehiculoService.getVehiculos(this.filtro, this.rows, this.page).subscribe( respuesta => {
      if(respuesta.codigo == '1'){
        this.listaVehiculos = respuesta.data;
        this.pages = respuesta.pages;
        this.paginar(respuesta.pages);
      }
    });
  }

  cambiarPagina(pagina:number){
    this.page = pagina;
    this.consultarVehiculos();
  }

  listaPaginas:Array<number> = [];
  paginar(pages:number){
    this.listaPaginas = [];
    for(let i=1; i<=pages; i++){
      this.listaPaginas.push(i);
    }
  }

  siguiente(){
    if(this.page < this.pages){
      this.page++;
      this.consultarVehiculos();
    }
  }

  atras(){
    if(this.page > 1){
      this.page--;
      this.consultarVehiculos();
    }
  }

  eliminar(codigo:string){
    Swal.fire({
      title: "Estás seguro que deseas eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText:"No",
      icon: "question"
    }).then( (res)=>{
      if(res.isConfirmed){
        this.vehiculoService.eliminarVehiculo(codigo).subscribe( data =>{
          if(data.codigo == '1'){
            this.consultarVehiculos();
            Swal.fire({
              title: "Mensaje",
              text: "Vehiculo eliminado con Exito",
              icon: "success"
            });
          }else{
            Swal.fire({
              title: "Mensaje",
              text: "No se pudo eliminar el registro: " + data.mensaje,
              icon: "error"
            });
          }
        });
      }
    } );
  }

  mostraAlerta(calificacion:any){
    Swal.fire({
      title: "Mensaje",
      text: "La calificacion es: " + calificacion,
      icon: "info"
    });
  }
}
