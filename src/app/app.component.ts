import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, take } from 'rxjs';
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

  // deleteCourse(index: number) {      //failed in firebase you can't delete the object based on idex of array you must know the identifier in firebase
  //   this.db
  //     .object<fireBaseDataType>('/courses/' + index)
  //     .remove()
  //     .then(() => console.log('Deleted', index));
  // }

  deleteCourse(index: number) {
    this.db
      .list<fireBaseDataType>('/courses')
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((changes) => {
        //we need to subscibe to take the key
        const courseId = changes[index].payload.key;
        this.db
          .object(`/courses/${courseId}`)
          .remove()
          .then(() => console.log('Deleted', courseId))
          .catch((error) => console.log('Error deleting', courseId, error));
      });
  }
}
