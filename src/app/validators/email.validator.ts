import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EmaileService } from '../services/email.service';

export function uniqueEmail(emails: EmaileService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return emails.isEmailTaken(control.value).pipe(
      map((isTaken) => {
        return isTaken ? { taken: true } : null;
      })
    );
  };
}
