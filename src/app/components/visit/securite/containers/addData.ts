import { Type } from '@angular/core';

export class AddData {
    constructor(
        public component: Type<any>,
        public data: any
    ) {}
}
