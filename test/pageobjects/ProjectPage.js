const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class ProjectPage extends BasePage {
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

  get addProjectButton() {
    return $('//*[@resource-id="custom_button"]');
  }

  get singleProjectImage() {
    return $('//*[@resource-id="custom_button"]');
  }

  get singleProjectName() {
    return $('//*[@resource-id="project_item_text"]');
  }

  get singleProjectEditIcon() {
    return $('//*[@resource-id="project_item_update_button"]');
  }

  get singleProjectBox() {
    return $('//*[@resource-id="project_item_box"]');
  }

  async projectBoxDisplayed() {
    await this.singleProjectImage.waitForDisplayed();
    await expect(this.singleProjectName).toBeDisplayed();
    await expect(this.singleProjectEditIcon).toBeDisplayed();
    await expect(this.singleProjectBox).toBeDisplayed();
  }

  async screenDisplayed() {
    await this.projectBoxDisplayed();
    await expect(this.mainBannerLogo).toBeDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.addProjectButton).toBeDisplayed();
  }

  async screenDisplayedEmptyState() {
    await this.noResultsFoundTitle.waitForDisplayed();
    await this.noResultsFoundSubtitle.waitForDisplayed();
    await expect(this.mainBannerLogo).toBeDisplayed();
    await expect(this.mainBannerScreenName).toBeDisplayed();
    await expect(this.addProjectButton).toBeDisplayed();
  }
}

module.exports = new ProjectPage();
