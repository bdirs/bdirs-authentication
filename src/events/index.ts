import app from "../app";
import { events } from "./events-constants";
import {
  newAdminRegisteredHandler,
} from "./handlers";

export const registerEvents = (): void => {
app.on(events.NEW_ADD_ADMIN_REGISTRATION_EMAIL,
  (data: any) => newAdminRegisteredHandler(data));
};

export const broadcastEvent = (eventName: string, args?: any): void => {
  app.emit(eventName, args);
};

export default registerEvents;
