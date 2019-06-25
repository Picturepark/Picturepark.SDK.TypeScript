import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input,ElementRef, HostListener, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'pp-share-content-recipients-input',
  templateUrl: './share-content-recipients-input.component.html',
  styleUrls: ['./share-content-recipients-input.component.scss']
})
export class ShareContentRecipientsInputComponent {

  @Input() parentForm: FormGroup;

  public elementRef: ElementRef;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
  recipients: String[] = [];

  // REGULAR EXPRESSION FOR EMAIL VALIDATION
  private reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private myElement: ElementRef,) {
    this.elementRef = this.myElement;
  }

  // ADD RECIPIENT TO LIST
  add(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

    this.parentForm.controls['recipients'].markAsTouched();

    // Add our email
    if (value.match(this.reg)) {

      this.recipients.push(value.trim());

      const recipientsControl = <FormArray>this.parentForm.controls['recipients'];
      recipientsControl.push(new FormControl(value, [ Validators.pattern(this.reg) ]));
      
      input.value = '';

    } else if(value.length > 0) {
      this.parentForm.controls['recipients'].setErrors({'error': true });
    }

  }

  remove(email: string): void {
    const index = this.recipients.indexOf(email);

    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  // HANDLE COMPONENENT ENTER KEY PRESS EVENT
  @HostListener('document:keydown.Enter', ['$event'])
  handleEnterDown(event: any) {
    if(event.srcElement.id && event.srcElement.id === 'mat-chip-list-input-0') {
      
      this.parentForm.controls['recipients'].markAsTouched();

      if(event.srcElement.value.length > 0 && this.recipients.length === 0 && !event.srcElement.value.match(this.reg)) {
        this.parentForm.controls['recipients'].setErrors({'error': true });
      } else if(this.recipients.length === 0 && !event.srcElement.value.match(this.reg)) {
        this.parentForm.controls['recipients'].setErrors({'required': true });
      }

    }
  }

  // HANDLE COMPONENENT BACKSPACE KEY PRESS EVENT
  @HostListener('document:keydown.backspace', ['$event'])
  handleEscapeDown(event: any) {

    if(event.srcElement.id && event.srcElement.id === 'mat-chip-list-input-0') {
      
      if(event.srcElement.value.length > 1 && !event.srcElement.value.match(this.reg)) {
        this.parentForm.controls['recipients'].setErrors({'error': true });
      } else if(event.srcElement.value.length <= 1 && this.recipients.length > 0) {
        setTimeout(() => { this.parentForm.controls['recipients'].setErrors(null); },0)
      } else if(event.srcElement.value.length === 0 && this.recipients.length === 0) {
        this.parentForm.controls['recipients'].setErrors({'required': true });
      }
      
    }

  }
    
}