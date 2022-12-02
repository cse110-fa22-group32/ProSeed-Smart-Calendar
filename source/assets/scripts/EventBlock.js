//create a event block in side bar.

class EventBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const divBlock = document.createElement("div");
    const style = document.createElement("style");

    style.innerHTML = `
            div {
                border-style: none;        
                margin-top: 10px;
                display: grid;
                height: 40px;
                grid-template-columns: repeat(22, auto);
                background: #54CB9C;
                border-radius: 62.5407px;
                padding-left: 10px
            }
            #Id {
                display: none;
            }
            #title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                min-width: 55px;
                max-width: 120px;
                font-size: 22px;
                align-self: center;
                grid-column-start: 2;
                grid-column-end: 6;
                margin: 0%;
            }
            h4 {
                font-weight: normal;
                font-size: 15px;
                align-self: center;
                margin: 0%;
            }
            #start {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                min-width: 55px;
                align-self: center;
                grid-column-start: 8;
                grid-column-end: 14;
            }
            #delete {
                align-self: center;
                border-radius: 50px;
                width: 32px;
                height: 32px;
                background: #F47676;
                grid-column-start: 15;
                grid-column-end: 17;
            }
            #edit {
                align-self: center;
                border-radius: 50px;
                width: 32px;
                height: 32px;
                background: #F4F276;
                grid-column-start: 18;
                grid-column-end: 20;
            }
            #delete:hover, #edit:hover {
                background-color: RoyalBlue;
              }
        `;

    this.shadowRoot.append(style, divBlock);
  }

  /**
   * @param {Object} data - The data to pass into the <event-block>, must be of the
   * following format:
   * {
   *    "id": number,
   *    "title": "string",
   *    "start" : "string",
   *    "end": "string"
   * }
   */
  set eventData(data) {
    const article = this.shadowRoot.querySelector("div");
    article.innerHTML = `
        <p id="Id">${data.id}</p>
        <h3 id="title">${data.title}</h3>
        <h4 id="start">${data.start}->${data.end}</h4>
        <button id="delete">D</button>
        <button id="edit">E</button>
        `;
  }
}

customElements.define("event-block", EventBlock);
