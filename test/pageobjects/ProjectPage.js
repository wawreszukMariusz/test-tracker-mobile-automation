const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class ProjectPage extends BasePage {
  get noResultsFoundTitle() {
    return $('//*[@resource-id="no_results_found_text"]');
  }

  get noResultsFoundSubtitle() {
    return $('//*[@resource-id="check_connection_text"]');
  }

  get projectImage() {
    return $$('//android.view.View[@content-desc="Project Image"]');
  }

  get projectName() {
    return $$('//*[@resource-id="project_item_box"]/android.widget.TextView');
  }

  get projectEditButton() {
    return $$('//*[@resource-id="project_item_update_button"]');
  }

  get projectBox() {
    return $$('//*[@resource-id="project_item_box"]');
  }

  get addProjectButton() {
    return $('//*[@resource-id="custom_button"]');
  }

  async projectBoxDisplayed(isTestExecution = false) {
    await this.projectImage[0].waitForDisplayed();
    await expect(this.projectName[0]).toBeDisplayed();
    await expect(this.projectBox[0]).toBeDisplayed();
    if (!isTestExecution) {
      await expect(this.projectEditButton[0]).toBeDisplayed();
    }
  }

  async screenDisplayed(isTestExecution = false) {
    await this.projectBoxDisplayed(isTestExecution);
    await this.mainBannerDisplayed();
    if (!isTestExecution) {
      await expect(this.addProjectButton).toBeDisplayed();
    }
  }

  async screenDisplayedEmptyState(isTestExecution = false) {
    await this.noResultsFoundTitle.waitForDisplayed();
    await this.noResultsFoundSubtitle.waitForDisplayed();
    await this.mainBannerDisplayed();
    if (!isTestExecution) {
      await expect(this.addProjectButton).toBeDisplayed();
    }
  }
}

module.exports = new ProjectPage();
