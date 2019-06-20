import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pp-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss']
})
export class ChipInputComponent {

  @Input() parentForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
  emails: String[] = [];

  // REGULAR EXPRESSION FOR EMAIL VALIDATION
  private reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  add(event: MatChipInputEvent): void {

    const input = event.input;
    const value = event.value;

    // Add our email
    if (value.match(this.reg)) {
      this.emails.push(value.trim());
      input.value = '';
    } else if(value.length > 0) {
      this.parentForm.controls['recipients'].setErrors({'error': true});
    }

    console.log(this.parentForm)

  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

}