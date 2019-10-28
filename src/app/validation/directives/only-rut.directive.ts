import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {RutPipe} from "../pipe/rut.pipe";
import {FormGroup, NgControl} from "@angular/forms";

@Directive({
  selector: '[appOnlyRut]'
})
export class OnlyRutDirective {
  @Input('soloRutActive') active: boolean;
  @Input('form') form: FormGroup;
  value: string;
  private pipe = new RutPipe();

  constructor(private el: ElementRef, private control: NgControl) {
  }

  @HostListener('keydown', ['$event'])
  @HostListener('keyup', ['$event'])
  @HostListener('change', ['$event'])
  @HostListener('blur', ['$event'])
  onChange($event) {
    if (this.active) {
      if (this.el.nativeElement !== undefined && this.el.nativeElement.value !== '') {
        const actual = this.el.nativeElement.value.replace(/^0+/, "").trim();
        if (actual != '' && actual.length > 1) {
          this.control.control.setValue(this.pipe.transform($event.target.value));
        }
      }
    }
  }
}
