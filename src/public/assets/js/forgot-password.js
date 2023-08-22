window.onload = function () {
  if (window.location.href.indexOf("token") > -1) {
    document.getElementById("set-new-password").classList.remove("hidden");
    document.getElementById("set-new-password").classList.add("flex");
    document
      .getElementById("send-forgot-password-email")
      .classList.add("hidden");
  }
};
