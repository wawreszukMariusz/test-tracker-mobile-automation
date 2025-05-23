const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class AddTestCasePage extends BasePage {
  get inputTitle() {
    return $('//*[@resource-id="input_title"]');
  }

  get input() {
    return $('//*[@resource-id="input"]');
  }

  get isAutomatedCheckBox() {
    return $("//android.widget.CheckBox");
  }

  get addTestCaseButton() {
    return $('//*[@resource-id="test_case_button"]');
  }

  async screenDisplayed() {
    await this.mainBannerDisplayed();
    await expect(this.inputTitle).toBeDisplayed();
    await expect(this.input).toBeDisplayed();
    await expect(this.isAutomatedCheckBox).toBeDisplayed();
    await expect(this.addTestCaseButton).toBeDisplayed();
  }
}

module.exports = new AddTestCasePage();
