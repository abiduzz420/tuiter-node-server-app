import "dotenv/config";
import express from 'express';
import HelloController from "./controllers/hello-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import UserController from "./users/users-controller.js";
import session from "express-session";
import AuthController
 from './users/auth-controller.js';
import cors from 'cors'
import mongoose from "mongoose";

const app = express()

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    }
));

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}


app.use(express.json());

TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);
console.log("Server running");
