$(document).on('submit', "#login-form", function(e){
    e.preventDefault();
    var existingUser ={};

    existingUser.email = $("#email").val();
    existingUser.password = $("#password").val();

    console.log(existingUser);
    $.ajax({
      type: "GET",
      url: "/users",
      data: JSON.stringify(existingUser),
      success: () => console.log("Get Success"),
      dataType: "json",
      contentType: "application/json"
    });
    document.getElementById("login-form").reset();
});
