import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config/postgress.js";
import router from "./app/routes/PostRoutes.js";

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: err.message + "error de conexion",
  });
});

app.listen(PORT, () => {
  console.log(`The show must go on http://localhost:${PORT} `);
});