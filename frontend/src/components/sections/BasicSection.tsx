/* @ts-ignore */

import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { IPagePartsMainBanner } from "../../../types/IPagePartsMainBanner";
import DynamicContent from "../DynamicContent";

export function BasicSection(props: any) {
  const { component } = props;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <div id={component.htmlId}>
        {component.content && <DynamicContent content={component.content} />}
      </div>
    </Box>
  );
}
