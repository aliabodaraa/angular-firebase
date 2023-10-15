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
  constructor(private db: AngularFireDatabase) {
    this.courses$ = this.db.list<fireBaseDataType>('/courses').valueChanges();
  }
}
