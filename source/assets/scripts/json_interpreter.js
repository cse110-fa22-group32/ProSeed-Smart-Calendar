// json_interpreter.js

/**
 * json for test use
 */
const testJson = `
{
  "usersList" : [
      {
          "firstname" : "john",
          "lastname" : "doe",
          "username":"admin",
          "password":"pwd",
          "profieldID" : "123456",
          "calenarIDs" : {
              "key" : "",
              "v" : true
          }

      }
  ],
  "eventsList" : [
      {
          "name":"e1",
          "users":[0], 
          "location":"",
          "description":"",
          "startMonth":"11",
          "startDay":"1",
          "startYear":"2022",
          "endMonth":"11",
          "endDay":"3",
          "endYear":"2022"
      }
  ]
}
`;


/**
 * Year class
 */
class Year {
  /**
   * Constructor for Year
   * @param {number} iYear Year number of this object
   */
  constructor(iYear) {
    this.curYear = iYear;

    this.months.push(new Month(1, 31)); // Jan
    if(this.isLeapYear()) {
      this.months.push(new Month(2, 29)); // Feb
    }
    else {
      this.months.push(new Month(2, 28)); // Feb
    }
    this.months.push(new Month(3, 31)); // Mar
    this.months.push(new Month(4, 30)); // Apr
    this.months.push(new Month(5, 31)); // May
    this.months.push(new Month(6, 30)); // Jun
    this.months.push(new Month(7, 31)); // Jul
    this.months.push(new Month(8, 31)); // Aug
    this.months.push(new Month(9, 30)); // Sep
    this.months.push(new Month(10, 31)); // Oct
    this.months.push(new Month(11, 30)); // Nov
    this.months.push(new Month(12, 31)); // Dec
  }

  /**
   * Check wheter this year is a leap year or not
   * @return {boolean} Return true if this year is a leap year
   */
  isLeapYear() {
    return ((0 === this.curYear % 4) && (0 !== this.curYear % 100) || (0 === this.curYear % 400)); 
  }

  curYear = 0;
  months = [];
}

/**
 * Month class
 */
class Month {
  /**
   * Constructor for Month
   * @param {number} iMonth month number of this object
   * @param {number} iCntDays number of days in corresponding month
   */
  constructor(iMonth, iCntDays) {
    this.curMonth = iMonth;

    for (let i = 0; i < iCntDays; i++) {
      this.days.push(new Day(i+1));
    }
  }

  curMonth = 0;
  days = [];
}

/**
 * Day class
 */
class Day {
  /**
   * Constructor for Day
   * @param {number} iDay day number of this object
   */
  constructor(iDay) {
    this.curDay = iDay;
  }

  curDay = 0;
  events = [];
}

/**
 * Event class
 */
class Event {
  /**
   * Constructor for Event
   * @param {object} obj an object (likely created from json) that'll be copied 
   */
  constructor(obj) {
    for(let key in obj)
      this[key] = obj[key];
  }

  /**
   * Add this event to local calendar
   * @param {number} ind The index of this event in localEventsList
   */
  addToLocalCalendar(ind) {
    
    // events that span multiple days
    if( this.startYear != this.endYear ||
    this.startMonth != this.endMonth ||
    this.startDay != this.endDay) {

      for(let eachDay of this.getDatesRange(
        new Date(this.startYear+'-'+this.startMonth+'-'+this.startDay),
        new Date(this.endYear+'-'+this.endMonth+'-'+this.endDay))) {
  
          let calendarKey = String(eachDay.year);
          if(!(calendarKey in localCalendar)) {
            localCalendar[calendarKey] = new Year(eachDay.year);
          }

          localCalendar[calendarKey].months[eachDay.month-1].days[eachDay.day-1].events.push(ind);
    
      }
    }

    // single-day event
    else {
      let calendarKey = String(this.startYear);
      if(!(calendarKey in localCalendar)) {
        localCalendar[calendarKey] = new Year(this.startYear);
      }

      localCalendar[calendarKey].months[this.startMonth-1].days[this.startDay-1].events.push(ind);
    }

  }

