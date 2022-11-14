import express, { Express, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import noteBookRouter from "./routes/notebook";

const app: Express = express();
const port = 1111;

const corsOptions: CorsOptions = {
  origin: ["127.0.0.1", "localhost", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE", "HEAD"],
  allowedHeaders: [
    "AccessToken",
    "RefreshToken",
    "authorization",
    "X-Requested-With",
    "content-type",
    "sentry-trace",
    "Accept",
    "Referer",
    "User-Agent",
  ],
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.set("trust proxy", 1);

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/notebook", noteBookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  mongoose.connect(
    `mongodb+srv://Igor:somepassword1999@main.2p6yd.mongodb.net/TestPythonTask?retryWrites=true&w=majority`,
    () => console.log("DB connected")
  );
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
