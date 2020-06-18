/*
 * Contains functions for sending and receiving messages to/from Twilio API and
 * calling function to emit socket messages
 */

const TWILIO_SID = require("../config/config").twilioSid;
const TWILIO_AUTH_TOKEN = require("../config/config").twilioAuthToken;
const TWILIO_PHONE_NO = require("../config/config").twilioPhoneNo;

const client = require("twilio")(TWILIO_SID, TWILIO_AUTH_TOKEN);
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const mongoose = require("mongoose");
const Customer = require("../models/customer");
const socketApi = require("./socketApi");

exports.sendMessage = async (req, res) => {
  const { content, customerId } = req.body;

  try {
    let customer = null;
    if (mongoose.Types.ObjectId.isValid(customerId)) {
      customer = await Customer.findById(customerId);
    }

    if (!customer) {
      res
        .status(404)
        .json({ error: `Customer with id ${customerId} is not found` });
      return;
    } else if (customer.ownedBy != req.user.id) {
      res.status(500).json({
        error: `Customer with id ${customerId} is not owned by this user`,
      });
      return;
    }

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
    await customer.save();

    socketApi.newMessage(
      req.user.id,
      customerId,
      customer.messages[customer.messages.length - 1]
    );

    res.status(200).json(message);
  } catch (error) {
    console.log("Error sending message", error);
    res.status(500).json({ error: error });
  }
};

exports.receiveMessage = async (req, res) => {
  const { From, Body } = req.body;

  try {
    const customer = await Customer.findOne({ phoneNum: From });
    if (!customer) {
      console.log("Message received from unknown number", From, Body);
    } else {
      customer.messages.push({
        fromCustomer: true,
        content: Body,
      });
      await customer.save();
      socketApi.newMessage(
        customer.ownedBy,
        customer._id,
        customer.messages[customer.messages.length - 1]
      );
    }

    const twiml = new MessagingResponse();
    twiml.message("");
    res.set("Content-Type", "text/xml");
    res.status(200).send(twiml.toString());
  } catch (error) {
    console.log("Error receiving message", error);
  }
};
