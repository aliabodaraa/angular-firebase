import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
type fireBaseDataType = { name: string; price: number };
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  courses$: Observable<fireBaseDataType[]>;
  course$: Observable<fireBaseDataType | null>;
  constructor(private db: AngularFireDatabase) {
    this.courses$ = this.db.list<fireBaseDataType>('/courses').valueChanges();
    this.course$ = this.db
      .object<fireBaseDataType>('/courses/1')
      .valueChanges();
  }

  addCourse(course: HTMLInputElement) {
    this.db
      .list<fireBaseDataType>('/courses')
      .push({ name: course.value, price: 1000 });
    course.value = '';
  }
  editCourse(edited_input: HTMLInputElement, index: number) {
    let named_property = edited_input.type == 'text' ? 'name' : 'price';
    this.db
      .object<fireBaseDataType>('/courses/' + index)
      .update({ [named_property]: edited_input.value }); //update only the wanted property the property not mentioned here will not affected
    edited_input.value = '';
  }
}
