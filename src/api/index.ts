// Will contain exports for routers
import express from "express";
import userRouters from "./users";

const apiV = "/api/v1";
const routes = (app: express.Application): any => {
  app.use(`${apiV}/auth`, userRouters);
};

export default routes;
