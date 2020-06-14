import { HttpResponse } from "../../utils";
import mockService from "../__mocks__/mockService";
import BaseController from "../BaseController";

const mockController = new BaseController(mockService, "User");
describe("BaseController", () => {
  let req;
  let res;
  beforeAll(() => {
    res = {
      json: jest.fn(),
      status: jest.fn(() => ({
        send: jest.fn(),
      })),
    };
    req = {
      params: {},
      query: {},
    };
  });
  it("should findAllRecords", async () => {
    jest.spyOn(mockService, "findAll").mockResolvedValue([]);
    jest.spyOn(HttpResponse, "sendResponse");
    await mockController.findAllRecords(req, res);
    expect(HttpResponse.sendResponse).toBeCalled();
  });

  it("should return Not found if no record__findOneRecord", async () => {
    jest.spyOn(mockService, "findOne").mockResolvedValue(null);
    jest.spyOn(HttpResponse, "sendResponse");
    req.params.id = 1;
    await mockController.findOneRecord(req, res);
    expect(HttpResponse.sendResponse).toBeCalledWith(res, false, 404, `User Not Found`);
  });

  it("should return a single record", async () => {
    jest.spyOn(mockService, "findOne").mockResolvedValue({id: 1, username: "dee"});
    jest.spyOn(HttpResponse, "sendResponse");
    req.params.id = 1;
    await mockController.findOneRecord(req, res);
    expect(HttpResponse.sendResponse).toBeCalledWith(res, true,200, null, {id: 1, username: "dee"},);
  });

  it("should return a create a single record", async () => {
    jest.spyOn(mockService, "createOne").mockResolvedValue({id: 1, username: "dee"});
    req.params.id = 1;
    await mockController.createRecord(req, res);
    expect(res.json).toBeCalled();
  });

  it("should return a delete a single record", async () => {
    jest.spyOn(mockService, "deleteOne").mockResolvedValue(true);
    req.params.id = 1;
    await mockController.deleteRecord(req, res);
    expect(res.status).toBeCalled();
  });

  it("should return a update a single record", async () => {
    jest.spyOn(mockService, "updateOne").mockResolvedValue({});
    req.params.id = 1;
    await mockController.updateRecord(req, res);
    expect(res.json).toBeCalled();
  });

});
