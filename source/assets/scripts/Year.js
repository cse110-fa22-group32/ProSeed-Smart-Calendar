/**
 * Year.js
 * @author Steven Khaw
 * @summary File contains Year class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 4:30 PM
 */

/** Class Year */
class Year {

  /**
   * @author Steven Khaw
   * Constructs a year object from the class
   * @constructor 
   * 
   * @param {number} currYear year of Year (2022)
   * @param {boolean} isLeapYear boolean on if leap year
   * @param {Month[]} months months of year 
   */
  constructor(currYear, months) {
    this.currYear = currYear;
    this.isLeapYear = ((0 === this.currYear % 4) && (0 !== this.currYear % 100) || (0 === this.currYear % 400));
    this.months = months;
  }

  // Getters:

  /**
   * @author Steven Khaw
   * @return currYear
   */
  get Year() {
    return this.currYear;
  }

  /**
   * @author Steven Khaw
   * @return isLeapYear
   */
  get LeapYear() {
    return this.isLeapYear;
  }

  /**
   * @author Steven Khaw
   * @return months
   */
  get Months() {
    return this.months;
  }

  /**
   * Return events and tasks of selected months, days
   * @param {number[]} selectedMonths - hold selected months (1-12); [-1] indicate all months
   * @param {number[]} selectedDays - hold selected days (1-31); [-1] indicate all days
   * 
   * @author Yuelin Dai
   * @return {[Event[], Task[]]} - array of events and array of tasks
   */
  Export(selectedMonths, selectedDays) {
    let eventsAr = [];
    let tasksAr = [];

    if(selectedMonths[0] == -1) { // export events of all months
      for(let curMonth of this.months) {
        if(curMonth != null) {
          let [childEvents, childTasks] = curMonth.Export(selectedDays);
          eventsAr = eventsAr.concat(childEvents);
          tasksAr = tasksAr.concat(childTasks);
        }
      }
    }
    else { // export events of selected months
      for(let curMonth of selectedMonths) {
        if(this.months[curMonth-1] != null) {
          let [childEvents, childTasks] = this.months[curMonth-1].Export(selectedDays);
          eventsAr = eventsAr.concat(childEvents);
          tasksAr = tasksAr.concat(childTasks);
        }
      }
    }
    
    return [eventsAr, tasksAr];
  }

}