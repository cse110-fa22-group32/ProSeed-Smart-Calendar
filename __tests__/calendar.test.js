describe('Testing Calendar Functionality', () => {

	beforeAll(async () => {
	    await page.goto('https://cse110-fa22-group32.github.io/cse110-fa22-group32/calendar.html');
	});
	//TODO: Not sure why the test suite isn't working
	it('Title of Calendar page', async () => {
	  const title = await page.title();
	  console.log(title);
      expect(title).toBe('ProSeed Calendar');
	}, 10000);

	afterAll(async () => {
	});

	// it('Add event', async () => {

	// 	const event_title = "CSE 110 Project";
	// 	const date = new Date("2022", "10", "1");
	// 	date.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), 0);
	// 	const start_time = date;
	// 	const end_time = date;
	// 	const location = "New Jorsey";
	// 	const description = "Do the work";

	// 	await page.$eval('button[id=add-event-btn]', el => el.click());
	// 	await page.$eval('input[id=event-title]', (el,value) => el.value = value, event_title);
	// 	await page.$eval('input[id=date]', (el,value) => el.value = value, date);
	// 	await page.$eval('input[id=start-time]', (el,value) => el.value = value, start_time);
	// 	await page.$eval('input[id=end-time]', (el,value) => el.value = value, end_time);
	// 	await page.$eval('input[id=location]', (el,value) => el.value = value, location);
	// 	await page.$eval('textarea[id=description]', (el,value) => el.value = value, description);
	// 	await page.$eval('button[type=submit]', el => el.click());
	// 	const title = await page.title();
    //     expect(title).toBe('ProSeed Calendar');
	// }, 10000);

	// it('Add to-do', async () => {
	// 	// const title = await page.title();
	// 	// expect(title).toBe('ProSeed Calendar');
	// }, 10000);


});