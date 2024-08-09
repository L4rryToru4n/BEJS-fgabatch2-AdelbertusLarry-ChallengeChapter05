const auth = require('../controllers/auth.controller');
const mockRequest = (body = {}) => ({ body })
const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res
}

describe('authenticate function', () => {
  expect.assertions(2);
  test('returning status code 200 with a success message and a token', async () => {

    const req = mockRequest();
    req.body = {
      email: "john.doe@example.com",
      password: "password123"
    }
    const res = mockResponse();

    await auth.authenticate(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toHaveProperty("status", true);
    expect(res.json).toHaveProperty("message", "Login successful !");
    expect(res.json).toHaveProperty("token");
  });

  test('returning status code 404 with a fail message', async () => {

    const req = mockRequest();
    req.body = {
      email: "john.doe@example.com",
      password: "password"
    };
    const res = mockResponse();

    await auth.authenticate(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "Login failed. Email or password doesn't match."
    });
  });
});