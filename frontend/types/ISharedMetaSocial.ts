import { IPluginUploadFile } from "./IPluginUploadFile";

export interface ISharedMetaSocial {
  id: string;
  __component?: string;
  socialNetwork: "Facebook" | "Twitter";
  title: string;
  description: string;
  image?: IPluginUploadFile;
}
