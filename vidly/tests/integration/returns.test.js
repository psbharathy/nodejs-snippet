const request = require("supertest");
const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");

describe("/api/genres", () => {
  let server;
  let customerId = mongoose.Types.ObjectId();
  let movieId = mongoose.Types.ObjectId();
  let rental;
  beforeEach(async () => {
    server = require("../../index");
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
    const res = await request(server)
      .post("/api/returns")
      .send({
        customerId,
        movieId
      });
    expect(res.status).toBe(401);
  });
});
