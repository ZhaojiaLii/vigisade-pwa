import {Component, ComponentFactoryResolver, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
})

export class MemberComponent {
    @Input() memberID;
    @Output() FirstName = new EventEmitter<object>();
    @Output() LastName = new EventEmitter<object>();
    @Output() Quality = new EventEmitter<object>();
    @Output() DELETE = new EventEmitter<object>();
    teamMember = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        quality: new FormControl(''),
    });

    firstName = this.teamMember.value.firstName;
    lastName = this.teamMember.value.lastName;
    quality = this.teamMember.value.quality;

    constructor() {}

    deleteMember() {
        this.DELETE.emit({memberID: this.memberID, index: -1});
    }

    firstNameChanged() {
        this.FirstName.emit({memberID: this.memberID , firstName: this.teamMember.value.firstName});
    }
    lastNameChanged() {
        this.LastName.emit({memberID: this.memberID, lastName: this.teamMember.value.lastName});
    }
    qualityChanged() {
        this.Quality.emit({memberID: this.memberID, quality: this.teamMember.value.quality});
    }
}
