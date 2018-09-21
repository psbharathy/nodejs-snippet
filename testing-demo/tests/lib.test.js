const lib = require("../lib");

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