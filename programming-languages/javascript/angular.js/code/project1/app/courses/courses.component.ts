import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

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
@Component({
    moduleId: module.id,
    selector: 'courses-list',
    
    templateUrl: 'courses.component.html',
    providers: [CoursesService] // ORIGINAL EXCEPTION: No provider for CoursesService!
})

export class CoursesComponent {
    name: String = 'Carlos Henrique';

    courses: Array<string> = [];

    constructor(coursesService: CoursesService) {
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

    // Isso aqui é lógica de negócio. Pode vir do banco de dados
    // ou de qualquer outra fonte. Sendo assim, vamos separar e criar um serviço
    /*courses = [
        'JavaScript', 'Java', 'Angular', 'React'
    ];*/
}