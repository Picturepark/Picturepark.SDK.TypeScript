import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormArray, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { TermsAggregator, ShareService, ShareAggregationRequest, NestedAggregator } from '@picturepark/sdk-v2-angular';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { BaseComponent } from '../../../../shared-module/components/base.component';
import { TranslatePipe } from '../../../../shared-module/pipes/translate.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'pp-share-content-recipients-input',
    templateUrl: './share-content-recipients-input.component.html',
    styleUrls: ['./share-content-recipients-input.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        NgClass,
        MatChipsModule,
        NgFor,
        MatIconModule,
        MatAutocompleteModule,
        NgIf,
        MatOptionModule,
        MatProgressSpinnerModule,
        TranslatePipe,
    ],
})
export class ShareContentRecipientsInputComponent extends BaseComponent implements OnInit {
  @Input() parentForm: UntypedFormGroup;
  recipients: UntypedFormArray;
  recipientSearch: AbstractControl;

  @ViewChild('matChipListInput') matChipListInput: ElementRef<HTMLInputElement>;
  recipientsAutocomplete: string[] = [];
  isLoading = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // REGULAR EXPRESSION FOR EMAIL VALIDATION
  private reg =
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private shareService: ShareService) {
    super();
  }

  ngOnInit(): void {
    this.recipients = <UntypedFormArray>this.parentForm.controls['recipients'];
    this.recipientSearch = this.parentForm.controls['recipientSearch'];
    this.recipientSearch.setValidators([Validators.pattern(this.reg)]);
    this.sub = (<UntypedFormArray>this.recipientSearch).valueChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.isLoading = true)),
        switchMap(value =>
          this.shareService
            .aggregate(
              new ShareAggregationRequest({
                aggregators: [
                  new NestedAggregator({
                    path: 'data.recipientEmailAddresses',
                    name: 'recipientsAutocomplete-wrap',
                    aggregators: [
                      new TermsAggregator({
                        name: 'recipientsAutocomplete',
                        field: 'data.recipientEmailAddresses.emailAddress',
                        searchString: value,
                        searchFields: ['data.recipientEmailAddresses.*'],
                        size: 20,
                      }),
                    ],
                  }),
                ],
              })
            )
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe(users => {
        this.recipientsAutocomplete =
          users.aggregationResults?.[0]?.aggregationResultItems?.[0]?.aggregationResults?.[0]?.aggregationResultItems?.map(
            i => i.name
          ) ?? [];
      });
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.recipientsAutocomplete = [];
    this.recipientSearch.setValue(event.option.value);
    this.updateRecipients();
  }

  updateRecipients(): void {
    // Exit if suggestions open
    if (this.recipientsAutocomplete.length) {
      return;
    }

    // Add our email
    if (!this.recipientSearch.errors) {
      const value = this.recipientSearch.value;

      if (!value.length || this.recipients.controls.findIndex(control => control.value === value) !== -1) {
        return;
      }

      this.recipients.push(new UntypedFormControl(value.trim(), [Validators.email]));

      this.recipients.markAsTouched();

      /**
       * this.matChipListInput.nativeElement.value = ''
       * Used instead of :
       * this.recipientSearch.setValue('');
       * Because the updating of the value a formControl that is
       * associated to the input inside a mat-chip-list does not work
       */
      this.matChipListInput.nativeElement.value = '';
    }
  }

  remove(email: string): void {
    this.recipients.removeAt(this.recipients.value.indexOf(email));
  }

  // HANDLE COMPONENENT ENTER KEY PRESS EVENT
  @HostListener('document:keydown.Enter', ['$event'])
  handleEnterDown(event: any): void {
    this.recipientSearch.markAsTouched();
  }
}
