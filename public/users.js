let registeredUsers = [];


$(document).on('submit', "#new-user-form", function(e){
    e.preventDefault();
    var newUser ={};

    newUser.email = $("#user-email").val();
    newUser.password = $("#password").val();

    console.log(newUser);
    $.ajax({
      type: "POST",
      url: "/users",
      data: JSON.stringify(newUser),
      success: () => console.log("Post Success"),
      dataType: "json",
      contentType: "application/json"
    });
    registeredUsers.push(newUser);
    document.getElementById("new-user-form").reset();
});
