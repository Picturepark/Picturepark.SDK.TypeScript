import {
  ITranslatedStringDictionary,
  IUserAuditDetail,
  TranslatedStringDictionary,
  UserAuditDetail,
} from './api-services';

export class TermsOfServiceEditable implements ITermsOfServiceEditable {
  content?: TranslatedStringDictionary | undefined;
  validFrom!: Date;

  constructor(data?: ITermsOfServiceEditable) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
      this.content =
        data.content && !(<any>data.content).toJSON
          ? new TranslatedStringDictionary(data.content)
          : <TranslatedStringDictionary>this.content;
    }
  }

  init(_data?: any) {
    if (_data) {
      this.content = _data['content'] ? TranslatedStringDictionary.fromJS(_data['content']) : <any>undefined;
      this.validFrom = _data['validFrom'] ? new Date(_data['validFrom'].toString()) : <any>undefined;
    }
  }

  static fromJS(data: any): TermsOfServiceEditable {
    data = typeof data === 'object' ? data : {};
    let result = new TermsOfServiceEditable();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['content'] = this.content ? this.content.toJSON() : <any>undefined;
    data['validFrom'] = this.validFrom ? this.validFrom.toISOString() : <any>undefined;
    return data;
  }
}

export interface ITermsOfServiceEditable {
  content?: ITranslatedStringDictionary | undefined;
  validFrom: Date;
}

export class TermsOfService extends TermsOfServiceEditable implements ITermsOfService {
  id?: string | undefined;

  constructor(data?: ITermsOfService) {
    super(data);
  }

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.id = _data['id'];
    }
  }

  static fromJS(data: any): TermsOfService {
    data = typeof data === 'object' ? data : {};
    let result = new TermsOfService();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    super.toJSON(data);
    return data;
  }
}

export interface ITermsOfService extends ITermsOfServiceEditable {
  id?: string | undefined;
}

export class TermsOfServiceDetail extends TermsOfService implements ITermsOfServiceDetail {
  /** Audit information. */
  audit?: UserAuditDetail | undefined;

  constructor(data?: ITermsOfServiceDetail) {
    super(data);
    if (data) {
      this.audit =
        data.audit && !(<any>data.audit).toJSON ? new UserAuditDetail(data.audit) : <UserAuditDetail>this.audit;
    }
  }

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.audit = _data['audit'] ? UserAuditDetail.fromJS(_data['audit']) : <any>undefined;
    }
  }

  static fromJS(data: any): TermsOfServiceDetail {
    data = typeof data === 'object' ? data : {};
    let result = new TermsOfServiceDetail();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['audit'] = this.audit ? this.audit.toJSON() : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ITermsOfServiceDetail extends ITermsOfService {
  /** Audit information. */
  audit?: IUserAuditDetail | undefined;
}
