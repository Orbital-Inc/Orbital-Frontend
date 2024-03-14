let pageLoaded = false;
// let Url = "http://localhost:1337";
let ApiUrl = "https://api.orbitalsolutions.ca";
let Url = "https://orbitalsolutions.ca/";
let DevEnv = "";
setTimeout(fadeOutLoader, 1000);

window.addEventListener("load", function () {
  adjustContentPadding();
  pageLoaded = true;
  if (this.window.location.pathname.includes("/src/public")) {
    Url = "/src/public/";
    DevEnv = ".html";
  }
});

window.addEventListener("DOMContentLoaded", function () {
  this.window
    .loadComponent("main-header", "headerContainer")
    .then(() => {
      if (localStorage.getItem("token") === null) {
        document.getElementById("notLoggedInDiv").classList.remove("hidden");
        document.getElementById("loggedInDiv").classList.add("hidden");
        document
          .getElementById("notLoggedInMobileDiv")
          .classList.remove("hidden");
        document.getElementById("loggedInMobileDiv").classList.add("hidden");
      } else {
        document.getElementById("notLoggedInDiv").classList.add("hidden");
        document.getElementById("loggedInDiv").classList.remove("hidden");
        document.getElementById("notLoggedInMobileDiv").classList.add("hidden");
        document.getElementById("loggedInMobileDiv").classList.remove("hidden");
      }
    })
    .then(() => this.window.loadComponent("modal", "modalContainer"))
    .then(() => this.window.loadComponent("main-footer", "footerContainer"))
    .then(() => this.window.adjustLinkPaths())
    .then(() => {
      adjustContentPadding();
      window.addEventListener("resize", adjustContentPadding);
    })
    .catch((error) => {
      console.error("Error in loading components:", error);
    });
});

function adjustContentPadding() {
  const header = document.querySelector("nav"); // Adjust the selector based on your HTML structure.
  const bodyContent = document.querySelector(".body-content"); // This targets the main content area you specified.

  if (header && bodyContent) {
    const headerHeight = header.offsetHeight;
    const viewportHeight = window.innerHeight;
    const desiredSpacing = 20; // Desired minimum space between header and content in pixels. Adjust as needed.

    // Calculate the top margin as header height plus some desired spacing.
    // Ensure body content is not too far by limiting the space to a fraction of the viewport height if necessary.
    let topMargin = headerHeight + desiredSpacing;

    // Example additional logic to adjust topMargin based on viewport height if necessary.
    // This is a simple example. Adjust the logic to suit your needs.
    const maxMargin = viewportHeight * 0.1; // Let's say we don't want the margin to be more than 10% of the viewport height.
    topMargin = Math.min(topMargin, maxMargin);

    bodyContent.style.marginTop = `${topMargin}px`;
  }
}

function LogOutAsync() {
  localStorage.removeItem("token");
  document.getElementById("notLoggedInDiv").classList.remove("hidden");
  document.getElementById("loggedInDiv").classList.add("hidden");
  document.getElementById("notLoggedInMobileDiv").classList.remove("hidden");
  document.getElementById("loggedInMobileDiv").classList.add("hidden");
}

function fadeOutLoader() {
  const loaderContainer = document.querySelector(".fixed.inset-0");
  if (pageLoaded) {
    loaderContainer.classList.add("fade-out");
    // Wait for the transition to complete, then hide the loader
    setTimeout(() => {
      loaderContainer.style.display = "none";
    }, 1000); // 1s matches the transition duration in the CSS
  } else {
    // If the page isn't loaded yet, check again in 500ms
    setTimeout(fadeOutLoader, 500);
  }
}

