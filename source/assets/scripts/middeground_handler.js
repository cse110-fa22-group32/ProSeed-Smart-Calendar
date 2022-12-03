/**
 * middleground_handler.js
 * @author Steven Khaw
 * @summary 
 * 
 * Created at : 2022-12-2 10:00 PM
 * Last Modified : 2022-12-3 2:00 AM
 */

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

const testingJson = `
{
    "lastUpdated" : "",
    "calendarTitle" : "TestingJsontitle",
    "calendarID" : "2022123-16",
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
          "startDay" : "12/02/22 9:00",
          "endDay" : "12/02/22 10:00",
          "eventName":"First Event",
          "users":[0], 
          "location":"WLH 2001",
          "description":"Favorite Class"
        }
    ],
    "tasksList" : [
        {
            "taskName" : "First Task",
            "tags" : "",
            "dueDate" : "12/01/22 16:11",
            "description" : "This is first task",
            "complete" : "false",
            "users" : [0]
        }
    ]
  }
`

const testingJson2 = `
{
    "lastUpdated" : "",
    "calendarTitle" : "TestingJsontitle22",
    "calendarID" : "2022123-18",
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
          "startDay" : "12/02/22 9:00",
          "endDay" : "12/02/22 10:00",
          "eventName":"Last Event",
          "users":[0], 
          "location":"WLH 2001",
          "description":"Favorite Class"
        }
    ],
    "tasksList" : [
        {
            "taskName" : "Last Task",
            "tags" : "",
            "dueDate" : "12/01/22 16:11",
            "description" : "This is first task",
            "complete" : "false",
            "users" : [0]
        }
    ]
  }
`

function init() {
  //isNewCalendar();
  validateDict();
  addDictPair("2022123-16",testingJson);
  addDictPair("2022123-18",testingJson2);
  storeKey("2022123-16");
  loadCalendarFromDict();
}

/**
 * @author Steven Khaw
 * @summary creates dictionary in local storage if it does not exist 
 */
function validateDict() {
  let calendarDict = localStorage.getItem("calendarDict");
  
  // if calendarDict DNE in localStorage, create it 
  if (!calendarDict) localStorage.setItem("calendarDict",JSON.stringify({}));
}

/**
 * @author Steven Khaw
 * @summary adds key and value pair to local storage dictionary
 * 
 * @param {string} calendarKey 
 * @param {string} calendarJson 
 */
function addDictPair(calendarKey, calendarJson) {
  let calendarDict = localStorage.getItem("calendarDict");

  // creates dict if it DNE
  if (!calendarDict) {
    validateDict();
    addDictPair(calendarKey, calendarJson);
  }

  // stores dictionary from localStorage into var
  calendarDict = JSON.parse(calendarDict);

  // if key exists in local storage, delete it, then add new data to dict
  if (calendarDict[String(calendarKey)]) {
    delete calendarDict[String(calendarKey)];
  }

  // creates Calendar obj with calendarJson
  let calendarObj = loadJson([calendarJson]);

  // loads calendarJSON into diction with respective key
  calendarDict[String(calendarKey)] = JSON.parse(calendarObj[0].Export([-1],[-1],[-1]));

  // store updated dict back to localStorage
  localStorage.setItem("calendarDict",JSON.stringify(calendarDict));
}


/**
 * @author Steven Khaw
 * @summary stores calendarKey into localStorage
 * 
 * @param {string} calendarKey 
 */
function storeKey(calendarKey) {
  localStorage.setItem("loadCalendarKey",calendarKey);
}

/**
 * @author Steven Khaw
 * @summary clears jsonStr to prep for new calendar
 */
function isNewCalendar() {
  localStorage.removeItem("jsonStr");
}

/**
 * @author Steven Khaw, Christopher Han
 * @summary loads calendar based on what is stored in loadCalendarKey in 
 * local storage
 */
function loadCalendarFromDict() {

  // when there's no json file in localStorage, load testJson
  if (!getJsonFromLocalStorage()) {
    let loadCalendarKey = localStorage.getItem("loadCalendarKey");
    let calendarDict = localStorage.getItem("calendarDict");
  
    // check to ensure items exist in localStorage
    if (!loadCalendarKey || !calendarDict) {
      console.error("key or dictionary does not exist in localStorage");
    }
  
    // stores dictionary from localStorage into var
    calendarDict = JSON.parse(calendarDict);
  
    let calendarJson = JSON.stringify(calendarDict[String(loadCalendarKey)]);
  
    // creates Calendar obj with calendarJson
    let calendarObj = loadJson([calendarJson]);
  
    loadCalendarData(calendarObj);
  
    let currDay = getCurrentDay();
    calendarData[0].Show(currDay[0], currDay[1]);
  }
  
  // auto save calendar to local storage
  saveJsonToLocalStorage(calendarData[0]);
}