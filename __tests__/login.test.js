const { Dialog } = require("puppeteer");

describe('Testing Login Functionality', () => {

	beforeAll(async () => {
	  await page.goto('https://cse110-fa22-group32.github.io/cse110-fa22-group32/');
	});

	it('Title of login page', async () => {
	  const title = await page.title();
      expect(title).toBe('ProSeed Login');
	}, 10000);

	it('Attempting to login with random email/pass', async () =>{
		const email = "dlfjalfjl";
		const password = "jdlkfjalkjflkad";
		await page.$eval('input[id=email-input]', (el,value) => el.value = value, email);
		await page.$eval('input[id=password-input]', (el,value) => el.value = value, password);

		let button = await page.$('button[type=submit]');

		// Using page.on similar below to capture alert message
		page.on('dialog', async dialog =>{
			await button.click();
			expect(dialog.message()).toBe("Incorrect username/password combination provided or incorrectly formatted");
			await dialog.dismiss();
		})

		const title = await page.title();
        expect(title).toBe('ProSeed Login');
	}, 10000);

	it('Attempting to login with real login', async () => {
		const email = "random@ucsd.edu";
		const password = "hello1";
		await page.$eval('input[id=email-input]', (el,value) => el.value = value, email);
		await page.$eval('input[id=password-input]', (el,value) => el.value = value, password);
		await page.$eval('button[type=submit]', el => el.click());

		const title = await page.title();
        expect(title).toBe('ProSeed');

	}, 10000);

	it('Verify remember me', async () => {
		await page.goto('https://cse110-fa22-group32.github.io/cse110-fa22-group32/');
		const email = "random@ucsd.edu";
		const password = "hello1";
		await page.$eval('input[id=email-input]', (el,value) => el.value = value, email);
		await page.$eval('input[id=password-input]', (el,value) => el.value = value, password);
		await page.$eval('input[id=remember-box]', el => el.value = "checked");
		await page.$eval('button[type=submit]', el => el.click());
		// await page.$eval('p[class=title]', el => el.click())
		// // await page.goto('http://127.0.0.1:5502/source/index.html');
		//TODO: not done with middle ground
		const title = await page.title();
		expect(title).toBe('ProSeed');
	}, 10000);
});

describe('Testing Middleground Functionality', () => {

	it('Create a new calendar', async () => {
		//Login from sign in page to reach middleground page
		await page.goto('https://cse110-fa22-group32.github.io/cse110-fa22-group32/');
		const email = "random@ucsd.edu";
		const password = "hello1";
		await page.$eval('input[id=email-input]', (el,value) => el.value = value, email);
		await page.$eval('input[id=password-input]', (el,value) => el.value = value, password);
		await page.$eval('button[type=submit]', el => el.click());

		//Begin new calendar creation here
		const calendarName = "Work";
		await page.$eval('button[id=new-calendar-button]', el => el.click());
		await page.$eval('input[id=calendar-name]', (el, value) => el.value = value, calendarName);
		await page.$eval('button[id=btn-submit]', el => el.click());

		const container = await page.$('#Calendars');
		const gridItems = await container.$$("div.grid-item");
		const text = await gridItems[0].$$('p');
		const title = await (await text[0].getProperty('textContent')).jsonValue();
		const lastUpdated = await (await text[1].getProperty('textContent')).jsonValue();
		expect(title).toBe("Title: Work");
		let date = new Date();
		let reformatedDate = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
		expect(lastUpdated).toBe(`Last Updated: ${reformatedDate}`);
	}, 10000);

	it('Open a calendar', async () => {
		//This is a continuation from previous test (i.e. browser does not reset)
		//Access the container that holds the buttons to click
		const container = await page.$('#Calendars');
		let gridItems = await container.$$("div.grid-item");
		const row = await gridItems[0].$('.row');
		const buttons = await row.$$('button');
		//Click open calendar and wait for it to refresh
		await buttons[0].click();
		await page.waitForNavigation();
		const pageTitle = await page.title();
		expect(pageTitle).toBe("ProSeed Calendar");
		//Ensure that on blank calendar all day blocks are there
		const days = await page.$$('.calendar-day-block');
		const pastMonthDays = await page.$$('.calendar-day-block othermonth');
		const extraDays = await page.$$('.calendar-day-block extra othermonth hidden');
		expect(days.length + pastMonthDays.length + extraDays.length).toBe(42);
	}, 10000);

	it('Delete a calendar', async () => {
		//This is a continuation from previous test (i.e. browser does not reset)
		//Access the container that holds the buttons to click
		await page.goBack();
		const container = await page.$('#Calendars');
		let gridItems = await container.$$("div.grid-item");
		const row = await gridItems[0].$('.row');
		const buttons = await row.$$('button');
		//Click delete event and let page refresh
		await buttons[1].click();
		await page.waitForNavigation();
		//Reload array of grid-items and verify that it did delete item
		const pageTitle = await page.title();
		const container2 = await page.$('#Calendars');
		const gridItems2 = await container2.$$("div.grid-item");
		expect(pageTitle).toBe("ProSeed");
		expect(gridItems2.length).toBe(0);
	}, 10000);

	it('Upload a calendar', async () => {
		//TODO: DO THIS ONE LATER. UPLOAD test-calendar.js and check that
		//the events are poperly loaded in
	}, 30000);
});

