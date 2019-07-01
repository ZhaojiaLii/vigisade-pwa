import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appAddMemberDirective]'
})

export class AddTeamMemberDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
