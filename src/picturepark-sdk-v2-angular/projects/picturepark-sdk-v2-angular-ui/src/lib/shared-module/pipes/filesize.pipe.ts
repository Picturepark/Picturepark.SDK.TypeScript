import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filesize', standalone: true })
export class FileSizePipe implements PipeTransform {
  transform(input: number) {
    if (input < 1024) {
      return input + ' Bytes';
    }

    if (input < 1024 * 1024) {
      return Math.ceil(input / 1024) + ' KB';
    }

    return Math.ceil(input / 1024 / 1024) + ' MB';
  }
}
