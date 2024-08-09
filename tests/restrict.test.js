const users = require('../controllers/users.controller');
const mockRequest = (cookies = { access_token: null }) => ({ cookies });
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res
}

describe('restrict function', () => {
  expect.assertions(3);
  test('returning status code 401 with a fail message', async () => {

    const req = mockRequest();
    const res = mockResponse();

    await users.getUsers(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "Token is required, please log in first."
    });
  });

  test('returning status code 401 with a fail message', async () => {

    const req = mockRequest();
    req.cookies.access_token = "notavalidjwt";
    const res = mockResponse();

    await users.getUsers(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "Invalid token, Authorization denied."
    });
  });
});