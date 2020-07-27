"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var input_property_component_1 = require('./input-property.component');
var core_1 = require('@angular/core');
/*styles: [
        `.highlight {
            background: #000;
            color: #fff;
        }`
    ],*/
var DataBindingComponent = (function () {
    function DataBindingComponent() {
        this.url = 'http://carlohcs.com.br';
        this.urlImage = 'http://lorempixel.com/300/300/nature/';
        this.content = '';
        this.contentSaved = '';
        this.isMouseOver = false;
        this.name = '';
        this.person = { name: 'Carlos Henrique', age: 23 };
    }
    DataBindingComponent.prototype.getValor = function () {
        return 1;
    };
    DataBindingComponent.prototype.infoAlert = function () {
        alert("Oi!");
    };
    DataBindingComponent.prototype.keyUpValue = function (event) {
        console.log('Evento no log: ', event);
        var val = event.target;
        var value = val.value;
        this.content = value;
    };
    // onSave
    DataBindingComponent.prototype.saveData = function (value) {
        console.log('Save this data -> ', value);
        this.contentSaved = value;
    };
    DataBindingComponent.prototype.onMouseSpan = function () {
        this.isMouseOver = !this.isMouseOver;
    };
    DataBindingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'example-data-binding',
            templateUrl: 'data-binding.component.html',
            styleUrls: ['data-binding.component.css'],
            directives: [input_property_component_1.InputPropertyComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], DataBindingComponent);
    return DataBindingComponent;
}());
exports.DataBindingComponent = DataBindingComponent;
//# sourceMappingURL=data-binding.component.js.map