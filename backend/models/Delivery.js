import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  senderName: String,
  senderPhone: String,
  recipientName: String,
  recipientPhone: String,
  origin: String,
  destination: String,
  description: String,
  trackingNumber: { type: String, unique: true },
  status: {
    type: String,
    enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
    default: "Pending"
  },
  history: [
    {
      timestamp: { type: Date, default: Date.now },
      status: String,
      note: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export const Delivery = mongoose.model("Delivery", deliverySchema);
