import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlynumbers]'
})
export class OnlynumbersDirective {

  constructor(private el: ElementRef) { }


  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const inputValue = this.el.nativeElement.value;
    this.el.nativeElement.value = inputValue.replace(/[^0-9]/g, '');
  }
  
}
