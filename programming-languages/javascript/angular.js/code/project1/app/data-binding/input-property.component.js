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
var core_1 = require('@angular/core');
var InputPropertyComponent = (function () {
    function InputPropertyComponent() {
        // O Input permite o recebimento de dados atrabés do componente
        this.name = '';
        this.privateName = '';
        this.fooname = '';
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], InputPropertyComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input('anotherName'), 
        __metadata('design:type', String)
    ], InputPropertyComponent.prototype, "privateName", void 0);
    __decorate([
        core_1.Input('bar'), 
        __metadata('design:type', String)
    ], InputPropertyComponent.prototype, "fooname", void 0);
    InputPropertyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course',
            template: "\n    <div>Nome do curso: <span><strong>{{ name }}</strong></span></div>\n    <div>Nome do curso privado: <span><strong>{{ privateName }}</strong></span></div>\n    <div>Nome do curso privado - de outro modo: <span><strong>{{ fooname }}</strong></span></div>\n    ",
            inputs: ['fooname:bar'] // não funcionou
        }), 
        __metadata('design:paramtypes', [])
    ], InputPropertyComponent);
    return InputPropertyComponent;
}());
exports.InputPropertyComponent = InputPropertyComponent;
//# sourceMappingURL=input-property.component.js.map