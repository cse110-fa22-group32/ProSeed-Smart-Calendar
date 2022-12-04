describe('Testing Calendar Functionality', () => {

	beforeAll(async () => {
	    await page.goto('https://cse110-fa22-group32.github.io/cse110-fa22-group32/');
	});
	//TODO: Not sure why the test suite isn't working
	it('Title of Calendar page', async () => {
	  const title = await page.title();
	  console.log(title);
      expect(title).toBe('ProSeed Login');
	}, 10000);

	afterAll(async () => {
	});

});