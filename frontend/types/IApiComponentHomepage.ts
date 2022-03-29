import { IPagePartsMainBanner } from "./IPagePartsMainBanner";
import { ISharedSeo } from "./ISharedSeo";

export interface IApiComponentHomepage {
  id: string;
  content?: IPagePartsMainBanner[];
  seo?: ISharedSeo;
  createdAt?: string;
  updatedAt?: string;
}
