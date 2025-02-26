import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import openapiDocument from "../../openapi.json";
const swaggerRouter = Router();

swaggerRouter.use("/api-docs", swaggerUi.serve);
swaggerRouter.get(
  "/api-docs",
  swaggerUi.setup(openapiDocument, {
    explorer: true,
  })
);

export default swaggerRouter;
