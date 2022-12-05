const { Dialog } = require("puppeteer");

describe('Testing Login Functionality', () => {

	beforeAll(async () => {
	  await page.goto('http://127.0.0.1:5502/source/index.html');
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

		// let button = await page.$('button[type=submit]');

		// const [response] = await Promise.all([
		// 	page.waitForNavigation(),
		// 	// button.click(),
		// 	page.click('button[type=submit]'),
		// ]);

		await page.$eval('button[type=submit]', el => el.click());

		const title = await page.title();
        expect(title).toBe('ProSeed');

	}, 10000);

	it('Verify remember me', async () => {
		await page.goto('http://127.0.0.1:5502/source/index.html');
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
