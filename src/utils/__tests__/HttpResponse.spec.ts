import {HttpResponse} from "../index";

describe("HttpResponse", () => {
  let res;
  beforeAll(() => {
    res = {
      status: jest.fn(() =>({
        send: jest.fn(),
      })).mockReturnValue({send: jest.fn()}),
    };
  });
  it("should return success response", () => {
    const response = HttpResponse.sendResponse(res,
      true,undefined,undefined, {});
    expect(res.status).toBeCalledWith(200);
    expect(res.status().send).toBeCalledWith({success: true, data: {}});
  });

  it("should return error message in response", () => {
    const error = new Error('error');
    const response = HttpResponse.sendErrorResponse(res, 400, null,
      error);
    expect(res.status).toBeCalledWith(400);
    expect(res.status().send).toBeCalledWith({message: 'error', success: false});
  });
  it("should return default message if no error message", () => {
    const response = HttpResponse.sendErrorResponse(res, 400, 'error',
      'no');
    expect(res.status).toBeCalledWith(400);
    expect(res.status().send).toBeCalledWith({message: 'error', success: false});
  });
  it("should return 500 status code if not status code is provided", () => {
    const response = HttpResponse.sendErrorResponse(res, undefined, 'error',
      'no');
    expect(res.status).toBeCalledWith(500);
    expect(res.status().send).toBeCalledWith({message: 'error', success: false});
  });
});
