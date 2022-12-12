const { Given, When, Then } = require("@wdio/cucumber-framework");

Given("The game is starting {int} time", async (int) => {
  await $(`#df--lvl__select--btn`).click();
  await $(`//*[@id="start--game"]`).click();
  await browser.waitUntil(
    async () =>
      (await $(`//*[@id="notification"]`).getText()) === "Select cup...",
    {
      timeout: 4000,
      timeoutMsg: "expected text to appear after 4s",
    }
  );
});

When("I clicked on cup one", async () => {
  await $(`//*[@id="cupOne"]/button`).click();
});

Then("First selected cup should not be able to reselect", async () => {
  await expect($(`//*[@id="cupOne"]/button`)).toBeDisabled();
});

Then("I should win or play further", async () => {
  try {
    await expect($(`//*[@id="notification"]`)).toHaveTextContaining("You win!");
    console.log("user wins after firts choice");
  } catch {
    try {
      await expect($(`//*[@id="notification"]`)).toHaveText("not here..");
      await $(`//*[@id="cupTwo"]/button`).click();
      await expect($(`//*[@id="notification"]`)).toHaveText("You win!");
      console.log("user wins after second choice");
    } catch {
      await expect($(`//*[@id="notification"]`)).toHaveText("You lost");
      console.log("user lost");
    }
  }
});
