/**
 * Day.js
 * @author Steven Khaw
 * @summary File contains Day class and functions.
 *
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 4:30 PM
 */

/** Class Day */
class Day {
  /**
   * @author Steven Khaw
   * Constructs a day object from the class
   * @constructor
   *
   * @param {number} currDayInt number of day (1-31)
   * @param {string} currDayStr string representation of day ('Monday'...etc.)
   * @param {Event[]} events events of day
   * @param {Task[]} tasks tasks of day
   */
  constructor(currDayInt, currDayStr, events, tasks) {
    this.currDayInt = currDayInt;
    this.currDayStr = currDayStr;
    this.events = events;
    this.tasks = tasks;
  }

  // Getters:

  /**
   * @author Steven Khaw
   * @return currDayInt
   */
  get DayInt() {
    return this.currDayInt;
  }

  /**
   * @author Steven Khaw
   * @return currDayStr
   */
  get DayStr() {
    return this.currDayStr;
  }

  /**
   * @author Steven Khaw
   * @return events
   */
  get Events() {
    return this.events;
  }

  /**
   * @author Steven Khaw
   * @return tasks
   */
  get Tasks() {
    return this.tasks;
  }
}

try {
  module.exports = {
    Day,
  };
} catch (error) {}
