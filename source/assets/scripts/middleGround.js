/**
 * middleGround.js
 * @author Guan Li
 * @summary File is used to populate calendar into middle ground for calendar view.
 * 
 * Created at : 2022-11-21 2:30 PM
 * Last Modified : 2022-11-21 8:30 PM
 */

/**
 * @author Guan Li
 * @summary Create a dummy calendar to use. Now discarded.
 * 
 * @return NONE
 */
function dummyCalendarSetup(){
    //Load the information into local storage: DEMO:
    localStorage.setItem("calendars", JSON.stringify(data_array));
}

/**
 * @author Guan Li
 * @summary Get calenar json file from storage.
 * 
 * @return NONE
 */
function getCalendarFromStorage(){
  if(!localStorage.getItem("calendars")){
      return [];
  }
  return JSON.parse(localStorage.getItem("calendars"));
}

/**
 * @author Guan Li
 * @summary takes in a parameter calendar and save it to storage
 * 
 * @return NONE
 */
function saveNewCalendarToStorage(json_file){
  let oldCalendarStorage = getCalendarFromStorage();
  oldCalendarStorage.push(json_file);
  localStorage.setItem('calendars', JSON.stringify(oldCalendarStorage));
  localStorage.setItem('test', JSON.stringify(oldCalendarStorage));
}

/**
 * @author Guan Li
 * @summary Add all the calendar to middle ground from the local storage
 * 
 * @return NONE
 */
function createView(calendars){

  if (calendars == null){
    return null;
  }
  else{
    let middleGroundContainer = document.querySelector("#Calendars");
    middleGroundContainer.innerHTML = ""; // Clear the html first.
    
    for (let i = 0; i < calendars.length; i++){
        // const calendar = document.createElement("calendar-block");
        // calendar.data = calendars[i];
        // console.log(calendars[i].calendarTitle);
        let gridContainer = document.createElement("div");
        gridContainer.className = "grid-item";
        let article = document.createElement("article");
        article.innerHTML = `<img src= "./assets/temp_/Icon.png" alt= "calendar">
        <p class="title"> <a> Title : ${calendars[i].title}</a> </p>
        <p class="innerText"> Last Updated : ${calendars[i].lastUpdated}</p>
        <button id="key-button"> Enter calendar </button>
        <button id="key-button"> Remove calendar </button>`;
        gridContainer.appendChild(article);
        middleGroundContainer.appendChild(gridContainer);
    }
  }
}

/**
 * @author Guan Li
 * @summary Open the form for user input
 * 
 * @return NONE
 */
function openForm(){
  //Display the form:
  document.getElementById("myForm").style.display = "block";  
}

/**
 * @author Guan Li
 * @summary Close the form for user input
 * 
 * @return NONE
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
    const fileReader = new FileReader()
    fileReader.onload = event => resolve(JSON.parse(event.target.result))
    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
  })
}


// When the html is loaded
document.addEventListener('DOMContentLoaded', function() {

  // dummyCalendarSetup();

  // Grab the calendar from local storage and save it into a variable.
  let calendars = getCalendarFromStorage();
  //Create view for the calendar Populate the calendar objects.
  createView(calendars);

  //Grab the buttons and their button ids.
  let createNewCalendar = document.querySelector("#new-calendar-button");
  let currentCalendarBtn = document.querySelector("#current-calendar-button");
  let uploadNewCalendar = document.querySelector("#upload-calendar-button");
  let submitButton = document.querySelector("#btn-submit");
  let calendarTitleBtn = document.querySelector(".title");
  let closeButton = document.querySelector("#btn-cancel");

  //Making sure the calendar button excists.
  if(calendarTitleBtn){
    calendarTitleBtn.addEventListener("click", function(){
      location.href = './calendar.html';
    });
  }

  if(closeButton){
    closeButton.addEventListener("click", function(){
      closeForm();
    })
  }

  submitButton.addEventListener("click", function(){
    //Grab the submissions.
    let calendarName = document.getElementById("calendar-name").value;
    if(calendarName != ""){
      //Store it into the local storage.
      let newCalendar = {
        "lastUpdated": getCurrentDay()[0] + "/" + getCurrentDay()[1] + "/" + + getCurrentDay()[2],
        "title": calendarName,
        "calendarID": getCurrentDay()[0] + getCurrentDay()[1] + getCurrentDay()[2] + "-" + calendarName,
        "usersList": [],
        "eventsList": [],
        "tasksList": [],
        "usersList" : [
          
        ],
        "eventsList" : [
          
        ],
        "tasksList" : [
          
        ]
      }
      saveNewCalendarToStorage(newCalendar);
      createView(calendars);
    }
    });

    // Open up a form to ask for user new input.
    createNewCalendar.addEventListener("click", function(){
      // //Enable the form
      document.getElementById("myForm").style.display = "block";
    })

    // Direct you straight to current Calendar.html
    currentCalendarBtn.addEventListener("click", function(){
      //Go to calendar.html
      location.href = "./calendar.html";
    })

    // Open up a view and update
    uploadNewCalendar.addEventListener("click", function(){
      var input = document.createElement('input');
      input.type = 'file';
      input.onchange = async e => { 
        var file = e.target.files[0];
        if (file.type == "application/json"){
          const object = await parseJsonFile(file);
          // console.log(object)
          saveNewCalendarToStorage(object);
          location.reload();
        } 
      }
      input.click();
      
      //Update view:
      createView(calendars);
    });

}, false);