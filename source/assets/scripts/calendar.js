/**
 * Calendar.js
 * @author Steven Khaw
 * @summary File contains Calendar class and functions.
 *
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 4:30 PM
 */

/** Class Calendar */
class Calendar {
  /**
   * @author Steven Khaw
   * Constructs a calendar object from the class
   * @constructor
   *
   * @param {string} lastUpdated last updated date; format: "MM-DD-YY"
   * @param {string} title title of calendar
   * @param {string} calendarID unique ID for calendar
   * @param {Year[]} years years in calendar
   * @param {String[]} users users able to access calendar; format: "Firstname Lastname"
   */
  constructor(title, lastUpdated, calendarID, years, users) {
    this.title = title;
    this.lastUpdated = lastUpdated;
    this.calendarID = calendarID;
    this.years = years;
    this.users = users;
  }

  // Getters:

  /**
   * @author Steven Khaw
   * @return lastUpdated
   */
  get LastUpdated() {
    return this.lastUpdated;
  }

  /**
   * @author Steven Khaw
   * @return title
   */
  get Title() {
    return this.title;
  }

  /**
   * @author Steven Khaw
   * @return calendarID
   */
  get CalendarID() {
    return this.calendarID;
  }

  /**
   * @author Steven Khaw
   * @return years
   */
  get Years() {
    return this.years;
  }

  /**
   * @author Steven Khaw
   * @return users
   */
  get Users() {
    return this.users;
  }

  /**
   * Export data of users and selected years, months, days to a json
   * @param {number[]} selectedYears - hold selected years (2000-3000); [-1] indicate all years
   * @param {number[]} selectedMonths - hold selected months (1-12); [-1] indicate all months
   * @param {number[]} selectedDays - hold selected days (1-31); [-1] indicate all days
   *
   * @author Yuelin Dai
   * @return a json string containing data
   */
  Export(selectedYears, selectedMonths, selectedDays) {
    let eventsAr = [];
    let tasksAr = [];

    if (selectedYears[0] == -1) {
      // export events of all years
      for (let curYear of this.years) {
        if (curYear != null) {
          let [childEvents, childTasks] = curYear.Export(
            selectedMonths,
            selectedDays
          );
          eventsAr = eventsAr.concat(childEvents);
          tasksAr = tasksAr.concat(childTasks);
        }
      }
    } else {
      // export events of selected years
      for (let curYear of selectedYears) {
        if (this.years[curYear - 2000] != null) {
          let [childEvents, childTasks] = this.years[curYear - 2000].Export(
            selectedMonths,
            selectedDays
          );
          eventsAr = eventsAr.concat(childEvents);
          tasksAr = tasksAr.concat(childTasks);
        }
      }
    }

    return JSON.stringify({
      lastUpdated: this.LastUpdated,
      title: this.Title,
      calendarID: this.CalendarID,
      usersList: this.Users,
      eventsList: eventsAr,
      tasksList: tasksAr,
    });
  }

  /**
   * @author Yuelin Dai
   *
   * Populate calendar view with days, events and tasks of inputted month
   * @param {number} year - year number
   * @param {number} month - month number (1 - 12)
   */
  Show(year, month) {
    const dayBlockAr = document.getElementsByClassName("calendar-day-block");

    // check week day of this month's first day
    //const startDayIndex = getWeekDayIndex(year, month, 1);
    const startDayIndex = new Date(
      String(month) + " " + String(1) + ", " + String(year)
    ).getDay();

    // get total days of this month
    //const daysInMonth = daysInMonth(year, month);
    const daysInMonth = new Date(year, month, 0).getDate();

    // fill in dates, events and tasks
    for (let blockCnt = 0; blockCnt < dayBlockAr.length; blockCnt++) {
      // clear previous data

      if (
        blockCnt >= startDayIndex + daysInMonth || // no display after end of month
        blockCnt < startDayIndex
      ) {
        // no display before start of month
        continue;
      }

      dayBlockAr[blockCnt].innerHTML = "";

      // fill in dates
      dayBlockAr[blockCnt].innerHTML +=
        '<p class="date-block">' + (blockCnt - startDayIndex + 1) + "</p>";

      // no display for empty month
      if (
        this.years[year - 2000] == null ||
        this.years[year - 2000].months[month - 1] == null
      )
        continue;

      // get current Day from calendar, fill it with events and tasks
      const curDay =
        this.years[year - 2000].months[month - 1].days[
          blockCnt - startDayIndex
        ];
      if (curDay != null) {
        let fillCnt = 0; // # of events/tasks filled
        let extraCnt = 0; // # of events/tasks hidden in "+n extra"

        // fill in events
        for (let curEvent of curDay.events) {
          // skip filling if too many have been filled
          if (++fillCnt > 3) {
            extraCnt++;
            continue;
          }

          // fill in event
          dayBlockAr[blockCnt].innerHTML +=
            '<div class="event-block">' + curEvent.EventName + "</div>";
        }

        // fill in tasks
        for (let curTask of curDay.tasks) {
          // skip filling if too many have been filled
          if (++fillCnt > 3) {
            extraCnt++;
            continue;
          }

          // fill in task
          dayBlockAr[blockCnt].innerHTML +=
            '<div class="task-block">' + curTask.TaskName + "</div>";
        }

        // if there are skips, display them as "+n extra"
        if (extraCnt > 0) {
          dayBlockAr[blockCnt].innerHTML +=
            '<div class="extra-block">' +
            "+" +
            String(extraCnt) +
            " extra" +
            "</div>";
        }
      }
    }
  }
}
