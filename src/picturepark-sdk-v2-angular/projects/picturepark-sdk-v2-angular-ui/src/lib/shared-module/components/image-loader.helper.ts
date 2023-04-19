import { mdiImageOffOutline, mdiKeyRemove } from '@mdi/js';
import { ContentNotFoundException, ContentPermissionException } from '@picturepark/sdk-v2-angular';
import { of } from 'rxjs';

export function imageLoaderErrorHandler(exception: any) {
  const contentPermissionEx = exception instanceof ContentPermissionException;
  const contentNotFoundEx = exception instanceof ContentNotFoundException;
  if (contentPermissionEx || contentNotFoundEx) {
    const icon = contentPermissionEx ? mdiKeyRemove : mdiImageOffOutline;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="height: 48px; width: 48px; min-height: 48px; min-width: 48px;"><path d="${icon}" /></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return of({ data: blob, fileName: 'mdiKeyRemove.svg', exception, headers: { 'content-type': 'image/svg+xml' } });
  }
  throw exception;
}
