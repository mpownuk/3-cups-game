const { Given, When, Then } = require("@wdio/cucumber-framework");

Given("I am on the {string} page", async (page) => {
  await browser.url(page);
});

When("I am chosing {string}", async (dfLevel) => {
  await $(`//*[@id="${dfLevel}"]`).click();
  await $(`#df--lvl__select--btn`).click();
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
  await expect($("#flash")).toBeExisting();
  await expect($("#flash")).toHaveTextContaining(message);
});
