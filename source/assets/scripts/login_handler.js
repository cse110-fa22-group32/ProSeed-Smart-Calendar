/**
 * JSON string used to store user lists.
 * NOTE: this already is added in JsonPopulateTest.js with a "usersList" object, I can either use
 * that one or this one created.
 */
const loginList = `
  {
    "usersList" : [
      {
        "firstName" : "john",
        "lastName" : "doe",
        "username":"random@ucsd.edu",
        "password":"hello1",
        "profieldID" : "123456",
        "calenarID" : ""
      },
      {
        "firstName" : "bob",
        "lastName" : "carl",
        "username":"hscash@gmail.com",
        "password":"funny34Fish",
        "profieldID" : "678232",
        "calenarID" : ""
      },
      {
        "firstName" : "harry",
        "lastName" : "styles",
        "username":"csEnjoyer@yahoo.com",
        "password":"co0l4Swag",
        "profieldID" : "342234",
        "calenarID" : ""
      },
      {
        "firstName" : "steven",
        "lastName" : "khaw",
        "username":"skhaw@ucsd.edu",
        "password":"This123",
        "profieldID" : "10052001",
        "calenarID" : ""
      },
      {
        "firstName" : "stephen",
        "lastName" : "khaw",
        "username":"stkhaw@ucsd.edu",
        "password":"This123",
        "profieldID" : "11052002",
        "calenarID" : ""
      }
    ],
    "eventsList" : [],
    "tasksList" : []
  }
`;

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
 * @author Steven Khaw, Younus Ahmad
 * @summary adds event listener to ensure email and password are of correct format
 */
function ensureEmail() {
  const formElement = document.getElementById("login-form");

  formElement.addEventListener("submit", () => {
    const emailInputElement = document.getElementById("email-input");
    const passwordInputElement = document.getElementById("password-input");

    let authenticated = authenticateLogin(
      emailInputElement.value,
      passwordInputElement.value
    );
    if (
      isEmail(emailInputElement.value) &&
      isStrongPassword(passwordInputElement.value) &&
      authenticated
    ) {
      location.href = "./middle-ground.html";
    } else {
      alert(
        "Incorrect username/password combination provided or incorrectly formatted"
      );
      formElement.action = "index.html";
    }
  });
}

/**
 * @author Younus Ahmad
 * @param {string} email Email that user input into the email field on login page
 * @param {*} password  Password that user input into the password field on login
 * @returns True if there exists some user with that password combo, false otherwise
 */
function authenticateLogin(email, password) {
  const userData = loadJson([loginList]);
  const userList = userData[1];

  for (let user of userList) {
    if (email == user.username && password == user.password) {
      return true;
    }
  }
  return false;
}
