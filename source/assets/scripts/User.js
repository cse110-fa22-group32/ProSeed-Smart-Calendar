/**
 * User.js
 * @author Guan Li
 * @summary File contains User class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 2:30 PM
 */

 export {User};

/** Class User  */
class User {

    /**
     * @author Guan Li
     * Constructs a user object from the class
     * @constructor
     * 
     * @param {string} firstName - firstname of user
     * @param {string} lastName - lastname of user
     * @param {string} userName - username of user
     * @param {string} password - password of user
     * @param {string} profileID - profileID of user
     * @param {string[]} calendarID - calendarIDs user has access to
     */
    constructor(firstName, lastName, username, password, profileID, calendarID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        //TODO: May change this struct a bit after certain code is modified.?
        this.profileID = profileID;
        this.calendarID = calendarID;
    }

    // Getters:

    /**
     * @author Guan Li
     * @return firstName, lastName
     */
    get Name() {
        return this.firstName, this.lastName;
    }

    /**
     * @author Guan Li
     * @return username
     */
    get Username() {
        return this.username;
    }

    // Methods:

    /**
     * @author Guan Li
     * Currently not implemented.
     * @param specific_calendarID - A specific calendar ID owned by the user in the clanendar ID array
     * @return Displays the calendar of the chosen ID
     */
    showCalendar(specific_calendarID){
        //Calendar display here.
    }

    /**
     * @author Guan Li
     * Currently not implemented.
     * @return User's infromation - for other implementation
     */
    displayUserInformation(){

    }

    //TODO: Maybe have something for user access?
    
}

