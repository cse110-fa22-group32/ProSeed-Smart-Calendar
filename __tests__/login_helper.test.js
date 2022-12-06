const {
  isEmail,
  isStrongPassword,
} = require("../source/assets/scripts/login_helper.js");

test("isEmail", () => {
  expect(isEmail("adex@aa.com")).toBe(true);
  expect(isEmail("adex@ucsd.edu")).toBe(true);
  expect(isEmail("adex@ucsd.eduedu")).toBe(false);
  expect(isEmail("adex#aa.com")).toBe(false);
});

test("isStrongPassword", () => {
  expect(isStrongPassword("aa123")).toBe(true);
  expect(isStrongPassword("CSE110")).toBe(true);
  expect(isStrongPassword("20221205")).toBe(false);
  expect(isStrongPassword("__123___")).toBe(false);
});
