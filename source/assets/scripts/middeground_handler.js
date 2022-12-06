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

function init() {}

/**
 * @author Steven Khaw
 * @summary creates dictionary in local storage if it does not exist
 */
function validateDict() {
  let calendarDict = localStorage.getItem("calendarDict");

  // if calendarDict DNE in localStorage, create it
  if (!calendarDict) localStorage.setItem("calendarDict", JSON.stringify({}));
}

/**
 * @author Steven Khaw
 * @summary adds or updates key and value pair to local storage dictionary
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

  // loads calendarJSON into dictionary with respective key
  calendarDict[String(calendarKey)] = JSON.parse(
    calendarObj[0].Export([-1], [-1], [-1])
  );

  // store updated dict back to localStorage
  localStorage.setItem("calendarDict", JSON.stringify(calendarDict));
}

function removeDictPair(calendarKey) {
  let calendarDict = localStorage.getItem("calendarDict");

  // creates dict if it DNE
  if (!calendarDict) {
    validateDict();
    removeDictPair(calendarKey);
  }

  // stores dictionary from localStorage into var
  calendarDict = JSON.parse(calendarDict);

  // if key exists in local storage, delete it, then add new data to dict
  if (calendarDict[String(calendarKey)]) {
    delete calendarDict[String(calendarKey)];
  }

  // store updated dict back to localStorage
  localStorage.setItem("calendarDict", JSON.stringify(calendarDict));
}

/**
 * @author Steven Khaw
 * @summary stores calendarKey into localStorage
 *
 * @param {string} calendarKey
 */
function storeKey(calendarKey) {
  localStorage.setItem("loadCalendarKey", calendarKey);
}

/**
 * @author Steven Khaw
 * @summary removes calendarKey from localStorage
 */
function removeKey() {
  localStorage.removeItem("loadCalendarKey");
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

/**
 * @author Steven Khaw
 * @summary updates the middleground calendar to the most up to date version
 */
function updateMiddlegroundCalendar() {
  let currJsonStr = localStorage.getItem("jsonStr");
  currJsonStr = JSON.parse(currJsonStr);
  let calendarID = currJsonStr.calendarID

  let calendarObject = localStorage.getItem("calendars");
  calendarObject = JSON.parse(calendarObject);

  for (let i = 0; i < calendarObject.length; i++) {
    if (!calendarObject[i][0]) {
      if (calendarObject[i].calendarID == calendarID) {
        currJsonStr.title = calendarObject[i].title;
        calendarObject[i] = currJsonStr;
        break;
      }
    } else {
      if (calendarObject[i][0].calendarID == calendarID) {
        currJsonStr.title = calendarObject[i][0].title;
        calendarObject[i][0] = currJsonStr;
        break;
      }
    }
  }

  localStorage.setItem("calendars", JSON.stringify(calendarObject));
}
/**
 * @author Guan Li
 * @summary Get calenar json file from storage.
 */
 function getCalendarFromStorage() {
  if (!localStorage.getItem("calendars")) {
    return [];
  }
  return JSON.parse(localStorage.getItem("calendars"));
}

/**
 * @author Guan Li
 * @summary takes in a parameter calendar and Append it to storage
 */
function saveNewCalendarToStorage(json_file) {
  let oldCalendarStorage = getCalendarFromStorage();
  oldCalendarStorage.push(json_file);
  localStorage.setItem("calendars", JSON.stringify(oldCalendarStorage));
}

/**
 * @author Guan Li
 * @summary takes in a parameter calendar and save it to storage
 */
function saveOnlyNewCalendarToStorage(json_file) {
  localStorage.setItem("calendars", JSON.stringify(json_file));
}

/**
 * @author Guan Li, Steven Khaw
 * @summary Add all the calendar to middle ground from the local storage
 */
function createView(calendars) {
  if (calendars == null) {
    return;
  } else {
    let middleGroundContainer = document.querySelector("#Calendars");
    middleGroundContainer.innerHTML = ""; // Clear the html first.

    for (let i = 0; i < calendars.length; i++) {
      let gridContainer = document.createElement("div");
      gridContainer.className = "grid-item";
      let article = document.createElement("article");
      if (!calendars[i][0]) {
        article.innerHTML = `
        <img id="calander-icon" src="./assets/images/icons/calendar.svg" alt="calendar">
        <p class="title">${calendars[i].title}</p>
        <p class="inner-text">Last Updated: ${calendars[i].lastUpdated}</p>
        <div class="row">
          <div class="column">
            <button type ="button" class="key-button" id="enter-calendar" name=${calendars[i].calendarID}>Open calendar</button>
          </div>
          <div class="column">
            <button type ="button" class="key-button" id="remove-calendar" name=${calendars[i].calendarID}>Delete calendar</button>
          </div>
        </div>
        `;
      } else {
        article.innerHTML = `
        <img id="calander-icon" src="./assets/images/icons/calendar.svg" alt="calendar">
        <p class="title">${calendars[i][0].title}</p>
        <p class="inner-text">Last Updated: ${calendars[i][0].lastUpdated}</p>
        <div class="row">
          <div class="column">
            <button type ="button" class="key-button" id="enter-calendar" name=${calendars[i][0].calendarID}>Open calendar</button>
          </div>
          <div class="column">
            <button type ="button" class="key-button" id="remove-calendar" name=${calendars[i][0].calendarID}>Delete calendar</button>
          </div>
        </div>
        `;
      }

      gridContainer.appendChild(article);
      middleGroundContainer.appendChild(gridContainer);
    }
  }
}

/**
 * @author Guan Li
 * @summary Open the form for user input
 */
function openForm() {
  //Display the form:
  document.getElementById("myForm").style.display = "block";
}

/**
 * @author Guan Li
 * @summary Close the form for user input
 */
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

/**
 * @author Guan Li
 * @summary returns the file to grab the json files.
 *
 * @return Promise - Returns the json file objects.
 */
async function parseJsonFile(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}
