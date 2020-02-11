// tslint:disable-next-line: no-var-requires
import { User } from "../../db/models/user";
import { IUser } from "../../services/user-service";
import BaseService from "../BaseService";

class MockService extends BaseService<IUser> {
  constructor() {
    super(User);
  }
}
const mockService = new MockService();

export default mockService;
