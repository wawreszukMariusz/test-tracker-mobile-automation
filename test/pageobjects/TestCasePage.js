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

  get testCaseBox() {
    return $$('//*[@resource-id="test_case_box"]');
  }

  get testCaseId() {
    return $$('//*[@resource-id="id_text_label"]');
  }

  get testCaseName() {
    return $$('//*[@resource-id="name_text_label"]');
  }

  get testCaseEditButton() {
    return $$('//*[@resource-id="update_button"]');
  }

  get testCaseDeleteButton() {
    return $$('//*[@resource-id="delete_button"]');
  }

  get addTestCaseButton() {
    return $('//*[@resource-id="custom_button"]');
  }

  async testCaseDisplayed() {
    await this.testCaseDeleteButton[0].waitForDisplayed();
    await expect(this.testCaseEditButton[0]).toBeDisplayed();
    await expect(this.testCaseName[0]).toBeDisplayed();
    await expect(this.testCaseId[0]).toBeDisplayed();
    await expect(this.testCaseBox[0]).toBeDisplayed();
  }

  async screenDisplayed() {
    await this.testCaseDisplayed();
    await expect(this.mainBannerLogo).toBeDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.addTestCaseButton).toBeDisplayed();
  }

  async screenDisplayedEmptyState() {
    await this.noResultsFoundTitle.waitForDisplayed();
    await this.noResultsFoundSubtitle.waitForDisplayed();
    await expect(this.mainBannerLogo).toBeDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.addTestCaseButton).toBeDisplayed();
  }
}

module.exports = new TestCasePage();
