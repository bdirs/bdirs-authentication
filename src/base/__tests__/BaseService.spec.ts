import { User } from "../../db/models/user";
import mockService from "../__mocks__/mockService";
import { db } from "../../db/models";

const mock = {id: 1, username: "Dee", password: "passwird", email: "email", role: "user"};
describe("BaseService", () => {
  afterAll(async () => {
    await User.destroy({where: {}});
    Promise.resolve();
  });

  beforeAll(async () => {
    await User.destroy({where: {}});
   });
  it("should findOne", async () => {
    jest.spyOn(User, "findOne");
    const result = await mockService.findOne({where: {id: 1}});
    expect(User.findOne).toHaveBeenCalled();
  });

  it("should findAll", async () => {
    jest.spyOn(User, "findAll").mockResolvedValue([]);
    const result = await mockService.findAll({});
    expect(User.findAll).toBeCalled();
    expect(result).toEqual([]);
  });

  it("should createOne", async () => {
    const mock = {id: 1, username: "username", email: "agge@gmail.com", password: "password", role: "user"};
    jest.spyOn(User, "create");
    const result = await mockService.createOne(mock);
    expect(User.create).toBeCalled();
  });

  it("should deleteone", async () => {
    jest.spyOn(User, "destroy").mockResolvedValue(1);
    const result = await mockService.deleteOne({where: {id: 1}});
    expect(User.destroy).toBeCalled();
    expect(result).toEqual(1);
  });

  it("should updateOne", async () => {
    jest.spyOn(User, "update");
    await mockService.updateOne({}, {where: {id: 1}});
    expect(User.update).toBeCalled();
  });

  it("should findOrCreate", async () => {
     const options = {
      defaults: {
        email: "aggrey2@gmail.com",
        password: "password",
        role: "admin",
        username: "username"
      },
      where: {
        email: "aggrey2@gmail.com",
        username: "username",
        },
    };
     jest.spyOn(User, "findOrCreate").mockResolvedValue([{_options: {isNewRecord: true},
      dataValues: {...mock}}] as any);
     await mockService.findOrCreate(options);
     expect(User.findOrCreate).toBeCalled();
  });
});
