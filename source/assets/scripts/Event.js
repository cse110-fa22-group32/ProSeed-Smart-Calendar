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
     * @param {string} startDay - start day of event
     * @param {string} endDay - end day of event
     * @param {string} eventName - name of event
     * @param {string} location - location of event
     * @param {string} description - description of event
     */
    constructor(startDay, endDay, eventName, location, description) {
        this.startDay = startDay;
        this.endDay = endDay;
        this.eventName = eventName;
        this.location = location;
        this.description = description;
    }

    // Getters:

    /**
     * @author Guan Li
     * @return startDay
     */
    get StartDay() {
        return this.startDay;
    }

    /**
     * @author Guan Li
     * @return endDay
     */
    get EndDay() {
        return this.endDay;
    }

    /**
     * @author Guan Li
     * @return eventName
     */
    get EventName() {
        return this.eventName;
    }

    /**
     * @author Guan Li
     * @return location
     */
    get Location() {
        return this.location;
    }

    /**
     * @author Guan Li
     * @return eventDescription
     */
    get Description() {
        return this.description;
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
    createEvent(startDay, endDay, location, description){
        //TODO:
    }
}

