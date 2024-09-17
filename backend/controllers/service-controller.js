const Service = require("../models/service-model");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      res.status(404).json({ message: "No service found" });
      return;
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(`services: ${err}`);
  }
};

module.exports = services;
