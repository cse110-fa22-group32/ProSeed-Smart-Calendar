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
    "lastUpdated" : "12/12/2012",
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
    "lastUpdated" : "13/13/2013",
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
    "lastUpdated" : "14/14/2014",
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
    "lastUpdated" : "02/21/2022",
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
    //TODO: ADD LISTENERS?
}, false);

//Add calendars into middleGround containers.
function createView(calendars){
    let middleGroundContainer = document.querySelector("#Calendars");
    
    for (let i = 0; i < calendars.length; i++){

        const calendar = document.createElement("calendar-block");
        calendar.data = calendars[i];
        console.log(calendars[i].calendarTitle);
        let article = document.createElement("article");
        article.innerHTML = `<p>HELLO WORLD</p>`;

        article.innerHTML = `<img src= "./assets/temp_/Icon.png" alt= "calendar">
        <p class="title"> <a href="./calendar.html"> Title : ${calendars[i].calendarTitle}</a> </p>
        <p class="organization"> Calendar ID : ${calendars[i].calendarID}</p>
        <p class="ingredients"> Last Updated : ${calendars[i].lastUpdated}</p>`;

        calendar.appendChild(article);
        middleGroundContainer.appendChild(calendar);
    }
}

//Get calendar json from storage:
function getCalendarFromStorage(){
    if(!localStorage.getItem("calendars")){
        return [];
    }
    return JSON.parse(localStorage.getItem("calendars"));
}