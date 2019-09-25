import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Validacion para funciones parametrizadas por el cliente
 *
 * @param validation funcion de validacion que se obtiene de la configuracion
 */
export function validationGeneric(validation: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    try {
      validation(control.value);
    } catch (e) {
      return {messageValidation: e.message};
    }
    return null;
  };
}

/**
 * funcion de validacion por defecto cuando la validacion del cliente no viene, se emplea
 * esta validacion por defecto dentro de los recursos donde siempre da true por lo que es una
 * especie de dummy
 *
 * @param control control afectado por la validacion.
 */
export function validationOfNull(control: AbstractControl) {
  return null;
}
