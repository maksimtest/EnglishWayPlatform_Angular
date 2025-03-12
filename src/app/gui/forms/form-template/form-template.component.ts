import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormDetails} from '../../../interfaces/FormDetails';

@Component({
  selector: 'app-form-template',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './form-template.component.html',
  styleUrl: './form-template.component.css'
})
export class FormTemplateComponent {
  @Input({required: true}) mainForm!: FormGroup;
  @Input({required: true}) mainFormDetails!: Map<string, FormDetails>;
  @Input() showValidationErrors: boolean = false;
  @Input() successTextShow: boolean = false;
  @Input() errorText: string = "";
  @Input() connectionProblemVisible: boolean = false;
  @Input() submitButtonName: string = "Submit";
  @Input() changeTypeFormLink: string = "";
  @Output() changeTypeFormEvent = new EventEmitter<string>();
  @Output() formSubmitEvent = new EventEmitter<string>();

  getControlKeys() {
    return Object.keys(this.mainForm.controls);
  }
  getTitleText(name: string){
    return this.mainFormDetails.get(name)?.title ?? '';
  }
  getTypeText(name: string){
    return this.mainFormDetails.get(name)?.type ?? '';
  }
  getCommentText(name: string):string{
    return this.mainFormDetails.get(name)?.comment ?? '';
  }
  getAutocompleteText(name: string):string{
    return this.mainFormDetails.get(name)?.autocomplete ?? '';
  }
  getPlaceholderText(name: string):string{
    return this.mainFormDetails.get(name)?.placeholder ?? '';
  }
  getErrorText(name: string):string{
    return this.mainForm.get(name)?.errors?.['error'] ?? '';
  }
  onFormSubmit(){
    console.log('form-template.onFormSubmit()');
    let value:string = "";
    this.formSubmitEvent.emit(value);
  }
  switchTypeForm(){
    console.log('form-template.switchTypeForm()');
    this.changeTypeFormEvent.emit('name');
  }
}
