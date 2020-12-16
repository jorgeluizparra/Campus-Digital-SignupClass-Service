module.exports = app => {
    var router = require("express").Router();
    const signup = require("../controllers/signup.controller.js");
  
    var router = require("express").Router();

    // Get all registers
    router.get("/", signup.getAll);
  
    app.use('/api/v1/signups', router);
};