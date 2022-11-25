window.addEventListener('DOMContentLoaded', init);

function init() {
    

    data = JSON.parse(`
    {
        "2022-11": {
            "1": {
                "event-counter": 2,
                "todo-counter": 1,
                "event-list":{
                    "0":{
                        "title": "event 1",
                        "date" : "2022-11-1",
                        "start": "2:00",
                        "end": "3:00",
                        "discription": "event tast"
                    },
                    "1":{
                        "title": "event 1",
                        "date" : "2022-11-1",
                        "start": "2:00",
                        "end": "3:00",
                        "discription": "event tast"
                    }
                },
                "todo-list": {
                    "0":{
                        "title": "todo 1",
                        "date" : "2022-11-1",
                        "tiem": "2:00",
                        "discription": "to do tast"
                    }
                }

            },
            "3": {
                "event-counter": 1,
                "todo-counter": 0,
                "event-list":{
                    "0":{
                        "title": "event 1",
                        "date" : "2022-11-3",
                        "start": "2:00",
                        "end": "3:00",
                        "discription": "event tast"
                    }
                }

            }
        },
        "2022-12": {
            "5": {
                "event-counter": 0,
                "todo-counter": 1,
                "todo-list": {
                    "0":{
                        "title": "todo 1",
                        "date" : "2022-12-5",
                        "tiem": "5:00",
                        "discription": "to do tast"
                    }
                }
            }
        }
    }

    `);
    let newData = data["2022-11"];
    console.log(newData);

    console.log(data["2022-11"]["1"]["event-counter"]);
    let events = data["2022-11"]["1"]["event-list"]["0"];
    console.log(events);

    //change value
    console.log("change value");
    data["2022-11"]["3"]["event-list"]["0"]["title"] = "new title";
    let newTitle = data["2022-11"]["3"]["event-list"];
    console.log(newTitle);

    //delete
    console.log("delete");
    delete data["2022-11"]["1"]["event-list"]["0"];
    let newDay = data["2022-11"]["1"];
    console.log(newDay);

    //add
    console.log("add");
    let counter = data["2022-11"]["1"]["event-counter"] ++;
    console.log(counter);
    console.log(data["2022-11"]["1"]);
    data["2022-11"]["1"]["event-list"][String(counter)]={
        "title": "todo 123",
        "date" : "2022-12-1",
        "time": "5:00",
        "add other": "this is new thing",
        "discription": String(counter)
    }
    console.log(data["2022-11"]["1"]["event-list"]);
}