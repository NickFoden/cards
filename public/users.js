$(document).on('submit', "#new-user-form", function(e){
    e.preventDefault();
    var newUser ={};

    newUser.email = $("#email").val();
    newUser.password = $("#password").val();
    $.ajax({
      type: "POST",
      url: "/users",
      data: JSON.stringify(newUser),
      success: () => console.log("Post Success"),
      dataType: "json",
      contentType: "application/json"
    });
    document.getElementById("new-user-form").reset();
});