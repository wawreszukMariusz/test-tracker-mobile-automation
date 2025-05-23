const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class StartExecutionPage extends BasePage {
  get noResultsFoundTitle() {
    return $('//*[@resource-id="no_results_found_text"]');
  }

  get noResultsFoundSubtitle() {
    return $('//*[@resource-id="check_connection_text"]');
  }

  get executionNameInput() {
    return $('//*[@resource-id="input"]');
  }

  get scenarioBox() {
    return $$('//*[@resource-id="scenario_box"]');
  }

  get scenarioName() {
    return $$('//*[@resource-id="scenario_name"]');
  }

  get scenarioCheckBox() {
    return $$('//*[@resource-id="scenario_checkbox"]');
  }

  get startExecutionButton() {
    return $('//*[@resource-id="button"]');
  }

  async scenarioBoxDisplayed(index) {
    await this.scenarioBox[index].waitForDisplayed();
    await expect(this.scenarioName[index]).toBeDisplayed();
    await expect(this.scenarioCheckBox[index]).toBeDisplayed();
  }

  async screenDisplayed() {
    await this.scenarioBoxDisplayed(0);
    await this.mainBannerDisplayed();
    await expect(this.startExecutionButton).toBeDisplayed();
  }

  async screenDisplayedEmptyState() {
    await this.noResultsFoundTitle.waitForDisplayed();
    await this.noResultsFoundSubtitle.waitForDisplayed();
    await this.mainBannerDisplayed();
    await expect(this.startExecutionButton).toBeDisplayed();
  }
}

module.exports = new StartExecutionPage();
