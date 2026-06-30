import { BACKEND_URL, FRONTEND_URL } from "../config/env.config.js";
import { API_VERSION } from "../shared/constants/api.constants.js";
import { APP_NAME } from "../shared/constants/app.constants.js";
import swaggerTags from "./tags.js";

const swaggerConfig = {
  openapi: "3.0.3",

  info: {
    title: `${APP_NAME} API Documentation`,
    version: "1.0.0",
    description: `API documentation for the ${APP_NAME} application`,

    contact: {
      name: "Harshit Jain",
      email: "harshitostwal1234@gmail.com",
      url: FRONTEND_URL,
    },

    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },

    termsOfService: "https://www.example.com/terms",
  },

  servers: [
    {
      url: "http://localhost:8080/api/v1",
      description: "Development Server",
    },
    {
      url: `${BACKEND_URL}/api/${API_VERSION}`,
      description: "Production Server",
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
