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

      {/* Footer */}
      {/* <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Something here to give the footer a purpose!
            </Typography>
            <Copyright />
          </Box> */}
      {/* End footer */}
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
