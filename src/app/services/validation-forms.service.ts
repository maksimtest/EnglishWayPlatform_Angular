import { Injectable } from '@angular/core';
import {FormGroup, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  constructor() { }

  usernameValidator(formGroup: FormGroup): ValidationErrors | null {
    const usernameValue = formGroup.value;
    const previousUsernameValue = formGroup.parent?.get('previousUsername')?.value;
    if (usernameValue && usernameValue.length < 3) {
      return {error: "USERNAME_TOO_SHORT"};
    }
    if(previousUsernameValue == usernameValue){
      return {error: "USERNAME_ALREADY_EXISTS"};
    }
    return null;
  }
  nicknameValidator(formGroup: FormGroup): ValidationErrors | null {
    const name = formGroup.value;
    if (name && name.length < 3) {
      return {error: "NAME_TOO_SHORT"};
    }
    return null;
  }

  passwordValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.value;
    if (password && password.length < 3) {
      return {error: "PASSWORD_TOO_SHORT"};
    }
    return null;
  }
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const confirmPassword = formGroup.parent?.get('confirmPassword');
    if (confirmPassword?.value !== formGroup.value) {
      confirmPassword?.setErrors({error: "PASSWORDS_ARE_MISMATCH"});
    }
    return null;
  }

  confirmPasswordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.parent?.get('password');
    if (password?.value !== formGroup.value) {
      return {error: "PASSWORDS_ARE_MISMATCH"};
    }
    return null;
  }

}
