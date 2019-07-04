import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
})

export class MemberComponent implements OnInit {
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

    constructor() {}

    deleteMember() {
        this.DELETE.emit({memberID: this.memberID});
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

    ngOnInit(): void {
        console.log(this.memberID + 'created');
    }
}
