import axios from "axios";

const API_URL = "http://localhost:5000/api/deliveries";

export async function fetchDeliveries() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createDelivery(data) {
  const res = await axios.post(API_URL, data);
  return res.data;
}

export async function trackDelivery(trackingNumber) {
  const res = await axios.get(`${API_URL}/${trackingNumber}`);
  return res.data;
}

export async function updateDeliveryStatus(trackingNumber, status) {
  const res = await axios.put(`${API_URL}/${trackingNumber}/status`, { status });
  return res.data;
}
