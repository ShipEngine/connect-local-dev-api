import bodyParser from "body-parser";
import { Express, Request, Response } from "express";
import { CarrierApp } from "@shipengine/integration-platform-sdk/lib/internal";

export default function buildAPI(sdkApp: CarrierApp, server: Express) {
  server.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );
  server.use(bodyParser.json());

  server.get("/", getApp);

  sdkApp.connect && server.put("/connect", connect);

  // sdkApp.createShipment && sdkApp.put("/createShipment", createShipment);
  // sdkApp.cancelShipments && sdkApp.put("/cancelShipments", cancelShipments);
  // sdkApp.rateShipment && sdkApp.put("/rateShipment", rateShipment);
  // sdkApp.trackShipment && sdkApp.put("/trackShipment", trackShipment);
  // // sdkApp.createManifest && sdkApp.put("/createManifest", createManifest);
  // sdkApp.schedulePickup && sdkApp.put("/schedulePickup", schedulePickup);
  // sdkApp.cancelPickups && sdkApp.put("/cancelPickups", cancelPickups);

  function getApp(_req: Request, res: Response) {
    return res.status(200).json(sdkApp);
  }

  async function connect(req: Request, res: Response) {
    try {
      const { transaction, connectionFormData } = req.body;
      await sdkApp.connect!(transaction, connectionFormData);
      return res.status(200).send({
        transaction,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // async function createShipment(req: Request, res: Response) {
  //   try {
  //     let { transaction, shipment } = deserialize(req.body);
  //     shipment = await server.createShipment!(transaction, shipment);
  //     send(req, res, 200, { transaction, shipment });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function cancelShipments(req: Request, res: Response) {
  //   try {
  //     const { transaction, shipments } = deserialize(req.body);
  //     const outcomes = await server.cancelShipments!(
  //       transaction,
  //       shipments,
  //     );
  //     send(req, res, 200, { transaction, outcomes });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function rateShipment(req: Request, res: Response) {
  //   try {
  //     const { transaction, shipment } = deserialize(req.body);
  //     const rates = await server.rateShipment!(transaction, shipment);
  //     send(req, res, 200, { transaction, rates });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function trackShipment(req: Request, res: Response) {
  //   try {
  //     const { transaction, shipment } = deserialize(req.body);
  //     const trackingInfo = await server.trackShipment!(
  //       transaction,
  //       shipment,
  //     );
  //     send(req, res, 200, { transaction, trackingInfo });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function schedulePickup(req: Request, res: Response) {
  //   try {
  //     let { transaction, pickup } = deserialize(req.body);
  //     pickup = await server.schedulePickup!(transaction, pickup);
  //     send(req, res, 200, { transaction, pickup });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async function cancelPickups(req: Request, res: Response) {
  //   try {
  //     let { transaction, pickups } = deserialize(req.body);
  //     pickups = await server.cancelPickups!(transaction, pickups);
  //     send(req, res, 200, { transaction, pickups });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
