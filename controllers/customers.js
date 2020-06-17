const Customer = require("../models/customer");

exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer({ ...req.body, ownedBy: req.user.id });
    await customer.save();

    res.status(201).json(customer);
  } catch (error) {
    console.log("Error creating customer", error);
    res.status(500).json({ error: error });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    let customer = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      customer = await Customer.findById(id);
    }

    if (!customer) {
      res.status(404).json({ error: `Customer with id ${id} is not found` });
      return;
    } else if (customer.ownedBy !== req.user.id) {
      res
        .status(401)
        .json({ error: `Customer with id ${id} is not owned by this user` });
      return;
    }

    res.status(200).json(customer);
  } catch (error) {
    console.log("Error getting customer", error);
    res.status(500).json({ error: error });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ ownedBy: req.user.id });
    res.status(200).json(customers);
  } catch (error) {
    console.log(`Error getting all customers for user ${req.user.id}`, error);
    res.status(500).json({ error: error });
  }
};
