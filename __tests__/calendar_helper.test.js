const calendar_helper = require("../source/assets/scripts/calendar_helper.js");

test("getIfLeapYear", () => {
  expect(calendar_helper.getIfLeapYear(2020)).toBe(true);
  expect(calendar_helper.getIfLeapYear(2016)).toBe(true);
  expect(calendar_helper.getIfLeapYear(2003)).toBe(false);
  expect(calendar_helper.getIfLeapYear(2007)).toBe(false);
});

test("getDaysInMonth", () => {
  expect(calendar_helper.getDaysInMonth(2020, 13)).toBe(31);
  expect(calendar_helper.getDaysInMonth(2016, 2)).toBe(29);
  expect(calendar_helper.getDaysInMonth(2020, 9)).toBe(30);
  expect(calendar_helper.getDaysInMonth(2022, 10)).toBe(31);
});

test("indexToMonth", () => {
  expect(calendar_helper.indexToMonth(10)).toBe("October");
  expect(calendar_helper.indexToMonth(11)).toBe("November");
  expect(calendar_helper.indexToMonth(8)).toBe("August");
  expect(calendar_helper.indexToMonth(7)).toBe("July");
});

test("indexToDay", () => {
  expect(calendar_helper.indexToDay(1)).toBe("Monday");
  expect(calendar_helper.indexToDay(2)).toBe("Tuesday");
  expect(calendar_helper.indexToDay(5)).toBe("Friday");
  expect(calendar_helper.indexToDay(6)).toBe("Saturday");
});

test("getWeekDayString", () => {
  expect(calendar_helper.getWeekDayString(2021, 12, 1)).toBe("Wednesday");
  expect(calendar_helper.getWeekDayString(2016, 2, 1)).toBe("Monday");
  expect(calendar_helper.getWeekDayString(2022, 11, 28)).toBe("Monday");
  expect(calendar_helper.getWeekDayString(2022, 12, 1)).toBe("Thursday");
});

test("getWeekDayIndex", () => {
  expect(calendar_helper.getWeekDayIndex(2021, 12, 1)).toBe(3);
  expect(calendar_helper.getWeekDayIndex(2016, 2, 1)).toBe(1);
  expect(calendar_helper.getWeekDayIndex(2022, 11, 28)).toBe(1);
  expect(calendar_helper.getWeekDayIndex(2022, 12, 1)).toBe(4);
});

test("getWeekCount", () => {
  expect(calendar_helper.getWeekCount(2021, 12)).toBe(5);
  expect(calendar_helper.getWeekCount(2021, 2)).toBe(5);
  expect(calendar_helper.getWeekCount(2014, 2)).toBe(5);
  expect(calendar_helper.getWeekCount(2022, 12)).toBe(5);
});

test("getCurrentDay", () => {
  let today = new Date();
  expect(calendar_helper.getCurrentDay()).toStrictEqual([
    `${today.getFullYear()}`,
    `${today.getMonth() + 1}`,
    `${today.getDate()}`,
  ]);
});
