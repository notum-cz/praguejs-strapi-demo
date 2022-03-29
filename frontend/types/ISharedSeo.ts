import { IPluginUploadFile } from "./IPluginUploadFile";
import { ISharedMetaSocial } from "./ISharedMetaSocial";

export interface ISharedSeo {
  id: string;
  __component?: string;
  metaTitle: string;
  metaDescription: string;
  metaImage: IPluginUploadFile;
  metaSocial?: ISharedMetaSocial[];
  keywords?: string;
  metaRobots?: string;
  structuredData?: { [key: string]: any };
  metaViewport?: string;
  canonicalURL?: string;
}
