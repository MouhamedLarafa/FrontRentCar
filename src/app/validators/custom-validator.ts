import {FormControl, ValidationErrors} from "@angular/forms";

export class CustomValidator {

  static notBlank(control:FormControl):ValidationErrors{
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? { 'notBlank': true } : { 'notBlank': false };

  }


  static matchedPassword(control1:string,control2:string ):ValidationErrors{
    let isvalid = false;
    if(control1 == control2){
      isvalid = true;
    }
    return isvalid ? { 'matched': true } : { 'matched': false };
  }
}
