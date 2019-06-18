import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {

    }

    @HostListener('mouseleave', ['$event']) onMouseLeave(event: Event) {
        if (this.el.nativeElement.value !== '') {
            this.renderer.addClass(this.el.nativeElement, 'has-value');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'has-value');
        }
    }
}