async function RegisterAsync() {
  //get the form values
  let form = document.getElementById("registerForm");
  let formData = new FormData(form);
  let formValues = Object.fromEntries(formData.entries());
  let captcha = formValues["g-recaptcha-response"];
  let tos = formValues["tos"];
  let email = formValues["email"];
  let password = formValues["password"];
  let confirmPassword = formValues["confirm-password"];
  let username = formValues["username"];
  let errors = false;

  // Reset color and hide helper texts
  document
    .getElementById("username-helper")
    .classList.add("hidden", "text-red-600");
  document
    .getElementById("email-helper")
    .classList.add("hidden", "text-red-600");
  document
    .getElementById("password-helper")
    .classList.add("hidden", "text-red-600");
  document
    .getElementById("password-confirm-helper")
    .classList.add("hidden", "text-red-600");
  document.getElementById("tos-helper").classList.add("hidden", "text-red-600");
  //check if any values are empty
  if (
    email == "" ||
    password == "" ||
    confirmPassword == "" ||
    username == "" ||
    tos == "" ||
    captcha == ""
  ) {
    // Change the modal header
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please fill out all fields";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  }

  //check if tos is checked
  if (tos != "on") {
    // Update the helper text
    document.getElementById("tos-helper").textContent =
      "Please accept the terms of service";
    document.getElementById("tos-helper").classList.remove("hidden");
    errors = true;
  }
  //check email is valid
  if (!validateEmail(email)) {
    // Update the helper text
    document.getElementById("email-helper").textContent =
      "Please enter a valid email";
    document.getElementById("email-helper").classList.remove("hidden");
    errors = true;
  }
  //check if username is valid
  if (!validateUsername(username)) {
    // Update the helper text
    document.getElementById("username-helper").textContent =
      "Please enter a valid username";
    document.getElementById("username-helper").classList.remove("hidden");
    errors = true;
  }

  if (!validatePassword(password)) {
    // Update the helper text
    document.getElementById("password-helper").textContent =
      "Please enter a valid password(8 characters, at least 1 letter & number required)";
    document.getElementById("password-helper").classList.remove("hidden");
    errors = true;
  }

  //check if passwords match
  if (password != confirmPassword) {
    // Update the helper text
    document.getElementById("password-confirm-helper").textContent =
      "Passwords do not match";
    document
      .getElementById("password-confirm-helper")
      .classList.remove("hidden");
    errors = true;
  }

  if (errors) {
    return;
  }

  //send request to server
  const XHR = new XMLHttpRequest();
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status != 201) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error creating account";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event);
      return;
    }
    // Change the modal header
    document.querySelector("#modal p.text-lg").textContent = "Success";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Account created successfully";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  });
  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    // Change the modal header
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Error creating account";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event);
    return;
  });
  // Set up our request
  XHR.open("PUT", `${ApiUrl}/v1/users`);
  // Add the required headers
  XHR.setRequestHeader("Content-Type", "application/json");
  // Send our FormData object; HTTP headers are set automatically
  let data = JSON.stringify({
    emailAddress: email,
    password: btoa(password),
    username: username,
    captchaCode: captcha,
  });
  XHR.send(data);
}

async function LoginAsync() {
  //get the form values
  let form = document.getElementById("loginForm");
  let formData = new FormData(form);
  let formValues = Object.fromEntries(formData.entries());
  let captcha = formValues["g-recaptcha-response"];
  let user = formValues["user"];
  let password = formValues["password"];
  let errors = false;
  // Reset color and hide helper texts
  document
    .getElementById("user-helper")
    .classList.add("hidden", "text-red-600");
  document
    .getElementById("password-helper")
    .classList.add("hidden", "text-red-600");

  //check if any values are empty
  if (user == "" || password == "" || captcha == "") {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please fill out all fields";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  }

  if (!validateEmail(user) && !validateUsername(user)) {
    // Update the helper text
    document.getElementById("user-helper").textContent =
      "Please enter a valid email or username";

    // Display the helper text
    document.getElementById("user-helper").classList.remove("hidden");

    errors = true;
  }

  if (!validatePassword(password)) {
    // Update the helper text
    document.getElementById("password-helper").textContent =
      "Please enter a valid password(8 characters, at least 1 letter & number required)";
    document.getElementById("password-helper").classList.remove("hidden");
    errors = true;
  }

  if (errors) {
    return;
  }

  //send request to server
  const XHR = new XMLHttpRequest();
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status != 200) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error logging in";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event.responseText);
      return;
    }
    //set the token cookie
    const json = JSON.parse(event.responseText);
    localStorage.setItem("token", json.token);
    console.log(json);
    localStorage.setItem("json", event.responseText);
    // Change the modal header
    document.querySelector("#modal p.text-lg").textContent = "Success";
    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Successfully logged in\nRedirecting...";

    // Set href on modal button
    document.getElementById("modalAcceptButton").onclick = () => {
      window.location.href = `${Url}/dashboard`;
    };

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    setTimeout(() => {
      window.location.href = `${Url}/dashboard`;
    }, 5000);
    return;
  });
  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent = "Error logging in";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event.responseText);
    return;
  });
  // Set up our request
  XHR.open("POST", `${ApiUrl}/v1/users/tokens`);
  // Add the required headers
  XHR.setRequestHeader("Content-Type", "application/json");
  // Send our FormData object; HTTP headers are set automatically
  XHR.send(
    JSON.stringify({
      user: user,
      password: btoa(password),
      captchaCode: captcha,
    })
  );
}

