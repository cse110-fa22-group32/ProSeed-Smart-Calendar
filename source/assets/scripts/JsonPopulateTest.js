
// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);


// no comments since this one is just for test and will be removed in final product
function init() {
    // create a calendar object from hard-coded json
    let calendarData = loadJson([testJson]);
    // console.log(b);

    // export calendar to json with different range of time selections
    let tuesJson = calendarData[0].Export([2022,2023],[11],[1]);
    let thursJson = calendarData[0].Export([-1],[11],[3]);

    // create a calendar object from multiple json
    calendarData = loadJson([tuesJson, thursJson]);
    calendarData[0].Show(2022,11);

    // simple tests for reading/writing json from/to local drive

    // temporarily deprecated
    // write json string to local drive
    // const downloadBtn = document.getElementById('download-btn');
    // downloadBtn.addEventListener('click', e => {
    //     download(tuesJson);
    // });

    // read local drive
    const uploadBtn = document.getElementById('upload-btn');
    uploadBtn.addEventListener('click', e => {
        const fileBtn = document.getElementById('files');
        fileBtn.click();
    });

    // select local drive 
    const fileBtn = document.getElementById('files');
    fileBtn.addEventListener('change',async e =>    {
        const [file] = e.target.files

        if(!file) {
                console.log('no file');
        }
        else {
                const data = await file.text();
                console.log(data);
        }
    });


}

