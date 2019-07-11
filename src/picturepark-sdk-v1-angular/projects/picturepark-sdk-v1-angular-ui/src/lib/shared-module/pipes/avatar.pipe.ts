import { Pipe, PipeTransform } from '@angular/core';

// MD5 HASH
import { Md5 } from 'ts-md5/dist/md5';

@Pipe({ name: 'ppavatar' })
export class AvatarPipe implements PipeTransform {
  transform(value: string): string  {
    return `https://www.gravatar.com/avatar/${Md5.hashStr(value)}?d=mm&s=48`;
  }
}
