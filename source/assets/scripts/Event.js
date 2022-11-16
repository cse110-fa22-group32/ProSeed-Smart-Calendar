/**
 * Event.js
 * @author Guan Li
 * @summary File contains Event class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 2:30 PM
 */

/** Class Event  */
class Event {

    /**
     * @author Guan Li
     * Constructs a Event object from the class
     * @constructor
     * 
     * @param {string} startDay - start day of the event
     * @param {string} endDay - end day of the event.
     * @param {string} eventName - name of the event;
     * @param {string} location - Events location
     * @param {string} description - events description;
     * @param {Users[]} Useres - Contains all the users that are associated with the event.
     */
    constructor(startDay,endDay,eventName,location,description,Users) {
        this.startDay = startDay;
        this.endDay = endDay;
        this.eventName = eventName;
        this.location = location;
        this.description = description;
        this.Users = Users;
    }

    //Getters:
    get startDay() {
        return this.startDay;
    }
    get endDay() {
        return this.startDay;
    }
    get eventName() {
        return this.startDay;
    }
    get location() {
        return this.startDay;
    }
    get description() {
        return this.startDay;
    }
    get Users() {
        return this.startDay;
    }

    /**
     * @param: startDay,endDay, location, description
     * @param startDay - the start day of the events
     * @param endDay - the last day of the events
     * @param location - the location of the events.
     * @param description = the description of the events
     * 
     * @author Guan Li
     * @return an Event object
     */
    createEvent(startDay,endDay, location, description){
        //TODO:
    }
}

