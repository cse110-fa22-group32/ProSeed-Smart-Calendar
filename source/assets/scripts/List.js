/**
 * List.js
 * @author Yuelin Dai
 * @summary File contains List class and functions.
 *
 * Created at : 2022-11-20 11:30 AM
 * Last Modified : 2022-11-20 11:30 AM
 */

/** Class List */
class List {
  /**
   * @author Yuelin Dai
   * Constructs a list object from the class
   * @constructor
   *
   * @param {string} title title of list
   * @param {string} lastUpdated last updated date; format: "MM-DD-YY"
   * @param {string} bindedCalendarID ID of the binded calendar
   * @param {{number: Task}} tasks tasks in list, key is task's unique ID
   */
  constructor(title, lastUpdated, bindedCalendarID, tasks) {
    this.title = title;
    this.lastUpdated = lastUpdated;
    this.bindedCalendarID = bindedCalendarID;
    this.tasks = tasks;
  }

  // Getters:

  /**
   * @author Yuelin Dai
   * @return lastUpdated
   */
  get LastUpdated() {
    return this.lastUpdated;
  }

  /**
   * @author Yuelin Dai
   * @return title
   */
  get Title() {
    return this.title;
  }

  /**
   * @author Yuelin Dai
   * @return bindedCalendarID
   */
  get BindedCalendarID() {
    return this.bindedCalendarID;
  }

  /**
   * @author Yuelin Dai
   * @return tasks
   */
  get Tasks() {
    return this.tasks;
  }

  /**
   * @author Yuelin Dai
   * @return array of tasks sorted by due dates
   */
  get SortedTasks() {
    let tasksAr = Object.values(this.tasks);

    // sort by due dates
    tasksAr.sort((task1, task2) => {
      // comparator
      let date1 = new Date(task1.DueDate);
      let date2 = new Date(task2.DueDate);

      if (date1 < date2) {
        return -1;
      }
      if (date1 > date2) {
        return 1;
      }
      return 0;
    });

    return tasksAr;
  }

  /**
   * @param: task
   * @param {Task} task - task that will be added
   *
   * @author Yuelin Dai
   */
  AddTask(task) {
    this.tasks[task.TaskID] = task;
  }
}
