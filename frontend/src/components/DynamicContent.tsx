import { Fragment } from "react";
import { MainBanner } from "./pp/MainBanner";

const mapContentToComponents = {
  "page-parts.main-banner": MainBanner,
};

interface DynamicContentProps {
  content: StrapiComponent[];
}

export type StrapiComponent = {
  __component: keyof typeof mapContentToComponents;
};

const DynamicContent = ({ content }: DynamicContentProps) => (
  <Fragment>
    {Object.values(content).map((item) => {
      const { __component: component } = item;

      const Content: any =
        mapContentToComponents[
          component as keyof typeof mapContentToComponents
        ];

      return Content ? (
        <Content key={component} component={item as any} />
      ) : (
        <div>{item.__component} not found.</div>
      );
    })}
  </Fragment>
);
export default DynamicContent;
