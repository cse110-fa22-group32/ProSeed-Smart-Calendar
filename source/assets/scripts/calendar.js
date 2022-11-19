/**
 * Calendar.js
 * @author Steven Khaw
 * @summary File contains Calendar class and functions.
 * 
 * Created at : 2022-11-16 2:30 PM
 * Last Modified : 2022-11-16 4:30 PM
 */

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

    /**
     * @author Yuelin Dai
     * 
     * Display days, events and tasks for inputted month
     * @param {number} year - year number (2000 - 3000)
     * @param {number} month - month number (1 - 12)
     */
    Show(year, month) {
        const dayBlockAr = document.getElementsByClassName('calendar-day-block');

        const curMonthDay = new Date(String(year)+'-'+String(month)+'-'+String(1));

        const startDayIndex = (curMonthDay.getDay());

        const daysInMonth = new Date(year, month, 0).getDate();

        // // skip filling events/tasks if no events/tasks for this month
        // const noEventsTasks = (this.years[year-2000] == null) || (this.years[year-2000].months[month-1] == null);
        
        // fill in dates, events and tasks
        for(let blockCnt = 0; blockCnt < 42; blockCnt++) {

            // clear previous data
            dayBlockAr[blockCnt].innerHTML = '';

            if( blockCnt >= startDayIndex + daysInMonth || 
                blockCnt < startDayIndex) {
                continue;
            }
            // fill in dates
            dayBlockAr[blockCnt].innerHTML += '<p class="date-block">' +
            (blockCnt-startDayIndex+1) +
                '</p>';

            // if(noEventsTasks) {
            //     continue;
            // }

            // fill in events and tasks
            const curDay = this.years[year-2000].months[month-1].days[blockCnt-startDayIndex];
            if(curDay != null) {
                console.log(curDay);
                let fillCnt = 0;
                let extraCnt = 0;

                // fill in events
                for(let curEvent of curDay.events) {
                    if(++fillCnt > 3) {
                        extraCnt++;
                        continue;
                    }

                    dayBlockAr[blockCnt].innerHTML += 
                        '<div class="event-block">' +
                        curEvent.EventName +
                        '</div>';
                }

                // fill in tasks
                for(let curTask of curDay.tasks) {
                    if(++fillCnt > 3) {
                        extraCnt++;
                        continue;
                    }

                    dayBlockAr[blockCnt].innerHTML += 
                        '<div class="task-block">' +
                        curTask.TaskName +
                        '</div>';
                }

                // if needed, insert extra entries
                if(extraCnt > 0) {
                    dayBlockAr[blockCnt].innerHTML += 
                        '<div class="extra-block">' +
                        '+' + String(extraCnt) + ' extra' +
                        '</div>';
                }

            }
            
        }


    }
}