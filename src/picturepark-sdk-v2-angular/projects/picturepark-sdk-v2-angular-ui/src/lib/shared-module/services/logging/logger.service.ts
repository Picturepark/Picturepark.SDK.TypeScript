import { Injectable } from '@angular/core';
import { LogLevel } from './log-level';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  static defaultLogLevel: LogLevel;

  private logLevel: LogLevel;

  constructor(private route: ActivatedRoute) {
    this.logLevel = LoggerService.defaultLogLevel;
    route.queryParams.pipe(filter(params => params.logLevel)).subscribe(params => {
      const level: LogLevel | undefined = (<any>LogLevel)[params.logLevel];
      if (level !== undefined) this.logLevel = level;
    });
  }

  debug(...data: any[]) {
    if (this.logLevel <= LogLevel.Debug) {
      /* eslint-disable */
      console.debug(...data);
      /* eslint-enable */
    }
  }

  info(message?: any, ...optionalParams: any[]) {
    if (this.logLevel <= LogLevel.Info) {
      /* eslint-disable */
      console.info(message, ...optionalParams);
      /* eslint-enable */
    }
  }

  warn(message?: any, ...optionalParams: any[]) {
    if (this.logLevel <= LogLevel.Warn) {
      // eslint-disable-next-line no-console
      console.warn(message, ...optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]) {
    if (this.logLevel <= LogLevel.Error) {
      // eslint-disable-next-line no-console
      console.error(message, ...optionalParams);
    }
  }
}
