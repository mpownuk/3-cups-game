const { Given, When, Then } = require("@wdio/cucumber-framework");

Given("I am on the {string} page", async (page) => {
  await browser.url(page);
});

When("I am chosing {string}", async (dfLevel) => {
  await $(`//*[@id="${dfLevel}"]`).click();
  await $(`#df--lvl__select--btn`).click();
});

Then("I should be able to play game", async () => {
  await $(`//*[@id="start--game"]`).click();
  await browser.waitUntil(
    async () =>
      (await $(`//*[@id="notification"]`).getText()) === "Select cup...",
    {
      timeout: 7000,
      timeoutMsg: "expected text to be different after 7s",
    }
  );
});
