/**
 * middleGround.js
 * @author Guan Li
 * @summary File is used to populate calendar into middle ground for calendar view.
 * 
 * Created at : 2022-11-21 2:30 PM
 * Last Modified : 2022-11-21 8:30 PM
 */

//Create a dummy data array to store dummy calendars.
let data_array =  [{
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "10/12/2022",
    "calendarTitle" : "Personal",
    "calendarID" : "WEFJ1242",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "11/12/2022",
    "calendarTitle" : "Work",
    "calendarID" : "ACHUWE132",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "11/16/2022",
    "calendarTitle" : "School",
    "calendarID" : "!@$AFJIO12",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  },
  {
    "lastUpdated" : "11/15/2022",
    "calendarTitle" : "Friend",
    "calendarID" : "QWFQWFASF",
    "listTile" : "title2",

    "usersList" : [

    ],
    "eventsList" : [

    ],
    "tasksList" : [

    ]
  }]


function dummyCalendarSetup(){
    //Load the information into local storage: DEMO:
    localStorage.setItem("calendars", JSON.stringify(data_array));
}

//Get calendar json from storage:
function getCalendarFromStorage(){
  if(!localStorage.getItem("calendars")){
      return [];
  }
  return JSON.parse(localStorage.getItem("calendars"));
}

//takes in a parameter calendar and save it to storage
function saveNewCalendarToStorage(json_file){
  let oldCalendarStorage = getCalendarFromStorage();
  oldCalendarStorage.push(json_file);
  localStorage.setItem('calendars', JSON.stringify(oldCalendarStorage));
  localStorage.setItem('test', JSON.stringify(oldCalendarStorage));
}

//Add calendars into middleGround containers.
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
        <p class="title"> <a href="./calendar.html"> Title : ${calendars[i].title}</a> </p>
        <p class="innerText"> Last Updated : ${calendars[i].lastUpdated}</p>`;
        gridContainer.appendChild(article);
        middleGroundContainer.appendChild(gridContainer);
    }
  }
}

function openForm(){
    //Display the form:
    document.getElementById("myForm").style.display = "block";  
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
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

  submitButton.addEventListener("click", function(){
    //Grab the submissions.
    let calendarName = document.getElementById("calendar-name").value;
    //TODO: Fill out a json file with the calendar Titles.
    // console.log(calendarName);

    // let Year, month, day = getCurrentDay()
    // currentDate = Year + month + day;
    // console.log(currentDate);

    //TODO: Store it into the local storage.
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
    });

    // Open up a form and create a button .
    createNewCalendar.addEventListener("click", function(){
      // //Enable the form
      document.getElementById("myForm").style.display = "block";
      //Store the new empty json file into local storage.

      //Update view:
      createView(calendars);
    })

    currentCalendarBtn.addEventListener("click", function(){
      //Go to calendar.html
      location.href = "./calendar.html";
    })

    uploadNewCalendar.addEventListener("click", function(){      
      //Update view:
      createView(calendars);
    });

    console.log(getCurrentDay()[0]);

}, false);
