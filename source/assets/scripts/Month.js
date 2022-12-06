/**
 * Month.js
 * @author Steven Khaw
 * @summary File contains Month class and functions.
 *
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 4:30 PM
 */

/** Class Month */
class Month {
  /**
   * @author Steven Khaw
   * Constructs a month object from the class
   * @constructor
   *
   * @param {number} currMonthInt number of month (1-12)
   * @param {string} currMonthStr string representation of month ('January'...etc.)
   * @param {Day[]} days days of month
   */
  constructor(currMonthInt, currMonthStr, days) {
    this.currMonthInt = currMonthInt;
    this.currMonthStr = currMonthStr;
    this.days = days;
  }

  // Getters:

  /**
   * @author Steven Khaw
   * @return currMonthInt
   */
  get MonthInt() {
    return this.currMonthInt;
  }

  /**
   * @author Steven Khaw
   * @return currMonthStr
   */
  get MonthStr() {
    return this.currMonthStr;
  }

  /**
   * @author Steven Khaw
   * @return days
   */
  get Days() {
    return this.days;
  }

  /**
   * Return events and tasks of selected days
   * @param {number[]} selectedDays - hold selected days (1-31); [-1] indicate all days
   *
   * @author Yuelin Dai
   * @return {Array<Array<Event>, Array<Task>>} - array of events and array of tasks
   */
  Export(selectedDays) {
    let eventsAr = [];
    let tasksAr = [];

    if (selectedDays[0] == -1) {
      // export events of all days
      for (let curDay of this.days) {
        if (curDay != null) {
          for (let curEvent of curDay.Events) {
            // collect events
            eventsAr.push({
              startDay: curEvent.StartDay,
              endDay: curEvent.EndDay,
              eventName: curEvent.EventName,
              users: [0],
              location: curEvent.Location,
              description: curEvent.Description,
            });
          }
          for (let curTask of curDay.Tasks) {
            // collect tasks
            tasksAr.push({
              taskName: curTask.TaskName,
              tags: curTask.Tags,
              dueDate: curTask.DueDate,
              description: curTask.Description,
              complete: curTask.Complete,
              users: [0],
            });
          }
        }
      }
    } else {
      // export events of selected days
      for (let curDay of selectedDays) {
        if (this.days[curDay - 1] != null) {
          for (let curEvent of this.days[curDay - 1].Events) {
            // collect events
            eventsAr.push({
              startDay: curEvent.StartDay,
              endDay: curEvent.EndDay,
              eventName: curEvent.EventName,
              users: [0],
              location: curEvent.Location,
              description: curEvent.Description,
            });
          }
          for (let curTask of this.days[curDay - 1].Tasks) {
            // collect tasks
            tasksAr.push({
              taskName: curTask.TaskName,
              tags: curTask.Tags,
              dueDate: curTask.DueDate,
              description: curTask.Description,
              complete: curTask.Complete,
              users: [0],
            });
          }
        }
      }
    }

    return [eventsAr, tasksAr];
  }
}

try {
  module.exports = {
    Month,
  };
} catch (error) {}
