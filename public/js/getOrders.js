// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".change-orderStatus").on("click", function (event) {
    var id = $(this).data("id");
    var newOrder = $(this).data("newOrder");

    var newOrderState = {
      orderPlace: newOrder
    };

    // Send the PUT request.
    $.ajax("/api/orders/" + id, {
      type: "PUT",
      data: newOrderState
    }).then(
      function () {
        console.log("changed sleep to", newOrder);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newOrder = {
      customerName: $("#customerName").val().trim(),
      burgerOption: $("#burgerName").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/orders", {
      type: "POST",
      data: newOrder
    }).then(
      function () {
        console.log("created new order");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".change-orderStatus").on("click", function (event) {
    var expression = $(this).attr("data-function");
    var id = $(this).data("id");

    switch (expression) {
      case "served":
        return sayBye(id)
      case "cooking":
        return serveBurger(id)
      case "orderPlaced":
        return cooking(id)
    }
    // Send the DELETE request.


  });

  function sayBye(id) {
    $.ajax("/api/orders/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted order", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  }

  function cooking(id) {
    $.ajax("/api/orders/" + id + '/cooking', {
      type: "PUT",
    }).then(
      function () {
        console.log("cooking that burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
    console.log("Work")
  }

  function serveBurger(id) {
   $.ajax("/api/orders/" + id + '/served', {
     type: "PUT"
   }).then(
     function () {
       console.log("serving that burger", id);
       // Reload the page to get the updated list
       location.reload();
     }
   );
    console.log("Working")
  }
});