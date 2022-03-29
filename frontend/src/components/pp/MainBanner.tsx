import { Box, Container, Typography, Stack, Button } from "@mui/material";
import edjsHTML from "editorjs-html";
import { IPagePartsMainBanner } from "../../../types/IPagePartsMainBanner";

const edjsParser = edjsHTML();

interface MainBannerProps {
  component: IPagePartsMainBanner;
}

export function MainBanner(props: MainBannerProps) {
  const { component } = props;

  return (
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
          {component.claim}
        </Typography>
        {component.perex && (
          <div
            dangerouslySetInnerHTML={{
              __html: edjsParser.parse(JSON.parse(component.perex)),
            }}
          ></div>
        )}
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          {component.buttons?.map((btn: any) => (
            <Button key={btn.text} variant={btn.type}>
              {btn.text}
            </Button>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
