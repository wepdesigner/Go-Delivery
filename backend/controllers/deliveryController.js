import { Delivery } from "../models/Delivery.js";

// Generate unique tracking number
function generateTrackingNumber() {
  const prefix = "DS";
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${Date.now()}-${random}`;
}

export async function getDeliveries(req, res) {
  const deliveries = await Delivery.find().sort({ createdAt: -1 });
  res.json(deliveries);
}

export async function addDelivery(req, res) {
  const trackingNumber = generateTrackingNumber();
  const newDelivery = new Delivery({ ...req.body, trackingNumber });
  await newDelivery.save();
  res.json(newDelivery);
}

export async function trackDelivery(req, res) {
  const { trackingNumber } = req.params;
  const delivery = await Delivery.findOne({ trackingNumber });
  if (!delivery) return res.status(404).json({ message: "Not found" });
  res.json(delivery);
}

export async function updateStatus(req, res) {
  const { trackingNumber } = req.params;
  const { status } = req.body;
  const delivery = await Delivery.findOneAndUpdate(
    { trackingNumber },
    { status, $push: { history: { status, note: `Status changed to ${status}` } } },
    { new: true }
  );
  res.json(delivery);
}
