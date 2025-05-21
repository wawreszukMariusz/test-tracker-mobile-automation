const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class ScenarioPage extends BasePage {
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

  get scenarioBox() {
    return $$('//*[@resource-id="scenario_box"]');
  }

  get scenarioId() {
    return $$('//*[@resource-id="id_text_label"]');
  }

  get scenarioName() {
    return $$('//*[@resource-id="name_text_label"]');
  }

  get scenarioEditButton() {
    return $$('//*[@resource-id="update_button"]');
  }

  get scenarioDeleteButton() {
    return $$('//*[@resource-id="delete_button"]');
  }

  get addScenarioButton() {
    return $('//*[@resource-id="custom_button"]');
  }

  async scenarioDisplayed() {
    await this.scenarioDeleteButton[0].waitForDisplayed();
    await expect(this.scenarioEditButton[0]).toBeDisplayed();
    await expect(this.scenarioName[0]).toBeDisplayed();
    await expect(this.scenarioId[0]).toBeDisplayed();
    await expect(this.scenarioBox[0]).toBeDisplayed();
  }

  async screenDisplayed() {
    await this.scenarioDisplayed();
    await expect(this.mainBannerLogo).toBeDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.addScenarioButton).toBeDisplayed();
  }

  async screenDisplayedEmptyState() {
    await this.noResultsFoundTitle.waitForDisplayed();
    await this.noResultsFoundSubtitle.waitForDisplayed();
    await expect(this.mainBannerLogo).toBeDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.addScenarioButton).toBeDisplayed();
  }
}

module.exports = new ScenarioPage();
