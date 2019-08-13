// tslint:disable-next-line: no-var-requires
const models = require("../../db/models");
import BaseService from "../BaseService";
const { User } = models;

class MockService extends BaseService<any> {
  constructor() {
    super(User);
  }
}
const mockService = new MockService();

export default mockService;
