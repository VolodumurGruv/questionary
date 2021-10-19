import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { EmaileService } from './email.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  constructor(private emailService: EmaileService) {}
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.emailService.isEmailTaken(control.value).pipe(
      map((isEmailTaken) => (isEmailTaken ? { emailTaken: true } : null)),
      catchError(() => of(null))
    );
  }
}
