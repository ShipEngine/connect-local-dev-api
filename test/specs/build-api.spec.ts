import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import express from "express";
import { loadApp } from "@shipengine/integration-platform-loader";
import { App } from "@shipengine/integration-platform-sdk/lib/internal";

import buildAPI from "../../src/build-api";

chai.use(chaiHttp);

describe("buildAPI", () => {
  it("sets the '/' path", async () => {
    const server = express();
    const app = (await loadApp("test/fixtures/carrier-app")) as App;

    buildAPI(app, server);

    chai
      .request(server)
      .get("/")
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.haveOwnProperty("name", "ShipEngine Testing");
        expect(res.body).to.haveOwnProperty("description", "Another test app!");
        expect(res.body).to.haveOwnProperty(
          "websiteURL",
          "http://www.carier-site.com/",
        );
        expect(res.body).to.haveOwnProperty("settingsForm");
        expect(res.body).to.haveOwnProperty("connectionForm");
        expect(res.body).to.haveOwnProperty("deliveryServices");
      });
  });
});
