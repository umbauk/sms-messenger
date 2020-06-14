const Customer = require("../models/customer");

exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();

    res.status(201).json(customer);
  } catch (error) {
    console.log("Error creating customer", error);
    res.status(500).send({ error: error });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);

    if (!customer) {
      res.status(404).send({ error: `Customer with id ${id} is not found` });
      return;
    }

    res.status(200).json(customer);
  } catch (error) {
    console.log("Error getting customer", error);
    res.status(500).send({ error: error });
  }
};
