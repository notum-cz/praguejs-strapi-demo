import { IButtonsButton } from "./IButtonsButton";
import { ISharedSeo } from "./ISharedSeo";

export interface IApiSimpleHomepage {
  id: string;
  heading?: string;
  perex?: string;
  ctaButtonLeft?: IButtonsButton;
  ctaButtonRight?: IButtonsButton;
  seo?: ISharedSeo;
  createdAt?: string;
  updatedAt?: string;
}
