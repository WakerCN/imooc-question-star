const question = require("./question");
const analysis = require("./analysis");
const user = require("./user");

module.exports = [...question, ...user, ...analysis];
