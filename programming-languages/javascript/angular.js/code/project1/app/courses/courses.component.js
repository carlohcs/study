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
var courses_service_1 = require('./courses.service');
/*template: `
        // Apenas para pequenas aplicações
      <ul>
            <li *ngFor="let course of courses">
              {{ course }}
             </li>
        </ul>
    `*/
/**
 * O Angular tem um problema para encontrar templates apenas pela url
 * como no caso de 'templateUrl',
 * Sendo assim, é necessário referenciar o caminho pelo system.js
 */
var CoursesComponent = (function () {
    function CoursesComponent(coursesService) {
        this.name = 'Carlos Henrique';
        this.courses = [];
        this.courses = coursesService.getCourses();
        // Problema: Forte acoplamento, pois os dados estão sendo 
        // instanciados diretamente no código. Deve se acontecer o contrário:
        // a inversão de dependência
        /*
        let
            coursesService = new CoursesService();
        this.courses = coursesService.getCourses();
        */
    }
    CoursesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'courses-list',
            templateUrl: 'courses.component.html',
            providers: [courses_service_1.CoursesService] // ORIGINAL EXCEPTION: No provider for CoursesService!
        }), 
        __metadata('design:paramtypes', [courses_service_1.CoursesService])
    ], CoursesComponent);
    return CoursesComponent;
}());
exports.CoursesComponent = CoursesComponent;
//# sourceMappingURL=courses.component.js.map