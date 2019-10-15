import {AbstractControl} from '@angular/forms';
import {tryCatch} from "rxjs/internal-compatibility";


export function emailValidation(control: AbstractControl) : { [key: string]: boolean } | null {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(control.value)) {
    return {'email': true}
  }
  return null;
}

export function rutValidation(control: AbstractControl): {[key: string]: boolean | null} {
  let T = control.value;
  if(T !== null) {
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
      S=(S+T%10*(9-M++%6))%11;
    const resp  = S?S-1:'K';
    return {'rut': true}
  }
  return null;
}
export function urlValidation(control: AbstractControl): {[key: string]: boolean | null} {
  const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]$/;
  if(!re.test(control.value)){
    return {'url': true}
  }
  return null;
}
