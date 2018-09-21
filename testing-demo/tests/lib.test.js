const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it(" should return a +number if input is +", () => {
    //
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it("absolute - should return a -negative if input is -", () => {
    //
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("absolute - should return 0 if input is negtaive", () => {
    //
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("gree", () => {
  it("should retrun greeting message", () => {
    const result = lib.greet("PS Bharathy");
    expect(result).toMatch(/Bharathy/);
    expect(result).toContain("Bharathy");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    // Too genral
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // Too Specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    // Propoer way
    expect(result).toContain("USD");

    //Ideal way
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return the product with given id", () => {
    const result = lib.getProduct(1);
    // exact properties in org obj
    expect(result).toEqual({ id: 1, price: 10 });
    // only checks for specifed properites
    expect(result).toMatchObject({ id: 1, price: 10 });
    //
    expect(result).toHaveProperty("id", 1);
  });
});

describe("resgisterUser", () => {
  it("should thorw if username is falsy", () => {
    // falsy values in JS  NULL, Undefiend, Nan, '', 0 and false
    expect(() => {
      lib.registerUser(null);
    }).toThrow();

    // alternative approach for paramterized test
    // what is single assertion principle
    const args = [null, undefined, NaN, "", false];
    args.forEach(a => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  // Happy Path
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("bharathy");
    expect(result).toMatchObject({ username: "bharathy" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function(customerId) {
      console.log("Fake Reading Customer...");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = function(customerId) {
      return { email: "a" };
    };
    let mailSent = false;
    mail.send = function(email, messgae) {
      mailSent = true;
    };
    lib.notifyCustomer({ customerId: 1 });
    expect(mailSent).toBe(true);
  });
});
