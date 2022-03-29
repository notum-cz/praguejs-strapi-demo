import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";

import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import edjsHTML from "editorjs-html";

const edjsParser = edjsHTML();

export default function SimpleHomepage(props: any) {
  const { data } = props;

  return (
    <>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {data.heading}
            </Typography>

            <div
              dangerouslySetInnerHTML={{
                __html: edjsParser.parse(JSON.parse(data.perex)),
              }}
            ></div>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant={data.ctaButtonLeft.type}>
                {data.ctaButtonLeft.text}
              </Button>
              <Button variant={data.ctaButtonRight.type}>
                {data.ctaButtonRight.text}
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await (
    await fetch("http://localhost:1337/api/simple-homepage")
  ).json();

  return { props: { data } };
}
