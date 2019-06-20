import { Directive, Renderer2, ElementRef, HostListener, OnChanges, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {

    @Input() public appHighlight: any;
    @Input() public input: any;

    ngOnChanges(changes: SimpleChanges) {
      if (changes.input) {
        console.log('input changed');
        this.checkValue();
      }
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {

    }
    // ngOnInit() {
    //     console.log('init');
    //     this.el.nativeElement.addEventListener('change', this.checkValue());
    // }

    // ngOnChanges(changes: SimpleChanges ): void {
    //     console.log(changes);
    //     if (changes['refresh'].currentValue) {
    //         this.checkValue();
    //     }
    // }

    @HostListener('mouseleave', ['$event']) onMouseLeave(event: Event) {
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
