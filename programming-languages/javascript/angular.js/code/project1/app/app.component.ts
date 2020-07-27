import { Component } from '@angular/core';
import { AcmeComponent } from './acme/acme.component'
import { CoursesComponent } from './courses/courses.component'
import { DataBindingComponent } from './data-binding/data-binding.component';

@Component({
    selector: 'my-app',
    template: `
        <h1>Angular 2 Boilerplate</h1>
        <acme></acme>
        <courses-list></courses-list>
        <h3>Property e Data binding</h3>
        <example-data-binding></example-data-binding>
    `,
    directives: [AcmeComponent, CoursesComponent, DataBindingComponent]
})
export class AppComponent { }
