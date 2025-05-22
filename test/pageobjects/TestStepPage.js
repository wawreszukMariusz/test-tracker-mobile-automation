const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class TestCasePage extends BasePage {
  get mainBannerLogo() {
    return $('//*[@resource-id="main_banner_logo"]');
  }

  get mainBannerScreenName() {
    return $('//*[@resource-id="main_banner_text"]');
  }

  get noResultsFoundTitle() {
    return $('//*[@resource-id="no_results_found_text"]');
  }

  get noResultsFoundSubtitle() {
    return $('//*[@resource-id="check_connection_text"]');
  }

  get testStepBox() {
    return $$('//*[@resource-id="test_step_box"]');
  }

  get testStepId() {
    return $$('//*[@resource-id="id_text_label"]');
  }

  get testStepName() {
    return $$('//*[@resource-id="name_text_label"]');
  }

  get testStepEditButton() {
    return $$('//*[@resource-id="update_button"]');
  }

  get testStepDeleteButton() {
    return $$('//*[@resource-id="delete_button"]');
  }

  get expectedLabel() {
    return $$('//*[@resource-id="expected_label"]');
  }

  get expectedText() {
    return $$('//*[@resource-id="expected_text_label"]');
  }

  get resultLabel() {
    return $$('//*[@resource-id="result_label"]');
  }

  get resultText() {
    return $$('//*[@resource-id="result_text_label"]');
  }

  get addTestStepButton() {
    return $('//*[@resource-id="test_step_button"]');
  }

  async testStepDisplayed() {
    await this.testStepDeleteButton[0].waitForDisplayed();
    await expect(this.testStepEditButton[0]).toBeDisplayed();
    await expect(this.testStepName[0]).toBeDisplayed();
    await expect(this.testStepId[0]).toBeDisplayed();
    await expect(this.testStepBox[0]).toBeDisplayed();
    await expect(this.expectedLabel[0]).toBeDisplayed();
    await expect(this.expectedText[0]).toBeDisplayed();
    await expect(this.resultLabel[0]).toBeDisplayed();
    await expect(this.resultText[0]).toBeDisplayed();
  }

  async screenDisplayed() {
    await this.testStepDisplayed();
    await expect(this.mainBannerLogo).toBeDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.addTestStepButton).toBeDisplayed();
  }

  async screenDisplayedEmptyState() {
    await this.noResultsFoundTitle.waitForDisplayed();
    await this.noResultsFoundSubtitle.waitForDisplayed();
    await expect(this.mainBannerLogo).toBeDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.addTestStepButton).toBeDisplayed();
  }
}

module.exports = new TestCasePage();
