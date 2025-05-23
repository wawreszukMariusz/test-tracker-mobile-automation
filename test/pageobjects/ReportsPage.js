const { $ } = require("@wdio/globals");
const BasePage = require("./BasePage");

class ReportsPage extends BasePage {
  get noResultsFoundTitle() {
    return $('//*[@resource-id="no_results_found_text"]');
  }

  get noResultsFoundSubtitle() {
    return $('//*[@resource-id="check_connection_text"]');
  }

  get chartsButton() {
    return $('//*[@resource-id="option_box_container"]');
  }

  get reportBox() {
    return $$('//*[@resource-id="execution_section_box"]');
  }

  get reportExecutionName() {
    return $$('//*[@resource-id="execution__name"]');
  }

  get reportExecutionTime() {
    return $$('//*[@resource-id="execution_time"]');
  }

  get reportProjectName() {
    return $$('//*[@resource-id="execution_project"]');
  }

  get reportExecutionDate() {
    return $$('//*[@resource-id="execution_date"]');
  }

  get reportPassedTests() {
    return $$('//*[@resource-id="passed_tests"]');
  }

  get reportFailedTests() {
    return $$('//*[@resource-id="failed_tests"]');
  }

  async singleReportDisplayed(index) {
    await this.reportBox[index].waitForDisplayed();
    await expect(this.reportExecutionName[index]).toBeDisplayed();
    await expect(this.reportExecutionTime[index]).toBeDisplayed();
    await expect(this.reportProjectName[index]).toBeDisplayed();
    await expect(this.reportExecutionDate[index]).toBeDisplayed();
    await expect(this.reportPassedTests[index]).toBeDisplayed();
    await expect(this.reportFailedTests[index]).toBeDisplayed();
  }

  async screenDisplayed() {
    await this.chart.waitForDisplayed();
    await this.singleReportDisplayed(0);
    await this.mainBannerDisplayed();
  }

  async screenDisplayedEmptyState() {
    await this.noResultsFoundTitle.waitForDisplayed();
    await this.noResultsFoundSubtitle.waitForDisplayed();
    await this.mainBannerDisplayed();
    await expect(this.chartsButton).toBeDisplayed();
  }
}

module.exports = new ReportsPage();
