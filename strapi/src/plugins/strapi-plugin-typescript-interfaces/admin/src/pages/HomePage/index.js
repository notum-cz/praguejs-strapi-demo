/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";

import { BaseHeaderLayout } from "@strapi/design-system/Layout";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Link } from "@strapi/design-system/Link";
import ArrowLeft from "@strapi/icons/ArrowLeft";
import { useNotification, useAppInfos } from "@strapi/helper-plugin";
import request1 from "../../fetch";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toggleNotification = useNotification();

  const generateInterfaces = async () => {
    setIsLoading(true);

    try {
      const response = await request1("/typescript-interfaces", {
        headers: {
          "Content-Type": "application/zip",
        },
      });

      var blob = new Blob([response], { type: "application/zip" });
      var objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.setAttribute("download", "typescript-interfaces" || "file");
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      console.log(e.response);
      toggleNotification({
        type: "warning",
        message: e.response,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Box background="neutral100">
        <BaseHeaderLayout
          navigationAction={
            <Link startIcon={<ArrowLeft />} to="/">
              Go back
            </Link>
          }
          primaryAction={
            <Button loading={isLoading} onClick={generateInterfaces}>
              Generate interfaces
            </Button>
          }
          title="Typescript Interface Generator"
          as="h2"
        />
      </Box>
    </div>
  );
};

export default memo(HomePage);
