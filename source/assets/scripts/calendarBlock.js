/**
 * CalendarBlock.js
 * @author Guan Li
 * @summary A shadow DOM to implement the calendar blocks.
 *
 * Created at : 2022-11-21 2:30 PM
 * Last Modified : 2022-11-21 8:30 PM
 */

/**
 * THIS FILE DOSN"T WORK. DON"T LOOK
 */

class CalendarBlock extends HTMLElement {
  // Called once when document.createElement('recipe-card') is called, or
  // the element is written into the DOM directly as <recipe-card>
  constructor() {
    //Inheritation: Initlaize the objects.
    super(); // Inheret everything from HTMLElement

    //Attach the shadow DOM to this Web Component (leave the mode open)
    let shadowElement = this.attachShadow({ mode: "open" });
    //Create an <article> element - This will hold our markup once our data is set
    let article = document.createElement("article");
    //Create a style element - This will hold all of the styles for the Web Component
    let style = document.createElement("style");
    style.textContent = `
      * {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
      }
      a {
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }
      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }
      div.rating>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }
      article>img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }
      p.ingredients {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }
      p.organization {
        color: black !important;
      }
      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p:not(.title),
      span,
      time {
        color: #70757A;
        font-size: 12px;
      }
    `;
    //Insert all of the styles into the <style> element you just made
    //   const linkElem = document.createElement("link");
    //   linkElem.setAttribute("href", "../styles/calendarBlock.css");
    // Append the <style> and <article> elements to the Shadow DOM
    shadowElement.append(style);
    shadowElement.append(article);
  }
  /**
   * Called when the .data property is set on this element.
   * @param {Object} data - The data to pass into the <recipe-card>, must be of the
   *                        following format:
   *                        {
   *                          "lastUpdated" : "",
   *                          "title" : "Work's calendar",
   *                          "calendarID" : "",
   *                        }
   */
  set data(data) {
    if (!data) return;
    let article = this.shadowRoot.querySelector("article");
    //     article.innerHTML = `<img src= "../middle_ground_test_file_temp/calendarIcon.png" alt= "calendar">
    //     <p class="title"> <a href="../calendar.html">${data["title"]}</a> </p>
    //   <p class="organization">${data["lastUpdated"]}</p>
    //   <p class="ingredients">${data["calendarID"]}</p>`;
    article.innerHTML = `<p>HELLO WORLD</p>`;
  }
}

customElements.define("calendar-block", CalendarBlock);
