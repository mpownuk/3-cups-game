const { Given, When, Then } = require("@wdio/cucumber-framework");

Given("I am on the {string} page", async (page) => {
  await browser.url(page);
});

Given("I am chosing {string}", async (dfLevel) => {
  await $(`//*[@id="${dfLevel}"]`).click();
});
