import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const emails = ['test@test.test'];

@Injectable({ providedIn: 'root' })
export class EmaileService {
  isEmailTaken(email: string): Observable<boolean> {
    const isTaken = emails.includes(email);

    console.log(`isTaken service ${isTaken}`);

    return of(isTaken).pipe(delay(1000));
  }
}
