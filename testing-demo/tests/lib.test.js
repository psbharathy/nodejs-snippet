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
