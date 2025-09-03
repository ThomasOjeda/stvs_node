const connectDB = require("./db/connect");
const axios = require("axios");
const { MONGO_URI, PYFLASK_URL } = require("./config/config");

const healthcheck = async (req, res) => {
  let mongo = "up";
  let pyflask = "up";
  try {
    await connectDB(MONGO_URI);
  } catch (error) {
    mongo = "down";
  }
  try {
    let response = await axios.get(PYFLASK_URL);
    if (response.status != 200) {
      pyflask = "down";
    }
  } catch (error) {
    pyflask = "down";
  }
  res.status = 200;
  res.send(
    `<html><body><h1>Health Check</h1><p>Server: up</p><p>MongoDB: ${mongo}</p><p>Pyflask: ${pyflask}</p></body></html>`
  );
}

module.exports = healthcheck;