describe('Testing Calendar Functionality', () => {
	beforeAll(async () => {
		//Login to middleground page
		const email = "random@ucsd.edu";
		const password = "hello1";
		await page.goto('https://cse110-fa22-group32.github.io/cse110-fa22-group32/');
		await page.$eval('input[id=email-input]', (el,value) => el.value = value, email);
		await page.$eval('input[id=password-input]', (el,value) => el.value = value, password);
		await page.$eval('button[type=submit]', el => el.click());

		//Create new calendar to test
		const calendarName = "Work";
		await page.$eval('button[id=new-calendar-button]', el => el.click());
		await page.$eval('input[id=calendar-name]', (el, value) => el.value = value, calendarName);
		await page.$eval('button[id=btn-submit]', el => el.click());

		//Open calendar
		const container = await page.$('#Calendars');
		let gridItems = await container.$$("div.grid-item");
		const row = await gridItems[0].$('.row');
		const buttons = await row.$$('button');
		//Click open calendar and wait for it to refresh
		await buttons[0].click();
		await page.waitForNavigation();
	});

	it('Click on home button', async () => {
		//Loading in home button
		const homeBtn = await page.$('#leaf-icon');

		//Check home button functionality
		await homeBtn.click();
		await page.waitForNavigation();
		//console.log(await page.title());
		expect(await page.title()).toBe("ProSeed");
		await page.goBack();
		expect(await page.title()).toBe("ProSeed Calendar");
	}, 10000);

	it('Calendar Traversal', async () => {
		const btnContainer = await page.$('#calendar-title-bar-component');
		const traversalBtns = await btnContainer.$$('.calendar-title-bar-btn');
		const calHeader = await page.$('#calendar-head > h1');
		//Test that default calendar view is loaded in as December 2022 (for this calendar)
		let date = await (await calHeader.getProperty('textContent')).jsonValue();
		expect(date).toBe("December 2022");
		//Traverse one month back
		await traversalBtns[0].click();
		date = await (await calHeader.getProperty('textContent')).jsonValue();
		expect(date).toBe("November 2022");
		//Traverse all the way to beginning of year
		for (let i = 0; i < 10; i++) {
			await traversalBtns[0].click();
		}
		date = await (await calHeader.getProperty('textContent')).jsonValue();
		expect(date).toBe("January 2022");
		//Traverse one month back, should wrap around to previous year
		await traversalBtns[0].click();
		date = await (await calHeader.getProperty('textContent')).jsonValue();
		expect(date).toBe("December 2021");
		//Traverse all the way forward to the next year and check that it wraps
		for (let i = 0; i < 13; i++) {
			await traversalBtns[1].click();
		}
		date = await (await calHeader.getProperty('textContent')).jsonValue();
		expect(date).toBe("January 2023");

		//Check traversing back one year
		await traversalBtns[2].click();
		date = await (await calHeader.getProperty('textContent')).jsonValue();
		expect(date).toBe("January 2022");

		//Check traversing forward one year
		await traversalBtns[3].click();
		date = await (await calHeader.getProperty('textContent')).jsonValue();
		expect(date).toBe("January 2023");
		date = await (await calHeader.getProperty('textContent')).jsonValue();
	}, 10000);

	it('Edge Case: check for date bounds', async () => {
		//TODO: this requires needing to load in a calendar that is initialized
		//to January 0000 and one for whatever the max value is
	}, 10000);

	it('Add calendar event: check in main view', async () => {
		const tail = await page.$('#calendar-tail');
		const tailBts = await tail.$$('.calendar-tail-btn');
		//Click add event button and look for form to read values
		await tailBts[0].click();
		const eventForm = await page.$('#add-event-form');	//Not even sure if I actually need to use this because i can just use .$eval()
		const eventName = "Test Event1";
		//For this test, we create an event on an arbitrary day in December
		const testDate = "2022-12-05";
		const startTime = "13:30";
		const endTime = "15:30";
		const location = "UCSD";
		const description = "Sample description!!!";
		//Load in the parameters of event into the create event form
		await page.$eval('input[id=event-title]', (el, value) => el.value = value, eventName);
		await page.$eval('input[id=date]', (el, value) => el.value = value, testDate);
		await page.$eval('input[id=start-time]', (el, value) => el.value = value, startTime);
		await page.$eval('input[id=end-time]', (el, value) => el.value = value, endTime);
		await page.$eval('input[id=location]', (el, value) => el.value = value, location);
		await page.$eval('textarea[id=description]', (el, value) => el.value = value, description);
		//await page.$eval('button[id=save-event-btn]', el => el.click());
		//await page.$eval('button[type=submit]', el => el.click());
		const saveBtn = await page.$('#save-event-btn');
		await saveBtn.click();

		//Event is now created, now to check whether it is populated into correct space
		const calMain = await page.$('#calendar-day-main');
		const dayBlocks = await calMain.$$('.calendar-day-block:not(.othermonth)');
		const eventsList = await dayBlocks[4].$$('.event-block');
		//const title = await (await text[0].getProperty('textContent')).jsonValue();
		const eventTitle = await (await eventsList[0].getProperty('textContent')).jsonValue();
		expect(eventTitle).toBe(eventName);


	}, 10000);

	it('Add calendar event: Check in taskbar view', async () => {
		//Event is now created, now to check whether it is populated into correct space
		const calMain = await page.$('#calendar-day-main');
		const dayBlocks = await calMain.$$('.calendar-day-block:not(.othermonth)');
		//const eventsList = await dayBlocks[4].$$('.event-block');
		//Click on dayblock with event created to see if taskbar is populated
		await dayBlocks[4].click();
		const sidebar = await page.$('.sidebar');
		const sidebarHeader = await (await (await sidebar.$('.sidebar-title')).getProperty('textContent')).jsonValue();
		const sidebarEvents = await sidebar.$('.sidebar-events');
		const sidebarEventsList = await sidebarEvents.$$('event-block');
		//Event was given the date of 2022-12-05, which is a monday 
		expect(sidebarHeader).toBe("12/5/2022 Monday");
		expect(sidebarEventsList.length).toBe(1);

		//Check that the actual event details were populated correctly as well (not sure why I can't access shadow root)
		// const shadowRoot = await sidebarEventsList[0].getProperty("shadowRoot");
		// const sideEventName = await shadowRoot.$('#title');
		// const title = await (await sideEventName.getProperty()).jsonValue();
		// console.log(title);
	}, 10000);

	it('Delete Calendar Event', async () => {
			//Event is now created, now to check whether it is populated into correct space
			const calMain = await page.$('#calendar-day-main');
			const dayBlocks = await calMain.$$('.calendar-day-block:not(.othermonth)');
			//const eventsList = await dayBlocks[4].$$('.event-block');
			//Click on dayblock with event created to see if taskbar is populated
			//For some reason the shadowRoot is not being registered as something that can be indexed? idk
			// await dayBlocks[4].click();
			// const sidebar = await page.$('.sidebar');
			// const sidebarEvents = await sidebar.$('.sidebar-events');
			// const sidebarEventsList = await sidebarEvents.$$('event-block');
			// const shadowRoot = await sidebarEventsList[0].getProperty("shadowRoot");
			// const buttons = await shadowRoot.$$("button");
			// console.log(sidebarEventsList.length);
	}, 10000);

	it('Edit Calendar Event', async () => {
		const calMain = await page.$('#calendar-day-main');
		const dayBlocks = await calMain.$$('.calendar-day-block:not(.othermonth)');
		const eventsList = await dayBlocks[4].$$('.event-block');

		await dayBlocks[4].click();
		const sidebar = await page.$('.sidebar');
	}, 10000);
});
