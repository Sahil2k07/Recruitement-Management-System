import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import jobRouter from "./routes/job.routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

const PORT = Number(process.env.PORT) || 3000;

app.use(userRouter);
app.use(adminRouter);
app.use(jobRouter);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
