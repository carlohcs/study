import { InputPropertyComponent } from './input-property.component';
import { Component } from '@angular/core';

/*styles: [
        `.highlight {
            background: #000;
            color: #fff;
        }`
    ],*/
@Component({
    moduleId: module.id,
    selector: 'example-data-binding',
    templateUrl: 'data-binding.component.html',
    styleUrls: 
    ['data-binding.component.css'],
    directives: [InputPropertyComponent]
})
export class DataBindingComponent {
    url = 'http://carlohcs.com.br';
    urlImage = 'http://lorempixel.com/300/300/nature/'; 

    content:String = '';
    contentSaved:String = '';
    isMouseOver:Boolean = false;
    name: String = '';

    person = {name: 'Carlos Henrique', age: 23};

    constructor() { }

    getValor() {
        return 1;
    }

    infoAlert() {
        alert("Oi!");
    }

    keyUpValue(event:KeyboardEvent) {
        console.log('Evento no log: ', event);
        let val: any = event.target;
        let value = val.value;
        this.content = value;
    }

    // onSave
    saveData(value:any) {
        console.log('Save this data -> ', value);
        this.contentSaved = value;
    }

    onMouseSpan() {
        this.isMouseOver = !this.isMouseOver;
    }
}