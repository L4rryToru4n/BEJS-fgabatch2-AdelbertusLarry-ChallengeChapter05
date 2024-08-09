// https://jestjs.io/docs/asynchronous
// https://codewithhugo.com/express-request-response-mocking/

const users = require('../controllers/users.controller');
const auth = require('../controllers/auth.controller');
const mockRequest = (cookies = { access_token: null }, body = {}) => ({
  cookies, body
})
const mockRequestParams = (cookies = { access_token: null }, params = { id: null }) => ({
  cookies, params
})

const mockRequestParamsFail = (cookies = { access_token: null }, params = { id: null }) => ({
  cookies, params
})

const mockRequestUpdate = (cookies = { access_token: null }, params = { id: null }, body = {}) => ({
  cookies, params, body
})

const mockRequestUpdateFail = (cookies = { access_token: null }, params = { id: null }, body = {}) => ({
  cookies, params, body
})

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res
}

let access_token = null;

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
    access_token = res.json.token;
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


describe('getUsers function', () => {
  expect.assertions(2);
  test('returning status code 200 with an array of user data', async () => {

    const req = mockRequest();
    req.cookies.access_token = access_token;
    
    const res = mockResponse();

    
    await users.getUsers(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: true,
      data: [
        {
          id: "1n",
          name: "John Doe",
          email: "john.doe@example.com"
        },
        {
          id: "2n",
          name: "User Test 02",
          email: "user.test02@example.com"
        }
      ]
    });
  });

  test('returning status code 404 with a fail message', async () => {

    const req = mockRequest();
    req.cookies.access_token = access_token;

    const res = mockResponse();

    await users.getUsers(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "Failed to get users."
    });
  });
});

describe('getUser function', () => {
  expect.assertions(2);
  test('returning status code 200 with an object of user data', async () => {
  
    const req = mockRequestParams();
    req.cookies.access_token = access_token;
    req.params.id = "1";

    const res = mockResponse();

    await users.getUser(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: true,
      data: {
        id: "1n",
        name: "John Doe",
        email: "john.doe@example.com"
      }
    });
  });

  test('returning status code 404 with a fail message', async () => {

    const req = mockRequestParams();
    req.cookies.access_token = access_token;
    req.params.id = "0";

    const res = mockResponse();

    await users.getUser(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "No user has been found."
    });
  });
});

describe('createUser function', () => {
  expect.assertions(2);
  test('returning status code 201 with creation of a user data', async () => {

    const req = mockRequestParams();
    req.cookies.access_token = access_token;
    req.body = {
      name: "User Test 01",
      email: "user.test01@example.com",
      password: "password123"
    };

    const res = mockResponse();

    await users.createUser(req, res);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toHaveProperty("status", true);
    expect(res.json).toHaveProperty("data.id");
    expect(res.json).toHaveProperty("data.name");
    expect(res.json).toHaveProperty("data.email");

    // ENHANCEMENT PLAN: Check if password value is a type of BCrypt Hash
    expect(res.json).toHaveProperty("data.password");

    expect(res.json).toHaveProperty("data.isDeleted", false);
  });

  test('returning status code 404 with a fail message', async () => {

    const req = mockRequestParams();
    req.cookies.access_token = access_token;
    req.body = {};

    const res = mockResponse();

    await users.createUser(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "Create user failed. Please complete your data request."
    });
  });
});

describe('updateUser function', () => {
  expect.assertions(2);
  test('returning status code 200 with an update of a user data', async () => {

    const req = mockRequestUpdate();
    req.cookies.access_token = access_token;
    req.params.id = "2";
    req.body = {
      name: "User Test Number One",
      email: "user.test01@example.com",
      password: "password123"
    };

    const res = mockResponse();

    await users.updateUser(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        status: true,
        data: {
          id: "2n",
          name: "User Test Number One",
          email: "user.test01@example.com",
          password: expect.any(String),
          googleId: null,
          isDeleted: false,
        }
      })
    );
  });

  test('returning status code 404 with a fail message', async () => {

    const req = mockRequestUpdateFail();
    req.cookies.access_token = access_token;
    req.params.id = "0";
    req.body = {
      name: "User Test Number One",
      email: "user.test01@example.com",
      password: "password123"
    };

    const res = mockResponse();

    await users.updateUser(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "No such user has been found."
    });
  });
});

describe('deleteUser function', () => {
  expect.assertions(1);
  test('returning status code 200 with a deletion of a user data', async () => {

    const req = mockRequestParams();
    req.cookies.access_token = access_token;
    req.params.id = "2";

    const res = mockResponse();

    await users.deleteUser(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        status: true,
        data: {
          id: "2n",
          name: "User Test Number One",
          email: "user.test01@example.com",
          password: expect.any(String),
          googleId: null,
          isDeleted: true,
        }
      })
    );
  });

  test('returning status code 404 with a fail message', async () => {

    const req = mockRequestParamsFail();
    req.params.id = "0"
    const res = mockResponse();

    await users.deleteUser(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "No such user has been found."
    });
  });
});