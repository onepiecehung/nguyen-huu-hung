import cors from "cors";
import express from "express";

import { AppDataSource } from "./database/data-source";
import { seedData } from "./database/seed";
import userRoutes from "./routes/user.routes";
import swaggerRouter from "./util/swagger/swagger";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(swaggerRouter);

// Initialize TypeORM
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
    await seedData();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use("/api/users", userRoutes);

// Error handling
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500).json({ error: err.message });
  }
);

export default app;
