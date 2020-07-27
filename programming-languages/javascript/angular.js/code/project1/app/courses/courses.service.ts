import { Injectable } from '@angular/core';

export class CoursesService {
    getCourses(): Array<string> {
         return ['JavaScript', 'Java', 'Angular', 'React'];
    }   
}