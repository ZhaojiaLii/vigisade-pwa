import { Directive, Renderer2, ElementRef, HostListener, OnChanges, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {

    @Input() public appHighlight: any;
    @Input() public input: any;

    constructor(private el: ElementRef, private renderer: Renderer2) {

    }

    @HostListener('change') ngOnChanges() {
        this.checkValue();
    }

    checkValue() {
        if (this.el.nativeElement.value !== '') {
            this.renderer.addClass(this.el.nativeElement, 'has-value');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'has-value');
        }
    }
}
