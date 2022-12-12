const { Given, When, Then } = require("@wdio/cucumber-framework");

When("I click start game button", async () => {
  await $(`#df--lvl__select--btn`).click();
});

Then("The game should be start", async () => {
  await $(`//*[@id="start--game"]`).click();
  await browser.waitUntil(
    async () =>
      (await $(`//*[@id="notification"]`).getText()) === "Select cup...",
    {
      timeout: 7000,
      timeoutMsg: "expected text to appear after 7s",
    }
  );
});
