import { Component, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormData } from '../interfaces/formData.interface';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
})

export class HandleTeamFormComponent {
    constructor() {}
}

export class Form {
    constructor(
        public status: boolean,
        public formNum: number,
        public data: FormData) { }
}
