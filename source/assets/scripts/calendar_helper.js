/**
 * calendar_helper.js
 * @author Christopher Han
 * @summary File contains necessary functions for calendar
 * 
 * Created at : 2022-11-18 2:30 PM
 * Last Modified : TODO
 */

window.addEventListener('DOMContentLoaded', init);

const monthBtnUp = document.getElementById('calendar-month-btn-up');
const monthBtnDown = document.getElementById('calendar-month-btn-down');
const yearBtnUp = document.getElementById('calendar-year-btn-up');
const yearBtnDown = document.getElementById('calendar-year-btn-down');

function init() {
    traverseMonth();
    traverseYear();
}

/**
 * @author Christopher Han
 * Traverses months when calendar month up/down buttons are clicked
 * 
 * @param
 * @return
 */
function traverseMonth() {
    monthBtnUp.addEventListener('click', function() {
        if (month === 1) {
            // go to previous year's December
        }
        else {
            // go to previous month
        }
    });

    monthBtnDown.addEventListener('click', function() {
        if (month === 12) {
            // go to next year's january
        }
        else {
            // go to next month
        }
    });
}

/**
 * @author Christopher Han
 * Traverses years when calendar year up/down buttons are clicked
 * 
 * @param
 * @return
 */
function traverseYear() {
    yearBtnUp.addEventListener('click', function() {
        // go to previous year
    });
    yearBtnDown.addEventListener('click', function() {
        // go to next year
    });
}