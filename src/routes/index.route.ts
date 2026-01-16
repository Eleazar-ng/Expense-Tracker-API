
import express from "express";
import { env } from "../config/env";
import { Home } from "./home.route";
import { Auth } from "./auth/index.route";

const URL = env.APP_URL

const route = express.Router();

//Home
route.use(`${URL}`, Home);

//Auth
route.use(`${URL}/auth`, Auth);

export {route as Routers}