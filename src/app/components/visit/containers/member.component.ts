import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddTeamMemberDirective } from '../../shared/directives/addTeamMember.directive';
import { Form } from './handleTeamForm.component';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
})

export class MemberComponent {

    @ViewChild(AddTeamMemberDirective, {static: true}) appAddMemberDirective: AddTeamMemberDirective;

    teamMember = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        quality: new FormControl(''),
    });

    firstName = this.teamMember.get('firstName').value;
    lastName = this.teamMember.get('lastName').value;
    quality = this.teamMember.get('quality').value;
    buttonMinusClicked = true;  // close the form and show plus button
    buttonPlusShow = true;
    buttonPlusInit = false;
    buttonMinusShow = true;
    buttonMinusInit = true;
    formGroup = [];
    formNum = 0;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        ) {}

    showMinusHidePlus() {
        this.buttonMinusShow = true;
        this.buttonPlusShow = false;
    }

    showPlusHideMinus() {
        this.buttonMinusShow = false;
        this.buttonPlusShow = true;
    }

    addTeamMember() {
        this.formNum++;
        this.formGroup.push(new Form(true, this.formNum, {firstName: '', lastName: '', quality: ''}));
        console.log('new member added with empty input');
    }

    removeTeamMember() {
        this.formNum--;
        this.formGroup.splice(this.formNum, 1);
        console.log('the last empty member removed');
    }

    loadTeamComponent() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MemberComponent);
        const componentRef = this.appAddMemberDirective.viewContainerRef.createComponent(componentFactory);
        componentRef.changeDetectorRef.detectChanges();
    }
}
