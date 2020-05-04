import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, Injector, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { TermsAggregator, ShareService, ShareAggregationRequest, NestedAggregator } from '@picturepark/sdk-v1-angular';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BaseComponent } from '../../../../shared-module/components/base.component';

@Component({
  selector: 'pp-share-content-recipients-input',
  templateUrl: './share-content-recipients-input.component.html',
  styleUrls: ['./share-content-recipients-input.component.scss'],
})
export class ShareContentRecipientsInputComponent extends BaseComponent implements OnInit {
  @Input() parentForm: FormGroup;
  recipients: FormArray;
  recipientSearch: AbstractControl;

  @ViewChild('matChipListInput') matChipListInput: ElementRef<HTMLInputElement>;
  recipientsAutocomplete: string[] = [];
  isLoading = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  // REGULAR EXPRESSION FOR EMAIL VALIDATION
  private reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(private shareService: ShareService, protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.recipients = <FormArray>this.parentForm.controls['recipients'];
    this.recipientSearch = this.parentForm.controls['recipientSearch'];
    this.recipientSearch.setValidators([Validators.pattern(this.reg)]);
    this.sub = (<FormArray>this.recipientSearch).valueChanges
      .pipe(
        debounceTime(300),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
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
      .subscribe((users) => {
        this.recipientsAutocomplete = users.aggregationResults[0].aggregationResultItems![0].aggregationResults![0].aggregationResultItems!.map(
          (i) => i.name
        );
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
      this.recipients.push(new FormControl(value.trim(), [Validators.email]));

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
