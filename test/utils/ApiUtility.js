const supertest = require("supertest");
const path = require("path");
require("dotenv").config();

class ApiUtility {
  constructor() {
    this.request = supertest(process.env.BACKEND_URL);
  }

  async register(email, password, company, accessCode) {
    const response = await this.request
      .post("/user")
      .send({ email, password, company, accessCode })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    await console.log("User registered");
  }

  async addProject(name, accessCode) {
    const imagePath = path.resolve(__dirname, "../assets", "small_image.jpg");

    const response = await this.request
      .post("/project")
      .field("name", name)
      .field("accessCode", accessCode)
      .attach("image", imagePath)
      .set("Accept", "application/json");

    return response.body.id;
  }

  async addScenario(name, projectId, accessCode) {
    const response = await this.request
      .post("/scenarios")
      .send({ name, projectId, accessCode })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    return response.body._id;
  }

  async addTestCase(name, scenarioId, isAutomated = false) {
    return this.request
      .post("/testCases")
      .send({ name, scenarioId, isAutomated })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
  }

  async addTestSteps(steps) {
    return this.request
      .post("/testSteps")
      .send(steps)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
  }
}

module.exports = new ApiUtility();