async function SendForgotPasswordEmailAsync() {
  //get the form values
  let form = document.getElementById("forgotPasswordForm");
  let formData = new FormData(form);
  let formValues = Object.fromEntries(formData.entries());
  let captcha = formValues["g-recaptcha-response"];
  let email = formValues["email"];

  // Reset color and hide helper texts
  document
    .getElementById("email-helper")
    .classList.add("hidden", "text-red-600");

  //check if any values are empty
  if (email == "" || captcha == "") {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please fill out all fields";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  }

  if (!validateEmail(email)) {
    // Update the helper text
    document.getElementById("email-helper").textContent =
      "Please enter a valid email";
    document.getElementById("email-helper").classList.remove("hidden");
    return;
  }

  //send request to server
  const XHR = new XMLHttpRequest();
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status != 200) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error sending reset email";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event.responseText);
      return;
    }
    // Change the modal header
    document.querySelector("#modal p.text-lg").textContent = "Success";
    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Successfully sent reset email\nPlease check your email for your reset link";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  });
  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Error sending reset email";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event.responseText);
    return;
  });
  // Set up our request
  XHR.open("POST", `${ApiUrl}/v1/users/password/reset`);
  // Add the required headers
  XHR.setRequestHeader("Content-Type", "application/json");
  // Send our FormData object; HTTP headers are set automatically
  XHR.send(
    JSON.stringify({
      user: email,
      captcha: captcha,
    })
  );
}

async function ResetPasswordAsync() {
  //get the form values
  let form = document.getElementById("resetPasswordForm");
  let formData = new FormData(form);
  let formValues = Object.fromEntries(formData.entries());
  let captcha = formValues["g-recaptcha-response"];
  let password = formValues["password"];
  let confirmPassword = formValues["confirm-password"];
  let token = window.location.href.split("?")[1].split("=")[1];
  let errors = false;

  // Reset color and hide helper texts
  document
    .getElementById("password-helper")
    .classList.add("hidden", "text-red-600");
  document
    .getElementById("password-confirm-helper")
    .classList.add("hidden", "text-red-600");
  //check if any values are empty
  if (password == "" || confirmPassword == "" || token == "" || captcha == "") {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please fill out all fields";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  }
  if (!validatePassword(password)) {
    // Update the helper text
    document.getElementById("password-helper").textContent =
      "Please enter a valid password(8 characters, at least 1 letter & number required)";
    document.getElementById("password-helper").classList.remove("hidden");
    errors = true;
  }
  //check if passwords match
  if (password != confirmPassword) {
    // Update the helper text
    document.getElementById("password-confirm-helper").textContent =
      "Passwords do not match";
    document
      .getElementById("password-confirm-helper")
      .classList.remove("hidden");
    errors = true;
  }

  if (errors) {
    return;
  }

  //send request to server
  const XHR = new XMLHttpRequest();
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status != 200) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error resetting password";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event.responseText);
      return;
    }
    // Change the modal header
    document.querySelector("#modal p.text-lg").textContent = "Success";
    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Successfully reset password\nRedirecting...";

    // Set href on modal button
    document.getElementById("modalAcceptButton").onclick = () => {
      window.location.href = `${Url}/login${DevEnv}`;
    };

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    setTimeout(() => {
      window.location.href = `${Url}/login${DevEnv}`;
    }, 5000);
    return;
  });
  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Error resetting password";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event.responseText);
    return;
  });
  // Set up our request
  XHR.open("POST", `${ApiUrl}/v1/users/password/reset`);
  // Add the required headers
  XHR.setRequestHeader("Content-Type", "application/json");
  // Send our FormData object; HTTP headers are set automatically
  XHR.send(
    JSON.stringify({
      token: token,
      password: password,
      captcha: captcha,
    })
  );
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateUsername(username) {
  var re = /^[a-zA-Z0-9_ ]+$/;
  return re.test(username);
}

