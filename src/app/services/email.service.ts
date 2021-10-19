import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const emails = ['test2@test.test'];

@Injectable({ providedIn: 'root' })
export class EmaileService {
  isEmailTaken(email: string): Observable<boolean> {
    const isTaken = emails.includes(email);

    return of(isTaken).pipe(delay(1000));
  }
}
