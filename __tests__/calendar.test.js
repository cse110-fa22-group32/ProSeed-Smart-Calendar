describe('Testing Calendar Functionality', () => {

	beforeAll(async () => {
	  await page.goto('http://127.0.0.1:5502/source/calendar.html');
	});

	it('Title of Calendar page', async () => {
	  const title = await page.title();
      expect(title).toBe('ProSeed Calendar');
	}, 10000);
});