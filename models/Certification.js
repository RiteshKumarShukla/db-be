const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  contactInfo: {
    name: String,
    email: String,
    phone: String,
  },
  certificationInfo: {
    certification: String,
    panCard: String,
    gstin: String,
  },
  additionalInfo: {
    comments: String,
  },
  paymentInfo: {
    time: { type: Date, default: Date.now },
    amount: {type:Number},
    Method: { type: String, enum: ["card", "upi"], default: "card" },
  },
  status: {
    type: String,
    enum: ["pending", "review", "approved"],
    default: "pending", 
  },
});

module.exports = mongoose.model("Certification", certificationSchema);
