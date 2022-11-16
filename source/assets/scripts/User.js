/**
 * Year.js
 * @author Guan Li
 * @summary File contains user class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 2:30 PM
 */

/** Class User  */
class User {

    /**
     * @author Guan Li
     * Constructs a user object from the class
     * @constructor
     * 
     * @param {string} firstName - User's first name
     * @param {string} lastName - User's last name
     * @param {string} userName - User's account Username
     * @param {string} password - User's account password
     * @param {string} profileID - User's profile ID
     * @param {varName : varValue} calendarID - Store as calendar key as key and their value as whether or not the calendar is visible shown.
     */
    constructor(firstName, lastName, userName, password, profileID, calendarID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        //TODO: May change this struct a bit after certain code is modified.?
        this.profileID = profileID;
        this.calendarID = calendarID;
    }

    //Getters:

    /**
     * @author Guan Li
     * This is the getter for user's name.
     */
    get Name() {
        return this.firstName, this.lastName;
    }
    /**
     * @author Guan Li
     * This is the getter for account username:
     */
    get userName(){
        return this.userName;
    }

    //Methods:

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

