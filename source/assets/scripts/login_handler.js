/**
 * @author Steven Khaw
 * @summary 
 * 
 * Created at : 2022-11-28 3:30 PM
 * Last Modified : 2022-11-28 4:00 PM
 */

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

function init() {

  ensureEmail();
}


/**
 * @author Steven Khaw
 * @summary adds event listener to ensure email and password are of correct format
 */
function ensureEmail() {
  const formElement = document.getElementById("login-form");

  formElement.addEventListener("submit", () => {
    const emailInputElement = document.getElementById("email-input");
    const passwordInputElement = document.getElementById("password-input");

    if ((isEmail(emailInputElement.value) && isStrongPassword(passwordInputElement.value))) {
      formElement.action = "middle-ground.html";
    } else {
      alert("Please check the formatting of your email and password.");
      formElement.action = "index.html";
    }
  });
}