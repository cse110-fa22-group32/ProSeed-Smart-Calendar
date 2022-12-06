
let {loadJson} = require('../source/assets/scripts/json_interpreter.js')

const json1 = `
 {
     "lastUpdated" : "",
     "calendarTitle" : "title1",
     "calendarID" : "",
 
     "usersList" : [
         {
             "firstName" : "john",
             "lastName" : "doe",
             "username":"admin",
             "password":"pwd",
             "profileID" : "123456",
             "calendarID" : ""
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
         }
     ]
   }
 `;

test('loadJson', () => {
	let calData = loadJson([json1]);

  expect(calData[0].lastUpdated).toBe('');
  expect(calData[0].title).toBe('title1');
  expect(calData[0].calendarID).toBe('');
  expect(calData[1].length).toBe(1);
});

test('Export', () => {
	let calData = loadJson([json1]);

	// console.log(cal.Export([-1], [-1], [-1]));
	// console.log(JSON.stringify(JSON.parse(json1)));
  expect(calData[0].Export([-1], [-1], [-1])).toBe(JSON.stringify(JSON.parse(json1)));
  expect(calData[0].Export([-1], [-1], [-1])).toBe(calData[0].Export([2022],[-1],[-1]));
  expect(calData[0].Export([-1], [-1], [-1])).toBe(calData[0].Export([-1],[12],[-1]));
  expect(calData[0].Export([-1], [-1], [-1])).toBe(calData[0].Export([-1],[-1],[1]));
});
