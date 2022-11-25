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

  /** @type {number} */
  static counter = 0;

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
    // this.eventID = eventID;
    /** @type {number} */
    this.eventID = Event.counter++;
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
   * @return eventID
   */
  get EventID() {
    return this.eventID;
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
   * @param startDay - the start day of event
   * @param endDay - the last day of event
   * @param eventName - the name of event
   * @param location - the location of events
   * @param description - the description of event
   * 
   * @author Guan Li
   * @return an Event object
   */
  createEvent(startDay, endDay, eventName, location, description) {
    //TODO:
  }

  /**
   * Function to overrite the event objects
   * @param: startDay,endDay, location, description
   * @param {string} startDay - start day of event
   * @param {string} endDay - end day of event
   * @param {string} eventName - name of event
   * @param {string} location - location of event
   * @param {string} description - description of event
   * 
   * @author Younus Ahmad
   * @return an Event object
   */
  modifyEvent(startDay, endDay, eventName, location, description) {
    this.startDay = startDay;
    this.endDay = endDay;
    this.eventName = eventName;
    this.location = location;
    this.description = description;
  }



  
}

