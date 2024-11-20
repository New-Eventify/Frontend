// server/swagger.ts
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Management API",
      version: "1.0.0",
      description: "API documentation for the Event Management Application",
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your API base URL
      },
    ],
  },
  apis: ["./routes/*.ts"], // Path to your API routes
};

export const swaggerSpec = swaggerJsDoc(options);

