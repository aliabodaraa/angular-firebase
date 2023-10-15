import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscription, Observable } from 'rxjs';
type dataType = { name: string; price: number }[];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  courses: dataType = [];
  subscribtion: Subscription;
  constructor(private db: AngularFireDatabase) {
    this.subscribtion = this.db
      .list('/courses')
      .valueChanges()
      .subscribe({
        next: (courses) => {
          this.courses = courses as dataType;
          console.log(this.courses);
        },
      });
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  title = 'firebase-with-angular';
}
