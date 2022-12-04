/**
 * @author Steven Khaw
 * @summary helper functions that check whether email and password are valid
 * 
 * Created at : 2022-11-28 3:00 PM
 * Last Modified : 2022-11-28 3:20 PM
 */

/**
 * @author Steven Khaw & CSE 110 Lab 8
 * @summary checks if email is of valid format
 * 
 * @param {string} email full email being checked
 * @return {boolean} true if valid email, false otherwise
 */
function isEmail(email) {
  const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(email);
}

/**
 * @author Steven Khaw & CSE 110 Lab 8
 * @summary The password's first character must be a letter, it must contain at 
 * least * 4 characters and no more than 20 characters and no characters 
 * other than * * letters, numbers and the underscore may be used
 * 
 * @param {string} password password being checked
 * @return true if password is valid, false otherwise 
 */
function isStrongPassword(password) {
  const pwRegex = /^[a-zA-Z]\w{3,19}$/;
  return pwRegex.test(password);
}

/**
 * @author Haoyi Wang
 * @summary Shows popup
 */
function helpPopup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}