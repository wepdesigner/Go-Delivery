import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import { connectDB } from "./config/db.js";
import multer from "multer"

// dotenv.config();
// connectDB();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/deliveryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const deliverySchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  email: String,
  status: String,
  expeditionDate: String,
  deliveryDate: String,
  image: String,
  trackingNumber: String,
});

const Delivery = mongoose.model("Delivery", deliverySchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/api/delivery/add", upload.single("image"), async (req, res) => {
  try {
    const newDelivery = new Delivery({
      ...req.body,
      image: req.file ? req.file.path : "",
    });
    await newDelivery.save();
    res.json({ success: true, trackingNumber: req.body.trackingNumber });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));




// app.use("/api/deliveries", deliveryRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚚 Server running on port ${PORT}`));
