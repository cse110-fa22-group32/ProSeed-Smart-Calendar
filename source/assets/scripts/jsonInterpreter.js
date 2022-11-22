/**
 * JsonInterpreter.js
 * @author Yuelin Dai
 * @summary File contains JSON interpreter.
 * 
 * Created at : 2022-11-17 6:30 AM
 * Last Modified : 2022-11-17 6:30 AM
 */


/*
 * Get the corresponding string of a day 
 * @param {number} ind - order number of the day (1 - 7)
 * @return corresponding string of the day

function getDayStr(ind) {
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][ind - 1];
}
 */

/*
 * Get the corresponding string of a month 
 * @param {number} ind - order number of the month (1 - 12)
 * @return corresponding string of the month
 
function getMonthStr(ind) {
  return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][ind - 1];
}
 */

/**
 * Convert multiple json strings to a single calendar and a user array
 * @param {String[]} jsonStrAr Include multiple json strings that contains users, events, tasks
 * 
 * @author Yuelin Dai
 * @return an array containing the calendar and user array
 */
function loadJson(jsonStrAr) {

  // load all userS
  let userList = {}; // used to store all user data
  let userNames = new Set([]); // used to init calendar

  for (let jsonStr of jsonStrAr) { // traverse each json to collect all users
    let jsonObj = JSON.parse(jsonStr);

    for (let jsonUser of jsonObj.usersList) {
      let curUser = new User(jsonUser.firstName, jsonUser.lastName, jsonUser.username, jsonUser.password, jsonUser.profileID, jsonUser.calendarID);
      userList[jsonUser.firstName + " " + jsonUser.lastName] = curUser; // used to store all user data
      userNames.add(jsonUser.firstName + " " + jsonUser.lastName); // used to init calendar
    }

  }

  // store Event/Task by their startDay(excluding clocktime)
  let dateDict = {};
  for (let jsonStr of jsonStrAr) { // traverse each json to collect all events/tasks
    let jsonObj = JSON.parse(jsonStr);

    for (let jsonEvent of jsonObj.eventsList) {
      let curEvent = new Event(jsonEvent.startDay, jsonEvent.endDay, jsonEvent.eventName, jsonEvent.location, jsonEvent.description);

      // create new entry in dateDict if needed
      if (!(jsonEvent.startDay.substring(0, 8) in dateDict)) {
        dateDict[jsonEvent.startDay.substring(0, 8)] = { "events": [], "tasks": [] };
      }

      // store Event by their startDay
      dateDict[jsonEvent.startDay.substring(0, 8)].events.push(curEvent);
    }
    for (let jsonTask of jsonObj.tasksList) {
      let curTask = new Task(jsonTask.taskName, jsonTask.tags, jsonTask.dueDate, jsonTask.description, jsonTask.complete);

      // create new entry in dateDict if needed
      if (!(jsonTask.dueDate.substring(0, 8) in dateDict)) {
        dateDict[jsonTask.dueDate.substring(0, 8)] = { "events": [], "tasks": [] };
      }

      // store Task by their startDay
      dateDict[jsonTask.dueDate.substring(0, 8)].tasks.push(curTask);
    }

  }

  // store Day by their located year and month
  let monthDict = {};
  for (const [day, { events, tasks }] of Object.entries(dateDict)) {
    let curDate = new Date(day);
    let curDay = new Day(curDate.getDate(), indexToDay(curDate.getDay()), events, tasks);

    // convert year and month to string, used below as key for monthDict
    let yearMonthKey = String(curDate.getFullYear()) + curDate.getMonth();

    // create new entry in monthDict if needed
    if (!(yearMonthKey in monthDict)) {
      monthDict[yearMonthKey] = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
    }

    // store Day by their located year and month
    monthDict[yearMonthKey][curDay.currDayInt - 1] = curDay;
  }

  // store Month by their located year
  let yearDict = {};
  for (const [yearMonthKey, days] of Object.entries(monthDict)) {
    let curMonthVal = yearMonthKey.substring(4, 6) - (-1);
    let curYearStr = yearMonthKey.substring(0, 4);
    let curMonth = new Month(curMonthVal, indexToMonth(curMonthVal), days);

    // create new entry in yearDict if needed
    if (!(curYearStr in yearDict)) {
      yearDict[curYearStr] = [null, null, null, null, null, null, null, null, null, null, null, null];
    }

    // store Month by their located year
    yearDict[curYearStr][curMonthVal - 1] = curMonth;
  }

  // store all 1000 years as null
  let yearList = [];
  for (let i = 0; i < 1000; i++) {
    yearList.push(null);
  }

  // fill yearList with year that has events
  for (const [yearStr, months] of Object.entries(yearDict)) {
    let curYear = new Year(yearStr - 0, months);
    yearList[yearStr - 2000] = curYear;
  }

  let jsonObj = JSON.parse(jsonStrAr[0]); // use first json's metadata 
  let calendar = new Calendar(jsonObj.title, jsonObj.lastUpdated, jsonObj.calendarID, yearList, Object.values(userNames));

  return [calendar, Object.values(userList)];
}

/**
 * Temporarily deprecated, codacy doesn't accept window.URL
 * Write a json string to local drive
 * @param {String} exportJsonStr Json string that will be saved locally
 *
 * @author Yuelin Dai
 */
// function download (exportJsonStr) {
//     let downloadLink = document.createElement("a");
//     downloadLink.download = "calendar.json";
//     downloadLink.href = window.URL.createObjectURL(new Blob([exportJsonStr]));
//     downloadLink.click();
// }
