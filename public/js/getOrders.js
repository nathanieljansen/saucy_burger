// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".change-orderStatus").on("click", function (event) {
    var id = $(this).data("id");
    var newOrder = $(this).data("newOrder");

    var newOrderState = {
      sleepy: newOrder
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
      custName: $("#customerName").val().trim(),
      burgerName: $("#burgerName").val().trim(),
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

  $(".serve-order").on("click", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/orders/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted order", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
