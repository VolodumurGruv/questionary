import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailSymbol(): ValidatorFn {
  const reg: RegExp =
    /^[a-zA-Z][a-zA-Z0-9-_\.]+([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = reg.test(control.value);

    return !forbidden ? { forbiddenSymbol: true } : null;
  };
}
