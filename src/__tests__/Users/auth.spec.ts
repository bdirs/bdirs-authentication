import {
  App,
  createUser,
  deleteAllUserRecords
} from '../../common';

describe("Users", () => {
  const loginUrl = "/api/v1/auth/login";
  beforeEach(async () => {
    await deleteAllUserRecords();
    await createUser({
      username: "googlemilly",
      email: "google@gmail.com",
      password: "@krs1Krs1",
    });
  });


  it("should not login user if they don't exist in the system", async() => {
    const res = await App.post(loginUrl).send({
      username: "go_emilly",
      password: "@krs1Krs1",
    });
    expect(res.status).toEqual(400);
  });

  it("should login successfully", async() => {
    const res = await App.post(loginUrl).send({
      username: "googlemilly",
      password: "@krs1Krs1",
    });
    console.log('??????',res);
  });
});
