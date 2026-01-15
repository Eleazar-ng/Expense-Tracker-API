
import express from "express";
import { env } from "../config/env";
import { Home } from "./home.route";

const URL = env.APP_URL

const route = express.Router();

//Home
route.use(`${URL}`, Home);

export {route as Routers}