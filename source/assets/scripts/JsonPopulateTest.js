

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
           "startDay" : "11/01/22 11:11",
           "endDay" : "11/02/22 11:11",
           "eventName":"event 1",
           "users":[0], 
           "location":"",
           "description":""
         },
         {
           "startDay" : "11/01/22 11:11",
           "endDay" : "11/02/22 11:11",
           "eventName":"event 2",
           "users":[0], 
           "location":"",
           "description":""
         },
         {
           "startDay" : "11/03/22 11:11",
           "endDay" : "11/04/22 11:11",
           "eventName":"event 2",
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
         },
         {
           "startDay" : "10/05/22 11:11",
           "endDay" : "10/06/22 11:11",
           "eventName":"e4_test",
           "users":[0], 
           "location":"",
           "description":""
         },
         {
           "startDay" : "10/05/22 13:11",
           "endDay" : "10/06/22 15:11",
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
             "dueDate" : "11/01/22 16:11",
             "description" : " ",
             "complete" : "false",
             "users" : [0]
         },
         {
             "taskName" : "task 3",
             "tags" : " ",
             "dueDate" : "11/01/22 11:11",
             "description" : " ",
             "complete" : "false",
             "users" : [0]
         },
         {
             "taskName" : "task 1",
             "tags" : " ",
             "dueDate" : "10/01/22 11:11",
             "description" : " ",
             "complete" : "false",
             "users" : [0]
         }
     ]
   }
 `;

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);


function init() {
  let b = LoadJson(testJson);
  console.log(b);

  b[0].Show(2022, 11);

  // console.log(b[2].SortedTasks); // array of tasks sorted by dueDate

  b[0].Show(2022,11);
  
}


