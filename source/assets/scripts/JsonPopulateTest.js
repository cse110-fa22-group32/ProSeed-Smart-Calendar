
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);


function init() {
    let b = LoadJson(testJson);
    console.log(b);

    b[0].Show(2022,11);
    
}


