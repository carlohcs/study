import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'course',
    template: `
    <div>Nome do curso: <span><strong>{{ name }}</strong></span></div>
    <div>Nome do curso privado: <span><strong>{{ privateName }}</strong></span></div>
    <div>Nome do curso privado - de outro modo: <span><strong>{{ fooname }}</strong></span></div>
    `,
    inputs: ['fooname:bar'] // não funcionou
})
export class InputPropertyComponent {
    // O Input permite o recebimento de dados atrabés do componente
    @Input() name : string = '';
    @Input('anotherName') privateName : string = '';
    @Input('bar') fooname : string = '';
    constructor() { }

}