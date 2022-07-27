/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { Liquid } from 'liquidjs';
import { LoggerService } from 'projects/picturepark-sdk-v2-angular-ui/src/lib/shared-module/services/logging/logger.service';

@Injectable({
  providedIn: 'root',
})
export class LiquidRenderingService {
  private liquidEngine: Liquid = new Liquid();

  constructor(private logger: LoggerService) {}

  traverseObject(obj: Object, callback: (key: string, value: any, obj: any) => void): void {
    for (const property in obj) {
      if (obj.hasOwnProperty(property) && obj[property] !== null && obj[property] !== undefined) {
        try {
          if (obj[property].constructor === Object) {
            callback(property, obj[property], obj);
            this.traverseObject(obj[property], callback);
          } else if (obj[property].constructor === Array) {
            for (let i = 0; i < obj[property].length; i++) {
              this.traverseObject(obj[property][i], callback);
            }
          } else {
            callback(property, obj[property], obj);
          }
        } catch (ex) {
          this.logger.error(ex);
        }
      }
    }
  }

  async renderNestedDisplayValues(obj: Object): Promise<void> {
    const displayValues: any[] = [];
    this.traverseObject(obj, (key, value) => {
      if (key === '_displayValues' || key === 'displayValues') {
        displayValues.push(value);
      }
    });

    for (const displayValueObject of displayValues) {
      for (const key in displayValueObject) {
        if (
          displayValueObject.hasOwnProperty(key) &&
          displayValueObject[key] !== null &&
          displayValueObject[key] !== undefined
        ) {
          displayValueObject[key] = await this.liquidEngine.parseAndRender(displayValueObject[key]);
        }
      }
    }
  }

  renderNestedDisplayValuesSync(obj: Object) {
    const displayValues: any[] = [];
    this.traverseObject(obj, (key, value) => {
      if (key === '_displayValues' || key === 'displayValues') {
        displayValues.push(value);
      }
    });

    for (const displayValueObject of displayValues) {
      for (const key in displayValueObject) {
        if (
          displayValueObject.hasOwnProperty(key) &&
          displayValueObject[key] !== null &&
          displayValueObject[key] !== undefined
        ) {
          displayValueObject[key] = this.liquidEngine.parseAndRenderSync(displayValueObject[key]);
        }
      }
    }
  }
}
