import {AbstractControl} from '@angular/forms';


export function emailValidation(control: AbstractControl): { [key: string]: boolean } | null {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(control.value)) {
    return {'email': true}
  }
  return null;
}

export function rutValidation(control: AbstractControl): { [key: string]: boolean | null } {
  let rut = control.value.replace('.', '').replace('-', '');
  let dv = control.value.replace('.', '').replace('-', '');
  rut = rut.replace('.', '');
  dv = dv.replace('.', '');
  rut = rut.substring(0, rut.length - 1);
  dv = dv.substring(dv.length - 1, dv.length);
  let resp;
  if (rut !== null) {
    var M = 0, S = 1;
    for (; rut; rut = Math.floor(rut / 10))
      S = (S + rut % 10 * (9 - M++ % 6)) % 11;
    resp = S ? S - 1 : 'K';
  }
  if (resp == dv) {
    return null;
  } else {
    return {'rut': true}
  }
}

export function urlValidation(control: AbstractControl): { [key: string]: boolean | null } {
  const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]$/;
  if (!re.test(control.value)) {
    return {'url': true}
  }
  return null;
}
