// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".change-sleep").on("click", function (event) {
    var id = $(this).data("id");
    var newSleep = $(this).data("newsleep");

    var newSleepState = {
      sleepy: newSleep
    };

    // Send the PUT request.
    $.ajax("/api/orders/" + id, {
      type: "PUT",
      data: newSleepState
    }).then(
      function () {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newCat = {
      name: $("#ca").val().trim(),
      sleepy: $("[name=sleepy]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/orders", {
      type: "POST",
      data: newCat
    }).then(
      function () {
        console.log("created new order");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".delete-order").on("click", function (event) {
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
