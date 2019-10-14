import { SafeUrl } from '@angular/platform-browser';

export class RelationFieldInfo {
  public contentId: string;
  public fileName?: string;
  public fileUrl?: SafeUrl;

  constructor(contentId: string, fileName?: string, fileUrl?: SafeUrl) {
    this.contentId = contentId;
    this.fileName = fileName;
    this.fileUrl = fileUrl;
  }
}
