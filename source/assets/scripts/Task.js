/**
 * Task.js
 * @author Guan Li
 * @summary File contains task class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 2:30 PM
 */

/** Class Task TODO ADD MORE DESCRIPTION  */
class Task {

    /**
     * @author Guan Li
     * Constructs a task object from the class
     * @constructor
     * 
     * @param {string} taskName - Name of the task
     * @param {string} tag - tags that the task belongs to. 
     * @param {string} createdDate - the date that the task created on. format: 'MM/DD/YY HH:MM'
     * @param {string} taskLastUpdated - the last time the task was updated. format: 'MM/DD/YY HH:MM'
     * @param {string[]} workDates - the workDates //TODO format: 'MM/DD/YY HH:MM'
     * @param {string} dueDate - the due dates on the task format: 'MM/DD/YY HH:MM'
     * @param {string} taskDescription - the description of the task
     * @param {Users[]} Users - The task user array " all person on task. "
     */
    constructor(taskName, tag, createdDate, taskLastUpdated, workDates, dueDate,taskDescription, Users) {
        this.taskName = taskName;
        this.tag = tag;
        this.createdDate = createdDate;
        this.taskLastUpdated = taskLastUpdated;
        this.workDates = workDates;
        this.dueDate = dueDate;
        this.taskDescription = taskDescription;
        this.Users = Users;
    }

    //Getters:

    /**
     * @author Guan Li
     * @return taskName
     */
    get taskName() {
        return this.taskName;
    }
    /**
     * @author Guan Li
     * @return tag
     */
     get tag() {
        return this.tag;
    }
    /**
     * @author Guan Li
     * @return createdDate
     */
     get createdDate() {
        return this.createdDate;
    }
    /**
     * @author Guan Li
     * @return taskLastUpdated
     */
     get taskLastUpdated() {
        return this.taskLastUpdated;
    }
    /**
     * @author Guan Li
     * @return taskLastUploaded
     */
     get taskLastUpdated() {
        return this.taskLastUpdated;
    }
    /**
     * @author Guan Li
     * @return workDates
     */
     get workDates() {
        return this.workDates;
    }
    /**
     * @author Guan Li
     * @return dueDate
     */
     get dueDate() {
        return this.dueDate;
    }
    /**
     * @author Guan Li
     * @return taskDescription
     */
     get taskDescription() {
        return this.taskDescription;
    }
    /**
     * @author Guan Li
     * @return Users array lists.
     */
     get Users() {
        return this.Users;
    }
    
}

