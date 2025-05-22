const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class AddTestStepPage extends BasePage {
  get mainBannerLogo() {
    return $('//*[@resource-id="main_banner_logo"]');
  }

  get expectedLabel() {
    return $$('//*[@resource-id="expected_label"]');
  }

  get expectedInput() {
    return $$('//*[@resource-id="expected_input"]');
  }

  get resultLabel() {
    return $$('//*[@resource-id="result_label"]');
  }

  get resultInput() {
    return $$('//*[@resource-id="result_input"]');
  }

  get addMoreButton() {
    return $('//*[@resource-id="custom_small_button"]');
  }

  get addTestStepButton() {
    return $('//*[@resource-id="custom_button"]');
  }

  async testStepDisplayed(index) {
    await this.expectedLabel[index].waitForDisplayed();
    await expect(this.expectedInput[index]).toBeDisplayed();
    await expect(this.resultLabel[index]).toBeDisplayed();
    await expect(this.resultInput[index]).toBeDisplayed();
  }

  async screenDisplayed(isUpdate = false) {
    await this.mainBannerLogo.waitForDisplayed();
    await this.testStepDisplayed(0);
    if (!isUpdate) {
      await expect(this.addMoreButton).toBeDisplayed();
    }
    await expect(this.addTestStepButton).toBeDisplayed();
  }
}

module.exports = new AddTestStepPage();
