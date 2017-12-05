import {
  AbstractControl
} from '@angular/forms';

export const passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
  const password = control.get('password');
  const confirm = control.get('confirm');
  if (!password || !confirm) {
    return null;
  }
  return password.value === confirm.value ? null : { nomatch: true };
};
