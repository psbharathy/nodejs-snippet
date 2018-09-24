const request = require("supertest");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");

const mongoose = require("mongoose");

describe("/api/genres", () => {
  let server;
  let customerId, movieId;
  let rental, token;
  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require("../../index");
    let customerId = mongoose.Types.ObjectId();
    let movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();
    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345"
      },
      movie: {
        _id: movieId,
        title: "Movie Titile",
        dailyRentalRate: 2
      }
    });

    await rental.save();
  });
  // Close a Server connection
  afterEach(async () => {
    await server.close();
    await Rental.remove({});
  });

  it("should return 401 if client not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if customer id is not provided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if movie id is not provided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });
});
