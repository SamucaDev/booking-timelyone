import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFullscreen]',
  standalone: true 
})
export class FullscreenDirective {

  constructor(private el: ElementRef) {}

  private setHeight() {
    this.el.nativeElement.style.height = `${window.innerHeight}px`;
  }

  ngOnInit() {
    this.setHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.setHeight();
  }
}
