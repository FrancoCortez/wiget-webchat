import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  @Input('soloNumberActive') active: boolean;
  private regex: RegExp = new RegExp(/^[0-9]+$/);
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    if(this.active) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^\w\s]/gi, '');
      let current: string = this.el.nativeElement.value;
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  }
}