function validatePassword(password) {
  //check length
  if (password.length < 8) {
    return false;
  }
  //check if contains lowercase or uppercase letter
  let re = /[a-zA-Z]/;
  //check if contains number
  let re2 = /[0-9]/;
  if (!re.test(password) || !re2.test(password)) {
    return false;
  }
  return true;
}

function SubmitTicketAsync() {
  // Check for token in local storage
  const token = localStorage.getItem("token");
  if (token) {
    // Token exists, handle the different flow here
    document.querySelector("#modal p.text-lg").textContent =
      "Ticket submission";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please submit a ticket from the dashboard,\nRedirecting...";

    // Set href on modal button
    document.getElementById("modalAcceptButton").onclick = () => {
      window.location.href = `${Url}/dashboard/support/support${DevEnv}`;
    };

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    setTimeout(() => {
      window.location.href = `${Url}/dashboard/support/support${DevEnv}`;
    }, 5000);
    return;
  }

  // Get the form and form data
  let form = document.getElementById("ticketForm");
  let formData = new FormData(form);
  let formValues = Object.fromEntries(formData.entries());

  // Extract individual form values
  let captcha = formValues["g-recaptcha-response"];
  let name = formValues["name"];
  let emailAddress = formValues["emailAddress"];
  let accountType = formValues["accountType"];
  let emailType = formValues["emailType"];
  let subject = formValues["subject"];
  let emailContent = formValues["emailContent"];
  let tosAgreement = formValues["tosAgreement"];

  document
    .getElementById("email-helper")
    .classList.add("hidden", "text-red-600");
  document.getElementById("tos-helper").classList.add("hidden", "text-red-600");

  //check if tos is checked
  if (tosAgreement != "on") {
    // Update the helper text
    document.getElementById("tos-helper").textContent =
      "Please accept the terms of service";
    document.getElementById("tos-helper").classList.remove("hidden");
    return;
  }

  // Basic validation
  if (
    !name ||
    !emailAddress ||
    !emailType ||
    !subject ||
    !emailContent ||
    !tosAgreement
  ) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please fill out all fields";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  }

  // Assuming validateEmail is a function you have that validates the email address
  if (!validateEmail(emailAddress)) {
    // Update the helper text
    document.getElementById("email-helper").textContent =
      "Please enter a valid email";
    document.getElementById("email-helper").classList.remove("hidden");
    return;
  }

  // Create a new XMLHttpRequest
  const XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status == 200) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Successfully submitted ticket";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event);
    } else {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error submitting ticket";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event);
    }
  });

  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    // Change the modal header
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Error submitting ticket";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event);
  });

  XHR.open("POST", `${ApiUrl}/v1/ticket`);

  XHR.setRequestHeader("Content-Type", "application/json");

  // Prepare the data to be sent in the request
  let dataToSend = JSON.stringify({
    name: name,
    emailAddress: emailAddress,
    accountType: accountType,
    emailType: emailType,
    subject: subject,
    emailContent: emailContent,
    captcha: captcha,
  });

  // Send the request
  XHR.send(dataToSend);
}
