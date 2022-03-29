import * as React from "react";

import DynamicContent from "../src/components/DynamicContent";

export default function ComponentHomepage(props: any) {
  const { data } = props;

  return (
    <>
      <main>
        <DynamicContent content={data} />
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

export async function getServerSideProps() {
  const { data } = await (
    await fetch("http://localhost:1337/api/component-homepage")
  ).json();

  return { props: { data: data.content } };
}
