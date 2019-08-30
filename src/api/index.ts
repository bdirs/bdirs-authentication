//Will contain exports for routers
import userRouters from './users';

const apiV = '/api/v1';
const routes = (app): any => {
  app.use(`${apiV}/auth`, userRouters);
};

export default routes;

