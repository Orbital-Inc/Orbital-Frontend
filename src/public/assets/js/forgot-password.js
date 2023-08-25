window.onload = function () {
  if (window.location.href.indexOf("token") > -1) {
    //check if token is a valid token
    const token = window.location.href.split("=")[1];
    if (checkToken(token)) {
      //if token is valid show the set new password form
      document.getElementById("set-new-password").classList.remove("hidden");
      document.getElementById("set-new-password").classList.add("flex");
      document
        .getElementById("send-forgot-password-email")
        .classList.add("hidden");
    }
  }
};

function checkToken(token) {
  //check token length if it is not 16 characters or longer it is not a valid token
  if (token.length < 16) {
    return false;
  }
  return true;
}
