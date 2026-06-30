import { API_VERSION } from "../shared/constants/api.constants.js";
import { APP_NAME } from "../shared/constants/app.constants.js";
import { BACKEND_URL } from "../config/env.config.js";
import swaggerTags from "./tags.js";

const swaggerConfig = {
  openapi: "3.0.3",

  info: {
    title: `${APP_NAME} API Documentation`,
    version: "1.0.0",
    description: `API documentation for the ${APP_NAME} application`,

    contact: {
      name: "API Support",
      email: "support@example.com",
      url: "https://www.example.com/support",
    },

    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },

    termsOfService: "https://www.example.com/terms",
  },

  servers: [
    {
      url: `${BACKEND_URL}/api/${API_VERSION}`,
      description: "Development Server",
    },
  ],

  tags: swaggerTags,

  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {},
  },

  security: [
    {
      BearerAuth: [],
    },
  ],
};

export default swaggerConfig;
