/**
 * Calendar.js
 * @author Steven Khaw
 * @summary File contains Calendar class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 4:30 PM
 */

export {Calendar};

/** Class Calendar */
class Calendar {

    /**
     * @author Steven Khaw
     * Constructs a calendar object from the class
     * @constructor 
     * 
     * @param {string} lastUpdated last updated date; format: "MM-DD-YY"
     * @param {string} title title of calendar
     * @param {string} calendarID unique ID for calendar
     * @param {Year[]} years years in calendar
     * @param {String[]} users users able to access calendar; format: "Firstname Lastname"
     */
    constructor(title, lastUpdated, calendarID, years, users) {
        this.title = title;
        this.lastUpdated = lastUpdated;
        this.calendarID = calendarID;
        this.years = years;
        this.users = users;
    }

    // Getters:

    /**
     * @author Steven Khaw
     * @return lastUpdated
     */
    get LastUpdated() {
        return this.lastUpdated;
    }

    /**
     * @author Steven Khaw
     * @return title
     */
     get Title() {
        return this.title;
    }

    /**
     * @author Steven Khaw
     * @return calendarID
     */
    get CalendarID() {
        return this.calendarID;
    }

    /**
     * @author Steven Khaw
     * @return years
     */
    get Years() {
        return this.years;
    }

        /**
     * @author Steven Khaw
     * @return users
     */
    get Users() {
        return this.users;
    }
}