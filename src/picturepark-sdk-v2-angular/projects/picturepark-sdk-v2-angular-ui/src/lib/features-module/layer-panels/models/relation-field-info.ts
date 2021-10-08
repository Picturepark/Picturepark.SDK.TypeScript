import { SafeUrl } from '@angular/platform-browser';

export class RelationFieldInfo {
  public contentId: string;
  public name?: string;
  public list?: string;
  public fileUrl?: SafeUrl;

  constructor(contentId: string, name?: string, list?: string, fileUrl?: SafeUrl) {
    this.contentId = contentId;
    this.name = name;
    this.list = list;
    this.fileUrl = fileUrl;
  }
}
