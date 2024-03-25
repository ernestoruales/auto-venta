import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aEspacio'
})
export class AEspacioPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    console.log('Valores pipe', args);
    const reemplaza = " ";
    return value.replace(args, reemplaza);
  }

}
