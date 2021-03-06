var express = require("express");

var router = express.Router();

// Import the model (order.js) to use its database functions.
var order = require("../models/customerOrders.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  order.all(function (data) {
    var hbsObject = {
      orders: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/orders", function (req, res) {
  order.create([
    "customerName", "burgerOption", "orderPlaced"
  ], [
    req.body.customerName, req.body.burgerOption, true
  ], function (result) {
    // Send back the ID of the new quote
    res.json({
      id: result.insertId
    });
  });
});

router.put("/api/orders/:id/cooking", function (req, res) {

  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  order.update({
    cooking: true,
    orderPlaced: false
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.put("/api/orders/:id/served", function (req, res) {

  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  order.update({
    cooking: false,
    orderPlaced: false,
    served: true
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


router.delete("/api/orders/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  order.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;