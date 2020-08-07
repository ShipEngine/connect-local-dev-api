import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import express from "express";
import { loadApp } from "@shipengine/integration-platform-loader";
import { CarrierApp } from "@shipengine/integration-platform-sdk/lib/internal";

import buildAPI from "../../src/build-api";

chai.use(chaiHttp);

describe("buildAPI", () => {
  it("sets the GET '/' endpoint", async () => {
    const server = express();
    const app = (await loadApp("test/fixtures/carrier-app")) as CarrierApp;

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

  it("sets the PUT '/connect' endpoint and returns 200 when given a valid input", async () => {
    const server = express();
    const app = (await loadApp("test/fixtures/carrier-app")) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/connect")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        connectionFormData: {
          email: "jdoe87@example.com",
          password: "p@$$w0rd",
          agree_to_eula: true,
        },
      })
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.eql({
          transaction: {
            id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
            session: {
              email: "jdoe87@example.com",
              password: "p@$$w0rd",
              agree_to_eula: true,
            },
          },
        });
      });
  });

  it("sets the PUT '/connect' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const app = (await loadApp("test/fixtures/carrier-app")) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/connect")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        connectionFormData: {
          email: "jdoe87@example.com",
          password: "p@$$w0rd",
          agree_to_eula: false,
        },
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_APP_ERROR");
      });
  });

  it("does not set the PUT '/connect' endpoint when connect is not defined", async () => {
    const server = express();
    const app = (await loadApp(
      "test/fixtures/carrier-app-without-methods",
    )) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/connect")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  xit("sets the PUT '/create-shipment' endpoint and returns 200 when given a valid input", async () => {
    const server = express();
    const app = (await loadApp("test/fixtures/carrier-app")) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/create-shipment")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        shipment: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.eql({
          transaction: {
            id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
            session: {},
          },
        });
      });
  });

  it("sets the PUT '/create-shipment' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const app = (await loadApp("test/fixtures/carrier-app")) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/create-shipment")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        shipment: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/create-shipment' endpoint when connect is not defined", async () => {
    const server = express();
    const app = (await loadApp(
      "test/fixtures/carrier-app-without-methods",
    )) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/create-shipment")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });

  xit("sets the PUT '/cancel-shipments' endpoint and returns 200 when given a valid input", async () => {
    const server = express();
    const app = (await loadApp("test/fixtures/carrier-app")) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/cancel-shipments")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        outcomes: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.eql({
          transaction: {
            id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
            session: {},
          },
        });
      });
  });

  it("sets the PUT '/cancel-shipments' endpoint and returns 400 when given an invalid input", async () => {
    const server = express();
    const app = (await loadApp("test/fixtures/carrier-app")) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/cancel-shipments")
      .send({
        transaction: {
          id: "6ad41b24-62a8-4e17-9751-a28d9688e277",
          session: {},
        },
        outcomes: {},
      })
      .end((_err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.haveOwnProperty("code", "ERR_INVALID_INPUT");
      });
  });

  it("does not set the PUT '/cancel-shipments' endpoint when connect is not defined", async () => {
    const server = express();
    const app = (await loadApp(
      "test/fixtures/carrier-app-without-methods",
    )) as CarrierApp;

    buildAPI(app, server);

    chai
      .request(server)
      .put("/cancel-shipments")
      .end((_err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.eqls({});
      });
  });
});
