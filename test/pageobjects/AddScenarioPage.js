const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class AddScenarioPage extends BasePage {
  get inputTitle() {
    return $('//*[@resource-id="input_title"]');
  }

  get input() {
    return $('//*[@resource-id="input"]');
  }

  get addScenarioButton() {
    return $('//*[@resource-id="scenario_button"]');
  }

  async screenDisplayed() {
    await this.mainBannerDisplayed();
    await expect(this.inputTitle).toBeDisplayed();
    await expect(this.input).toBeDisplayed();
    await expect(this.addScenarioButton).toBeDisplayed();
  }
}

module.exports = new AddScenarioPage();
