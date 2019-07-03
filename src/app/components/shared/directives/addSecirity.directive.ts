import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appSecurityDirective]'
})

export class AddSecurityDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
