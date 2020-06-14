const TWILIO_SID = require("../config/config").twilioSid;
const TWILIO_AUTH_TOKEN = require("../config/config").twilioAuthToken;
const TWILIO_PHONE_NO = require("../config/config").twilioPhoneNo;

const client = require("twilio")(TWILIO_SID, TWILIO_AUTH_TOKEN);
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const Customer = require("../models/customer");

exports.sendMessage = async (req, res) => {
  const { content, customerId } = req.body;

  try {
    const customer = await Customer.findById(customerId);

    const message = await client.messages.create({
      body: content,
      from: TWILIO_PHONE_NO,
      to: customer.phoneNum,
    });

    if (message.error_code) throw new Error(message.error_message);

    customer.messages.push({
      content: content,
      status: message.status,
      fromCustomer: false,
    });

    res.status(200).send(message);
  } catch (error) {
    console.log("Error sending message", error);
    res.status(500).send({ error: error });
  }
};

exports.receiveMessage = async (req, res) => {
  console.log(req.body);
  const { From, Body } = req.body;

  try {
    let customer = await Customer.findOne({ phoneNum: From });
    console.log("Customer:", customer);
    if (!customer) {
      customer = new Customer({
        name: "Unknown",
        phoneNum: From,
      });
    }
    customer.messages.push({
      fromCustomer: true,
      content: Body,
    });
    await customer.save();

    const twiml = new MessagingResponse();
    twiml.message("");
    res.set("Content-Type", "text/xml");
    res.status(200).send(twiml.toString());
  } catch (error) {
    console.log("Error receiving message", error);
  }
};
