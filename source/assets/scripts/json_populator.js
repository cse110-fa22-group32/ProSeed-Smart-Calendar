/**
 * JSON string used for test
 */
const testJson = `
 {
     "lastUpdated" : "",
     "calendarTitle" : "title1",
     "calendarID" : "",
     "listTile" : "title2",
 
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
           "startDay" : "12/01/22 9:11",
           "endDay" : "12/01/22 10:11",
           "eventName":"event 1",
           "users":[0], 
           "location":"",
           "description":""
         },
         {
           "startDay" : "12/01/22 10:11",
           "endDay" : "12/01/22 11:11",
           "eventName":"event 2",
           "users":[0], 
           "location":"",
           "description":""
         },
         {
           "startDay" : "12/03/22 11:11",
           "endDay" : "12/03/22 11:31",
           "eventName":"event 2",
           "users":[0], 
           "location":"",
           "description":""
         },
         {
           "startDay" : "11/01/22 10:11",
           "endDay" : "11/01/22 11:11",
           "eventName":"e1",
           "users":[0], 
           "location":"",
           "description":""
         },
         {
           "startDay" : "11/05/22 9:11",
           "endDay" : "11/05/22 10:11",
           "eventName":"e4_test",
           "users":[0], 
           "location":"",
           "description":""
         },
         {
           "startDay" : "11/05/22 11:11",
           "endDay" : "11/05/22 11:21",
           "eventName":"e5_test",
           "users":[0], 
           "location":"",
           "description":""
         }
     ],
     "tasksList" : [
         {
             "taskName" : "task 2",
             "tags" : " ",
             "dueDate" : "12/01/22 16:11",
             "description" : " ",
             "complete" : "false",
             "users" : [0]
         },
         {
             "taskName" : "task 3",
             "tags" : " ",
             "dueDate" : "12/01/22 11:11",
             "description" : " ",
             "complete" : "false",
             "users" : [0]
         },
         {
             "taskName" : "task 1",
             "tags" : " ",
             "dueDate" : "11/01/22 11:11",
             "description" : " ",
             "complete" : "false",
             "users" : [0]
         }
     ]
   }
 `;

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// no comments since this one is just for test and will be removed in final product
function init() {
  if (!getJsonFromLocalStorage()) {
    // when there's no json file in localStorage, load testJson

    // create a calendar object from hard-coded json
    let calData = loadJson([testJson]);

    loadCalendarData(calData);

    // export calendar to json with different range of time selections
    let tuesJson = calendarData[0].Export([-1], [-1], [1]);
    let thursJson = calendarData[0].Export([-1], [-1], [3]);

    // create a calendar object from multiple json
    calendarData = loadJson([tuesJson, thursJson]);

    let currDay = getCurrentDay();
    calendarData[0].Show(currDay[0], currDay[1]);

    // simple tests for reading/writing json from/to local drive

    // temporarily deprecated
    // write json string to local drive
    // const downloadBtn = document.getElementById('download-btn');
    // downloadBtn.addEventListener('click', e => {
    //     download(tuesJson);
    // });
  }
  // auto save calendar to local storage
  saveJsonToLocalStorage(calendarData[0]);

  // read local drive, to do that first...
  /* const uploadBtn = document.getElementById("upload-btn");
  uploadBtn.addEventListener("click", (e) => {
    const fileBtn = document.getElementById("files");
    fileBtn.click();
  });

  // ...first, select local drive
  const fileBtn = document.getElementById("files");
  fileBtn.addEventListener("change", async (e) => {
    const [file] = e.target.files;

    if (!file) {
      console.log("no file");
    } else {
      const data = await file.text();
      console.log(data);
    }
  }); */
}
