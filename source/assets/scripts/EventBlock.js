//create a event block in side bar.

class EventBlock extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        const divBlock = document.createElement('div');
        const style = document.createElement('style');

        style.innerHTML = `
            div {
                border:white 2px solid;
                background-color: yellow;
                margin: 0%;
                display: grid;
                height: 30px;
                grid-template-columns: repeat(22, auto);
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
                grid-column-start: 15;
                grid-column-end: 17;
            }
            #edit {
                align-self: center;
                grid-column-start: 18;
                grid-column-end: 20;
            }
        `;

        this.shadowRoot.append(style,divBlock);

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
    set eventData(data){
        const article = this.shadowRoot.querySelector('div');
        article.innerHTML = `
        <p id="Id">${data.id}</p>
        <h3 id="title">${data.title}</h3>
        <h4 id="start">${data.start}->${data.end}</h4>
        <button id="delete">D</button>
        <button id="edit">E</button>
        `;
    }
}


customElements.define('event-block', EventBlock);