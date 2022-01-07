import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes/loginRoute";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["testing"] }));
app.use(router);

app.listen(8080, () => {
  console.log(`App is running on port 8080`);
});