  /**
   * Get dates in range [sDate, eDate]
   * @param {Date} sDate The index of this event in localEventsList
   * @param {Date} eDate The index of this event in localEventsList
   * @return {Object} Return an array of spanned dates 
   */
  getDatesRange(sDate, eDate) {
    const curDate = new Date(sDate.getTime());
    const retDates = [];
    while(curDate <= eDate) {
      let curRes = [];
      curRes["month"] = curDate.getMonth() + 1;
      curRes["day"] = curDate.getDate();
      curRes["year"] = curDate.getFullYear();
      retDates.push(curRes);
      curDate.setDate(curDate.getDate() + 1);
    }
    return retDates;
  }

  // startDay = '';
  startMonth = 1;
  startDay = 1;
  startYear = 2000;
  startHour = 0;
  startMinute = 0;
  // endDay = '';
  endMonth = 0;
  endDay = 0;
  endYear = 0;
  endHour = 0;
  endMinute = 0;

  name = '';
  users = [];
  location = '';
  description = '';
}

/**
 * User class
 */
class User {
  /**
   * Constructor for User
   * @param {object} obj an object (likely created from json) that'll be copied 
   * @
   */
  constructor(obj) {
    for(let key in obj)
      this[key] = obj[key];
  }

  /**
   * Pair username with its index in localUsersList
   * @param {Number} ind The index of this user in localUsersList
   */
  addUserIndex(ind) {
    userIndexDict[this.username] = ind;
  }

  /**
   * Get user's index in localUsersList
   * @return {Number} The index of this user in localUsersList
   */
  getUserIndex() {
    return userIndexDict[this.username];
  }

  firstname = '';
  lastname = '';
  username = '';
  password = '';
  profileID = '';
  calendarIDs = {'key':'', 'v':true};
}

/**
 * Map user's displayname to its index in localEventsList
 */
let userIndexDict = {};

/**
 * Dynamically allocated array for storing events
 */
let localEventsList = [];

/**
 * Dynamically allocated array for storing users
 */
let localUsersList = [];

/**
 * Dynamically allocated dictionary for storing used years
 */
let localCalendar = {};



/**
 * Clear local data and replace it with data in json
 * @param {String} jsonStr A json string that contains users, events
 */
function loadJson(jsonStr) {

  localEventsList = [];
  localUsersList = [];
  localCalendar = {};
  userIndexDict = {};

  let jsonObj = JSON.parse(jsonStr);

  for(let jsonUser of jsonObj['usersList']) {
    let localUser = new User(jsonUser);
    localUser.addUserIndex(localUsersList.length);
    localUsersList.push(localUser);
  }

  for(let jsonEvent of jsonObj['eventsList']) {
    let localEvent = new Event(jsonEvent);
    localEvent.addToLocalCalendar(localEventsList.length);
    localEventsList.push(localEvent);
  }

}

/**
 * Store local data to localStorage
 */
function saveLocalData() {
  localStorage.setItem("localEventsList", JSON.stringify(localEventsList));
  localStorage.setItem("localUsersList", JSON.stringify(localUsersList));
}

/**
 * Load localStorage to local data
 */
function loadLocalData() {
  // TODO
}

/**
 * Run the init() function when the page has loaded
 */
 window.addEventListener('DOMContentLoaded', init);

/**
 * Starts the program, all function calls trace back here
 */
function init() {

  // var e1 = new Event(JSON.parse('{"name":"e1","users":[1,2]}'));
  // console.log(e1);
  // e1.addToLocalCalendar(0);

  // var u1 = new User(JSON.parse('{"displayName":"john","username":"admin","password":"123"}'));
  // console.log(u1);
  // u1.addUserIndex(0);

  loadJson(testJson);
  console.log(localCalendar);
}
