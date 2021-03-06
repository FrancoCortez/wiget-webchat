import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appOnlyTextNumber]'
})
export class OnlyTextNumberDirective {

  @Input('soloTextNumberActive') active: boolean;
  private regex: RegExp = new RegExp(/^[0-9a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.active) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex) && String(next).match(this.regex) === null) {
        this.el.nativeElement.value = current.substring(0, current.length -1);
        event.preventDefault();
      }
    }
  }

}
