//
const lib = require("../lib");
test("absolute - should return a +number if input is +", () => {
  //
  const result = lib.absolute(1);
  expect(result).toBe(1);
});

test("absolute - should return a -negative if input is -", () => {
  //
  const result = lib.absolute(-1);
  expect(result).toBe(1);
});

test("absolute - should return 0 if input is negtaive", () => {
  //
  const result = lib.absolute(0);
  expect(result).toBe(1);
});
