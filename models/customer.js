const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  phoneNum: { type: String, required: true, unique: true, index: true },
  messages: [
    {
      timestamp: { type: Date, required: true, default: Date.now },
      fromCustomer: { type: Boolean, required: true },
      content: { type: String, required: true },
      status: { type: String },
    },
  ],
});

module.exports = mongoose.model("Customer", CustomerSchema);
