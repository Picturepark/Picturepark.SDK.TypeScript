import { SafeUrl } from '@angular/platform-browser';

export class RelationFieldInfo {
  public fileName: string;
  public fileUrl: SafeUrl;

  constructor(fileName: string, fileUrl: SafeUrl) {
    this.fileName = fileName;
    this.fileUrl = fileUrl;
  }
}
