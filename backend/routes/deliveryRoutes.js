import express from "express";
import {
  getDeliveries,
  addDelivery,
  trackDelivery,
  updateStatus
} from "../controllers/deliveryController.js";

const router = express.Router();

router.get("/", getDeliveries);
router.post("/", addDelivery);
router.get("/:trackingNumber", trackDelivery);
router.put("/:trackingNumber/status", updateStatus);

export default router;
