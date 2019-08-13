import mockService from "../__mocks__/mockService";
// tslint:disable-next-line: no-var-requires
const models = require("../../db/models");
const { User } = models;

describe("BaseService", () => {

  it("should findOne", async () => {
    const mock = {id: 1, name: "Dee"};
    jest.spyOn(User, "findOne").mockReturnValue(mock);
    const result = await mockService.findOne({where: {id: 1}});
    expect(result).toEqual(mock);
  });

  it("should findAll", async () => {
    jest.spyOn(User, "findAll").mockReturnValue([]);
    const result = await mockService.findAll();
    expect(User.findAll).toBeCalled();
    expect(result).toEqual([]);
  });

  it("should createOne", async () => {
    const mock = {id: 1, username: "Dee", email: "agge@gmail.com", password: "password"};
    jest.spyOn(User, "create").mockReturnValue({});
    const result = await mockService.createOne(mock);
    expect(User.create).toBeCalled();
    expect(result).toEqual({});
  });

  it("should deleteone", async() => {
    jest.spyOn(User, "destroy").mockReturnValue(true);
    const result = await mockService.deleteOne({where: {id: 1}});
    expect(User.destroy).toBeCalled();
    expect(result).toEqual(true);
  });

  it("should updateOne", async () => {
    jest.spyOn(User, "update").mockReturnValue({});
    const result = await mockService.updateOne({}, {where: {id: 1}});
    expect(User.update).toBeCalled();
    expect(result).toEqual({});
  });

  it("should findOrCreate", async () => {
    jest.spyOn(User, "findOrCreate").mockReturnValue([{_options: {isNewRecord: true}, dataValues: {}}]);
    const result = await mockService.findOrCreate({where: {id: 1}});
    expect(User.findOrCreate).toBeCalled();
    expect(result).toEqual({isNewRecord: true, dataValues: {}});
  });
});
