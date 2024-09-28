import mongoose from "mongoose";

// Schema for city-level delivery charges
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  deliveryCharge: { type: Number, required: true }, // City-specific delivery charge
});

// Schema for districts delivery charges
const districtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cities: [citySchema], // List of cities in the province
  deliveryCharge: { type: Number, required: true }, // Province-specific delivery charge
});

// Schema for province/state-level delivery charges
const provinceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cities: [districtSchema], // List of districts in the province
  deliveryCharge: { type: Number, required: true }, // Province-specific delivery charge
});

// DeliveryChargesSchema
const deliveryChargesSchema = new mongoose.Schema({
  country: {
    name: { type: String, required: true }, // Country name
    provinces: [provinceSchema], // List of provinces in the country
    deliveryCharge: { type: Number, required: true }, // Country-wide default delivery charge
  },
});

export default mongoose.models.DeliveryCharge ||
  mongoose.model("DeliveryCharge", deliveryChargesSchema);
