const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Yanji Social Swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: `/api/v1/`,
      },
    ],
  },
  apis: ["./src/app/swagger/*.yaml"],
};

module.exports = swaggerConfig;
