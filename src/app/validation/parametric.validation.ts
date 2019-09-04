import {AbstractControl, ValidatorFn} from '@angular/forms';


export function validationGeneric(validation: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    try {
      validation(control.value);
    } catch (e) {
      return { messageValidation: e.message};
    }
    return null;
  };
}

export function validationOfNull(control: AbstractControl) {
  return null;
}
