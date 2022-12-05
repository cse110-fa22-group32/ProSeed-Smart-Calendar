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
// 		expect(lastUpdated).toBe("Last Updated: 2022/12/4");
		
		let today = new Date();
		let month = today.getMonth() + 1;
		expect(lastUpdated).toBe("Last Updated: " + today.getFullYear() +"/" + month + "/" + today.getDate());
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
});
