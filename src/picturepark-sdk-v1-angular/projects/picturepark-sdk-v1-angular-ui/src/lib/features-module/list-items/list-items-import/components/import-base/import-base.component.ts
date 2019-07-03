import { Input } from '@angular/core';
import { Subject } from 'rxjs';

// ANGULAR CDK
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import ParsedData from './parsed-data';

export abstract class ImportBaseComponent  {

  @Input() public isImportActive: Subject<boolean>;

  public isPreviewStepSelected = false;
  public isUpdateStepSelected = false;
  public isLinear = false;
  // data from a xml file after load step
  public parsedData = new Subject<ParsedData>();

  constructor() { }

  change(event: StepperSelectionEvent) {
    this.isPreviewStepSelected = event.selectedIndex === 2;
    this.isUpdateStepSelected = event.selectedIndex === 3;
  }

}
