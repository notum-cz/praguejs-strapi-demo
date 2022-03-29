interface IFormat {
  ext?: string;
  url: string;
  hash: string;
  mime: string;
  name?: string;
  path?: string;
  size: number;
  width?: number;
  height?: number;
}

interface IFormats {
  large?: IFormat;
  medium?: IFormat;
  small?: IFormat;
  thumbnail?: IFormat;
}

export interface IPluginUploadFile {
  id: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: IFormats;
  hash: string;
  ext?: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: { [key: string]: any };
  createdAt?: string;
  updatedAt?: string;
}
