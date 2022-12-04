/**
 * middleGround.js
 * @author Guan Li, Steven Khaw
 * @summary File is used to populate calendar into middle ground for calendar view.
 *
 * Created at : 2022-11-21 2:30 PM
 * Last Modified : 2022-12-4 12:00 AM
 */

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
        <p class="title">Title: ${calendars[i].title}</p>
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
        <p class="title">Title: ${calendars[i][0].title}</p>
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

// When the html is loaded
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // Grab the calendar from local storage and save it into a variable.
    let calendars = getCalendarFromStorage();
    //Create view for the calendar Populate the calendar objects.
    createView(calendars);

    //Grab the buttons and their button ids.
    let createNewCalendar = document.querySelector("#new-calendar-button");
    let currentCalendarBtn = document.querySelector("#current-calendar-button");
    let uploadNewCalendar = document.querySelector("#upload-calendar-button");
    let submitButton = document.querySelector("#btn-submit");
    let closeButton = document.querySelector("#btn-cancel");

    if (closeButton) {
      closeButton.addEventListener("click", function () {
        closeForm();
      });
    }

    submitButton.addEventListener("click", function () {
      //Grab the submissions.
      let calendarName = document.getElementById("calendar-name").value;
      if (calendarName != "") {
        //Store it into the local storage.
        let newCalendar = {
          lastUpdated:
            getCurrentDay()[0] +
            "/" +
            getCurrentDay()[1] +
            "/" +
            +getCurrentDay()[2],
          title: calendarName,
          calendarID:
            getCurrentDay()[0] +
            getCurrentDay()[1] +
            getCurrentDay()[2] +
            "-" +
            String(calendarName.length),
          usersList: [],
          eventsList: [],
          tasksList: [],
        };

        validateDict();
        addDictPair(
          String(newCalendar.calendarID),
          JSON.stringify(newCalendar)
        );

        saveNewCalendarToStorage(newCalendar);
        calendars = getCalendarFromStorage();
        createView(calendars);
      }
    });

    // Open up a form to ask for user new input.
    createNewCalendar.addEventListener("click", function () {
      // //Enable the form
      document.getElementById("myForm").style.display = "block";
    });

    // Direct you straight to current Calendar.html
    currentCalendarBtn.addEventListener("click", function () {
      //Go to calendar.html
      location.href = "./calendar.html";
    });

    // Open up a view and update
    uploadNewCalendar.addEventListener("click", function () {
      var input = document.createElement("input");
      input.type = "file";
      input.onchange = async (e) => {
        var file = e.target.files[0];
        if (file.type == "application/json") {
          const object = await parseJsonFile(file);

          validateDict();
          addDictPair(String(object[0].calendarID), JSON.stringify(object[0]));

          saveNewCalendarToStorage(object);
          location.reload();
        }
      };

      input.click();

      //Update view:
      calendars = getCalendarFromStorage();
      createView(calendars);
    });

    //-----------------------This works--------------------------------
    //Grab all enter calendar.
    const enterCalendarBtn = document.querySelectorAll(".key-button");

    enterCalendarBtn.forEach((enterCalendarBtn) => {
      enterCalendarBtn.addEventListener("click", (event) => {
        // if enter button is clicked
        if (event.target.id == "enter-calendar") {
          // updates key of calendar to view
          removeKey();
          storeKey(event.target.name);

          //clears jsonStr from localStorage
          isNewCalendar();

          //Update the last updated on the calendar
          let lastUpdated = getCurrentDay()[0] + "/" + getCurrentDay()[1] + "/" + getCurrentDay()[2];
          // let lastUpdated = 30000000;
          // the CalendarID is: event.target.name
          
          // READ STRING FROM LOCAL STORAGE
          var retrievedObject = localStorage.getItem('calendars');
          // CONVERT STRING TO REGULAR JS OBJECT
          var parsedObject = JSON.parse(retrievedObject);

          for(let i = 0; i < parsedObject.length; i++){
            if (parsedObject[i].calendarID == event.target.name){
              //Update parsed object.
              parsedObject[i].lastUpdated = lastUpdated;
              //save the parsed object into the dictionary;
              console.log(parsedObject[i]);
              addDictPair(event.target.name,JSON.stringify(parsedObject[i]));
            }
          }
          //Store the parsed object back to calendars local storage
          saveOnlyNewCalendarToStorage(parsedObject);


          location.href = "./calendar.html";
        }

        // if remove button is clicked
        else if (event.target.id == "remove-calendar") {
          // removes key from dictionary
          removeDictPair(event.target.name);

          // removes calendar from middle-ground localStorage
          for (let i = 0; i < calendars.length; i++) {
            if (!calendars[i][0]) {
              if (calendars[i].calendarID == event.target.name) {
                calendars.splice(i, 1);
                localStorage.setItem("calendars", JSON.stringify(calendars));
                location.reload();
                createView(calendars);
              }
            } else {
              if (calendars[i][0].calendarID == event.target.name) {
                calendars.splice(i, 1);
                localStorage.setItem("calendars", JSON.stringify(calendars));
                location.reload();
                createView(calendars);
              }
            }
          }
        }
      });
    });
  },
  false
);
