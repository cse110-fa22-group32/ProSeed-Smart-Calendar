/**
 * Task.js
 * @author Guan Li, Steven Khaw, Christopher Han
 * @summary File contains Task class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 2:30 PM
 */

/** Class Task TODO ADD MORE DESCRIPTION  */
class Task {

  /** @type {number} */
  static counter = 0;

  /**
   * @author Guan Li
   * Constructs a task object from the class
   * @constructor
   * 
   * @param {string} taskName - name of task
   * @param {string[]} tags - tags that task belongs to
   * @param {string} dueDate - due date of task; format: 'MM/DD/YY HH:MM'
   * @param {string} description - description of task
   * @param {boolean} complete - boolean of task completion
   */
  constructor(taskName, tags, dueDate, description, complete) {
    this.taskName = taskName;
    // this.taskID = taskID;
    /** @type {number} */
    this.taskID = Task.counter++;
    this.tags = tags;
    this.dueDate = dueDate;
    this.description = description;
    this.complete = complete;
  }

  // Getters:

  /**
   * @author Guan Li
   * @return taskName
   */
  get TaskName() {
    return this.taskName;
  }

  /**
   * @author Guan Li
   * @return taskID
   */
  get TaskID() {
    return this.taskID;
  }

  /**
   * @author Guan Li
   * @return tags
   */
  get Tags() {
    return this.tags;
  }

  /**
   * @author Guan Li
   * @return dueDate
   */
  get DueDate() {
    return this.dueDate;
  }

  /**
   * @author Guan Li
   * @return description
   */
  get Description() {
    return this.description;
  }

  /**
   * @author Steven Khaw
   * @return complete
   */
  get Complete() {
    return this.complete;
  }


  // Setters:

  /**
   * @author Christopher Han
   * @param {string} new task name
   */
  set modifyTaskName(newTaskName) {
    this.taskName = newTaskName;
  }

  /**
   * @author Christopher Han
   * @param {string[]} new tags
   */
  set modifyTaskTags(newTags) {
    this.tags = newTags;
  }

  /**
   * @author Christopher Han
   * @param {string} new due date
   */
  set modifyDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  /**
   * @author Christopher Han
   * @param {string} new task description
   */
  set modifyTaskDescription(newTaskDescription) {
    this.description = newTaskDescription;
  }
}

