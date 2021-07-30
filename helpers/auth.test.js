const auth = require('./auth')
// const passport = require("passport");

// jest.mock("passport", () => {
//   const authenticate = jest.requireActual("passport");
// });

describe('Unit testing auth', () => {
  let req, res, next
  req = {
    headers: {
      authorization: null,
    },
  }
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  }
  next = jest.fn()

  test('no token in Authorization', async () => {
    const result = await auth(req, res, next)
    console.log(result)
  })
})
