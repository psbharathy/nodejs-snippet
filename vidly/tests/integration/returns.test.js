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
    server.close();
    await Rental.remove({});
  });
  it("should works!", async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });
});
