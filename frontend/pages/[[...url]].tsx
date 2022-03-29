import * as React from "react";
import DynamicContent from "../src/components/DynamicContent";

export default function URLMatcher(props: any) {
  const { data } = props;

  if (!data) {
    return <div>missing content</div>;
  }

  return (
    <>
      <main>
        <DynamicContent content={data.content} />
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const {
    params: { url },
  } = ctx;

  const constructedUrl = url ? url.join("/") : "/";

  const { data } = await (
    await fetch(
      `http://localhost:1337/api/pages?filters[url][$eq]=${constructedUrl}`
    )
  ).json();

  return { props: { data: data[0] } };
}
