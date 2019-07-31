import request from "supertest";
import app from "../app";

describe("app", () => {
it("should return response from /", (done) => {
    request(app)
    .get("")
    .set("Accept", "application/json")
    .expect((res) => {
        expect(res.body).toEqual({message: "Welcome To BDIRS"});
    })
    .expect(200, done);
});

});
