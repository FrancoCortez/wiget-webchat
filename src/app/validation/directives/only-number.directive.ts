import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';
import {InputComponent} from "../../components/input/input.component";

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective{

  @Input('soloNumberActive') active: boolean;
  private regex: RegExp = new RegExp(/^\d+$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];


  constructor(private el: ElementRef){}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: any) {
    if (this.active) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^\w\s]/gi, '');
      let next: string = event.key;
      if (next && !next.match(this.regex) && next.match(this.regex) === null) {
        event.returnValue = false;
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        return;
      }
    }
  }
  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    if (this.active) {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^\w\s]/gi, '');
      let next: string = this.el.nativeElement.value;
      if (next && !next.match(this.regex) && next.match(this.regex) === null) {
        event.returnValue = false;
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        return;
      }
    }
  }

  private adminEvent (event: KeyboardEvent) {

  }
}
