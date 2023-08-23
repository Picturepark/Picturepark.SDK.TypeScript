import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { LiquidRenderingService } from './liquid-rendering.service';
import { Observable, catchError, from, mergeMap, throwError } from 'rxjs';
import { SwaggerException } from './api-services';
import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';

export abstract class PictureparkServiceBase {
  liquidRenderingService = inject(LiquidRenderingService);

  constructor(private authService: AuthService) {}

  protected transformResult(
    url: string,
    response: HttpResponseBase,
    processor: (response: HttpResponseBase) => Observable<any>
  ): Observable<any> {
    return processor(response);
  }

  getBaseUrl(defaultUrl: string) {
    return this.authService.apiServer;
  }

  protected transformOptions(options: any) {
    return this.authService.transformHttpRequestOptions(options);
  }

  handleRequest<T>(method: string, url: string, options_: any, process: (response: any) => any) {
    return from(this.transformOptions(options_))
      .pipe(
        mergeMap(transformedOptions_ => {
          return (this['http'] as HttpClient).request(method, url, transformedOptions_ as any);
        })
      )
      .pipe(
        mergeMap((response_: any) => {
          return this.transformResult(url, response_, (r: any) => process(r as any));
        })
      )
      .pipe(
        catchError((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.transformResult(url, response_, r => process(r as any));
            } catch (e) {
              return throwError(() => e) as any as Observable<T>;
            }
          } else return throwError(() => response_) as any as Observable<T>;
        })
      );
  }

  getBlob(response: any) {
    return response instanceof HttpResponse
      ? response.body
      : (response as any).error instanceof Blob
      ? (response as any).error
      : undefined;
  }

  getHeaders(response: any) {
    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    return _headers;
  }

  handleResponse(responseBlob: Blob, action: (_responseText: string) => Observable<any>) {
    return this.blobToText(responseBlob).pipe(mergeMap(text => action(text)));
  }

  blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next('');
        observer.complete();
      } else {
        const reader = new FileReader();
        reader.onload = event => {
          observer.next((event.target as any).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }

  getResultData(_responseText: string) {
    return _responseText === '' ? null : JSON.parse(_responseText, this['jsonParseReviver']);
  }

  handleDefaultError(blob: Blob, status: number, headers: { [key: string]: any }) {
    return this.handleResponse(blob, (_responseText: string) => {
      return this.throwException('An unexpected server error occurred.', status, _responseText, headers);
    });
  }

  throwException(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result?: any
  ): Observable<any> {
    if (result !== null && result !== undefined) return throwError(() => result);
    else return throwError(() => new SwaggerException(message, status, response, headers, null));
  }
}
