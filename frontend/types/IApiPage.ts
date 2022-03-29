import { IPagePartsMainBanner } from "./IPagePartsMainBanner";
import { ISharedSeo } from "./ISharedSeo";

export interface IApiPage {
  id: string;
  content?: IPagePartsMainBanner[];
  seo?: ISharedSeo;
  pageName?: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
}
