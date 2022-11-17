/**
 * JsonInterpreter.js
 * @author Yuelin Dai
 * @summary File contains JSON interpreter.
 * 
 * Created at : 2022-11-17 6:30 AM
 * Last Modified : 2022-11-17 6:30 AM
 */

/**
 * JSON string used for test
 */
const testJson = `
{
    "lastUpdated" : "",
    "title" : "title1",
    "calendarID" : "",

    "usersList" : [
        {
            "firstName" : "john",
            "lastName" : "doe",
            "username":"admin",
            "password":"pwd",
            "profieldID" : "123456",
            "calenarID" : ""
        }
    ],
    "eventsList" : [
        {
          "startDay" : "11/01/22 11:11",
          "endDay" : "11/02/22 11:11",
          "eventName":"e1",
          "users":[0], 
          "location":"",
          "description":""
        },
        {
          "startDay" : "10/01/22 11:11",
          "endDay" : "10/02/22 11:11",
          "eventName":"e1",
          "users":[0], 
          "location":"",
          "description":""
        }
    ],
    "tasksList" : [
        {
            "taskName" : "task1",
            "tags" : " ",
            "dueDate" : "10/01/22 11:11",
            "description" : " ",
            "complete" : "false",
            "users" : [0]
        }
    ]
  }
`;

/**
 * Get the corresponding string of a day 
 * @param ind - order number of the day (1 - 7)
 * @param description - the description of event
 * @return corresponding string of the day
 */
function getDayStr(ind) {
    return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", "Sunday"][ind-1];
}

/**
 * Get the corresponding string of a month 
 * @param ind - order number of the month (1 - 12)
 * @return corresponding string of the month
 */
function getMonthStr(ind) {
    return ["January","February","March","April","May","June", "July", "August", "September", "October", "November", "December"][ind-1];
}

/**
 * Converted the json string to a single calendar and a user array
 * @param {String} jsonStr A json string that contains users, events, tasks
 * @return an array containing the calendar and user array
 */
function LoadJson(jsonStr) {

  let jsonObj = JSON.parse(jsonStr);

  let userList = [];
  let userNames = [];
  for(let jsonUser of jsonObj['usersList']) {
      let curUser = new User(jsonUser.firstName, jsonUser.lastName, jsonUser.username, jsonUser.password, jsonUser.profileID, jsonUser.calendarID);
      userList.push(curUser);
      userNames.push(jsonUser.firstName + " " + jsonUser.lastName);
  }

  let dateDict = {};
  for(let jsonEvent of jsonObj['eventsList']) {
      let curEvent = new Event(jsonEvent.startDay, jsonEvent.endDay, jsonEvent.eventName, jsonEvent.location, jsonEvent.description);
      if(!(jsonEvent.startDay in dateDict)) {
          dateDict[jsonEvent.startDay] = {"events":[],"tasks":[]};
      }
      dateDict[jsonEvent.startDay].events.push(curEvent);
  }
  for(let jsonTask of jsonObj.tasksList) {
      let curTask = new Task(jsonTask.taskName, jsonTask.tags, jsonTask.dueDate, jsonTask.description, jsonTask.complete);
      if(!(jsonTask.dueDate in dateDict)) {
          dateDict[jsonTask.dueDate] = {"events":[],"tasks":[]};
      }
      dateDict[jsonTask.dueDate].tasks.push(curTask);
  }

  let monthDict = {};
  for (const [day, {events, tasks}] of Object.entries(dateDict)) {
      let curDate = new Date(day);
      let curDay = new Day(curDate.getDate(), getDayStr(curDate.getDay()), events, tasks);
      let yearMonthKey = String(curDate.getFullYear())+curDate.getMonth();
      if(!(yearMonthKey in monthDict)) {
          monthDict[yearMonthKey] = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      }
      monthDict[yearMonthKey][curDay.currDayInt-1] = curDay;
  }

  let yearDict = {};
  for(const [yearMonthKey, days] of Object.entries(monthDict)) {
      let curMonthVal = yearMonthKey.substring(4, 6) - (-1);
      let curYearStr = yearMonthKey.substring(0,4);
      let curMonth = new Month(curMonthVal, getMonthStr(curMonthVal), days);
      if(!(curYearStr in yearDict)) {
          yearDict[curYearStr] = [null, null, null, null, null, null, null, null, null, null, null, null];
      }
      yearDict[curYearStr][curMonthVal-1] = curMonth;
  }

  let yearList = [];
  for(let i = 0; i < 1000; i++) {
      yearList.push(null);
  }
  for(const [yearStr, months] of Object.entries(yearDict)) {
      let curYear = new Year(yearStr-0, months);
      yearList[yearStr - 2000 - 1] = curYear;
  }
  let calendar = new Calendar(jsonObj.title, jsonObj.lastUpdated, jsonObj.calendarID, yearList, userNames);

  return [calendar, userList];
}