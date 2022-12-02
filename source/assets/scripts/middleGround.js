/**
 * middleGround.js
 * @author Guan Li
 * @summary File is used to populate calendar into middle ground for calendar view.
 * 
 * Created at : 2022-11-21 2:30 PM
 * Last Modified : 2022-11-21 8:30 PM
 */


/**
 * This is currently just a dummy version
 * TODO: Fix
 */

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



// When the html is loaded
document.addEventListener('DOMContentLoaded', function() {

    //Load the information into local storage: DEMO:
    localStorage.setItem("calendars", JSON.stringify(data_array));

    let calendars = getCalendarFromStorage();
    // console.log(calendars[0].calendarTitle);
    createView(calendars);

    let createNewCalendar = document.querySelector("#new-calendar-button");
    createNewCalendar.addEventListener("click", function(){
      //Enable the form
      document.getElementById("myForm").style.display = "block";
      //Store the new empty json file into local storage.
      
      //Update view:
      createView(calendars);
    })

    // let closeButton = document.querySelector(".btn-cancel");
    // closeButton = this.addEventListener("click", function(){
    //   //Hide the form
    //   document.getElementById("myForm").style.display = "none";
    // });

    let uploadNewCalendar = document.querySelector("#upload-calendar-button");
    uploadNewCalendar.addEventListener("click", function(){
      //Store the new empty json file into local storage.
      
      //Update view:
      createView(calendars);
    });

}, false);

//Add calendars into middleGround containers.
function createView(calendars){
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
        <p class="title"> <a href="./calendar.html"> Title : ${calendars[i].calendarTitle}</a> </p>
        <p class="innerText"> Calendar ID : ${calendars[i].calendarID}</p>`;

        // calendar.appendChild(article);
        
        gridContainer.appendChild(article);
        middleGroundContainer.appendChild(gridContainer);

    }
}

//Get calendar json from storage:
function getCalendarFromStorage(){
    if(!localStorage.getItem("calendars")){
        return [];
    }
    return JSON.parse(localStorage.getItem("calendars"));
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}