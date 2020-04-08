export interface PictureparkConfiguration {
  apiServer?: string;
  customerAlias?: string;
}

export interface PictureparkCdnConfiguration extends PictureparkConfiguration {
  cdnUrl: string;
}
