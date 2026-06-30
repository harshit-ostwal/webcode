import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { APP_NAME } from "../shared/constants/app.constants.js";
import swaggerConfig from "./config.js";

const options = {
  definition: swaggerConfig,

  apis: ["./src/modules/**/*.swagger.js", "./src/docs/components/*.js"],
};

const specs = swaggerJsdoc(options);

const swaggerTheme = {
  customFavIcon: "/favicon.ico",

  customSiteTitle: `${APP_NAME} API`,

  swaggerOptions: {
    layout: "BaseLayout",
    docExpansion: "none",
    persistAuthorization: true,
  },

  customCss: `
      .topbar {
        display: none !important;
      }

      body {
        background: #ffffff;
      }

      .swagger-ui {
        background: #ffffff;
      }
  `,
};

export { specs, swaggerTheme, swaggerUi };
