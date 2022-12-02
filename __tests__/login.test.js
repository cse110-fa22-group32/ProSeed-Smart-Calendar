
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
		await page.$eval('button[type=submit]', el => el.click());
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
	it('Make sure signed in works', async () => {
		const title = await page.title();
		expect(title).toBe('ProSeed');
	}, 10000);
});