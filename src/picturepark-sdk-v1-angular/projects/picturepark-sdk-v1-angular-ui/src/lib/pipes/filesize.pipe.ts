import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filesize' })
export class FileSizePipe implements PipeTransform {
  transform(input: number) {
    if (input < 1024) {
      return input + ' b';
    }

    if (input < 1024 * 1024) {
      return Math.ceil(input / 1024) + ' kb';
    }

    return Math.ceil(input / 1024 / 1024) + ' mb';
  }
}
