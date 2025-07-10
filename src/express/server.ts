import express from "express";
import http from "http";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { once } from "events";
import { config } from "../config/config";
import { loggerMiddleware } from "../utils/logger/middleware";
import { errorMiddleware } from "../utils/express/error";
import { appRouter } from "./router";

export class Server {
  private app: express.Application;
  private http: http.Server;

  constructor(private port: number) {
    this.app = Server.createExpressApp();
  }

  static createExpressApp() {
    const app = express();

    // הגדרות בסיסיות
    app.use(helmet());
    app.use(cookieParser());
    app.use(express.json({ limit: config.service.maxFileSize }));
    app.use(
      express.urlencoded({ extended: true, limit: config.service.maxFileSize })
    );

    // לוגים
    app.use(loggerMiddleware);

    // קונפיגורציית CORS
    app.use(
      cors({
        origin: ["http://localhost:5173", "http://localhost:8000"],
        credentials: true,
      })
    );

    // ראוטרים
    app.use(appRouter);

    // טיפול בשגיאות
    app.use(errorMiddleware);

    return app;
  }

  async start() {
    this.http = this.app.listen(this.port);
    await once(this.http, "listening");
  }
}
// init
