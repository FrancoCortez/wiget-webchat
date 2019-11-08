import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rut'
})
export class RutPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value !== undefined && value !== '') {
      var actual = value.replace(/^0+/, "").trim();
      if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "").trim();
        var actualLimpio = sinPuntos.replace(/-/g, "").trim();
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1).trim();
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
          var letra = inicio.charAt(i);
          rutPuntos = letra + rutPuntos;
          if (j % 3 == 0 && j <= inicio.length - 1) {
            rutPuntos = "." + rutPuntos;
          }
          j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
        return rutPuntos;
      }
    }
  }

}
