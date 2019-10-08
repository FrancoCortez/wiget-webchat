import {AbstractControl} from '@angular/forms';


export function emailValidation(control: AbstractControl) : { [key: string]: boolean } | null {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(control.value)) {
    return {'email': true}
  }
  return null;
}

export function rutValidation(control: AbstractControl): {[key: string]: boolean | null} {
  return null
}
export function urlValidation(control: AbstractControl): {[key: string]: boolean | null} {
  return null;
}
