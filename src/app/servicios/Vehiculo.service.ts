import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://www.epico.gob.ec/vehiculo/public/api/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Todos vehiculos => GET vehiculos/
  // Insert => POST vehiculo/
  // Update => PUT vehiculo/:codigo
  // Delete => DELETE vehiculo/:codigo
  // Consulta => GET vehiculo/:codigo
  
  getVehiculos(filtro?:string, rows?:number, page?:number):Observable<Respuesta>{
    let body = new HttpParams();
    body = filtro ? body.set('filtro',filtro) : body;
    body = rows ? body.set('rows',rows) : body;
    body = page ? body.set('page',page) : body;
    
    return this.http.get<Respuesta>(this.baseUrl+"vehiculos/", {params: body});
  }

  insertVehiculo(vehiculo: Vehiculo){
    return this.http.post<Respuesta>(this.baseUrl+"vehiculo/", vehiculo, this.httpOptions);
  }

  getVehiculo(codigo:string){
    return this.http.get<Respuesta>(this.baseUrl+"vehiculo/"+codigo);
  }

  actualizarVehiculo(vehiculo: Vehiculo, codigo:string){
    return this.http.put<Respuesta>(this.baseUrl+"vehiculo/"+codigo, vehiculo, this.httpOptions)
  }

  eliminarVehiculo(codigo:string){
    return this.http.delete<Respuesta>(this.baseUrl+"vehiculo/"+codigo);
  }

  /*getVehiculos(filtro?:string, rows?:number, page?:number):Observable<Vehiculo[]>{
    let body = new HttpParams();
    body = filtro ? body.set('filtro',filtro) : body;
    body = rows ? body.set('rows',rows) : body;
    body = page ? body.set('page',page) : body;
    return this.http.get<Respuesta>(this.baseUrl+"vehiculos/", {params:body}).pipe(
      map(respuesta => respuesta.data),
      //catchError(this.handleError)
    );
  }*/

  /*private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El servidor devolvió un código de error
      errorMessage = `Código: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }*/

  /*getVehiculo(codigo:string): Observable<Vehiculo>{
    const dato: Observable<Vehiculo> = new Observable( consulta =>{
      setTimeout(()=>{
        let vehiculo = this.listaVehiculos.find( element => element.codigo === codigo);
        consulta.next(vehiculo);
      }, 1000);
    });
    return dato;
  }*/

  addVehiculo(Vehiculo:Vehiculo){
    this.listaVehiculos.push(Vehiculo);
  }

  private listaVehiculos: Array<Vehiculo> = [
    {"codigo": "A001","marca": "CHEVROLET1","modelo":"ONIX-6", "color":"AZUL", "kilometraje": "50000", "precio": 17000,"foto":null,"anio":2024,"calificacion":3},
    {"codigo": "A002","marca": "KIA","modelo":"RIO-2", "color":"AZUL", "kilometraje": "50000", "precio": 17000,"foto":null,"anio":2024,"calificacion":4},
    {"codigo": "A003","marca": "CHERY","modelo":"ARRIZO-5", "color":"AZUL", "kilometraje": "50000", "precio": 17000,"foto":"https://www.chery.com.ec/hubfs/CHERY/WEB%202023/Arrizo%205%20Pro/arrizo-5-pro-front_webp.webp","anio":2024,"calificacion":4},
    {"codigo": "A004","marca": "TOYOTA","modelo":"AGYA", "color":"AZUL", "kilometraje": "50000", "precio": 17000,"foto":"https://www.toyota.com.ec//admin/sites/default/files/2023-09/agya-home-toyota.png","anio":2024,"calificacion":5},
    {"codigo": "A005","marca": "HIUNDAI","modelo":"ACCENT", "color":"AZUL", "kilometraje": "50000", "precio": 17000,"foto":"https://kerner.hyundai.com.ec/images/catalogo/modelos/principales/1036.png","anio":2024,"calificacion":5},
    {"codigo": "A006","marca": "HIUNDAI","modelo":"ACCENT", "color":"AZUL", "kilometraje": "50000", "precio": 17000,"foto":"https://kerner.hyundai.com.ec/images/catalogo/modelos/principales/1036.png","anio":2024,"calificacion":5}
  ];

}


export interface Vehiculo{
  codigo: string;
  marca: string;
  color?: string;
  modelo:string;
  kilometraje?:string;
  precio?:number;
  foto?:string | null;
  anio?: number;
  calificacion?:number;
  usuario?:string|null;
  usuario_mod?:string|null;
}

export interface Respuesta{
  codigo:string;
  mensaje:string;
  data:Array<Vehiculo>|Vehiculo|any;
  rows:number;
  pages:number;
  records:number;
  page:number;
}