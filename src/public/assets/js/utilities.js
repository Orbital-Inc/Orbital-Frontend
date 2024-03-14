window.addEventListener("load", () => {
  while (document.readyState === "complete") {
    const token = JSON.parse(localStorage.getItem("json"));
    const exp = token.exp * 1000;
    const now = new Date().getTime();
    // Check if the user is logged in
    if (localStorage.getItem("token") != null) {
      // Check if the token is expired
      if (exp < now) {
        // If the token is expired, refresh it
        refreshTokenAsync();
        // Update values
        token = JSON.parse(localStorage.getItem("json"));
        exp = token.exp * 1000;
        now = new Date().getTime();
      }
    }
    // Sleep for exp - now - 1.5 minutes or exit if the token is expired
    if (exp < now) {
      // // Change the modal header
      // document.querySelector("#modal p.text-lg").textContent = "Session Expired";

      // // Change the modal description
      // document.querySelector("#modal p.text-sm").textContent =
      //   "Session expired, please log in again.\nRedirecting to login page...";

      // // Display the modal if it isn't already displayed
      // if (!document.documentElement.__x.$data.isModalOpen) {
      //   document.documentElement.__x.$data.openModal();
      // }
      // setTimeout(() => {
      //   window.location.href = "/src/public/login";
      // }, 5000);
      return;
    }
  }
});

// Function to hide the reCAPTCHA badge
function hideReCAPTCHABadge() {
  const captcha = document.querySelector(".grecaptcha-badge");
  if (captcha) {
    captcha.style.display = "none";
  }
}

function setupMutationObserver() {
  // Set up a MutationObserver to watch for changes in the document
  const observer = new MutationObserver((mutationsList, observer) => {
    // For each mutation record, check if the reCAPTCHA badge is affected and hide it
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        hideReCAPTCHABadge();
      }
    }
  });

  // Start observing the document body for changes in the child elements
  observer.observe(document.body, { childList: true, subtree: true });
}

// Ensure the DOM is fully loaded before setting up the observer
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    hideReCAPTCHABadge(); // Hide once upon initial DOM load
    setupMutationObserver(); // Setup observer
  });
} else {
  // DOMContentLoaded has already fired
  hideReCAPTCHABadge();
  setupMutationObserver();
}

async function loadComponent(componentName, targetElementId) {
  try {
    let isDev = window.location.pathname.includes("/src/public/");
    let url = "https://orbitalsolutions.ca/components/";
    url = isDev
      ? "/src/public/components/"
      : "https://orbitalsolutions.ca/components/";
    let devEnv = isDev ? ".html" : "";
    // Make sure it is https and not http when not in dev
    if (!isDev) {
      url = url.replace("http://", "https://");
    }
    // Add your custom headers here
    let headers = new Headers();
    headers.append("X-Component-Request", componentName);

    let response = await fetch(url + componentName + devEnv, {
      method: "GET",
      //headers: headers,
    });
    let data = await response.text();

    let targetElement = document.getElementById(targetElementId);

    targetElement.outerHTML = data;

    initAlpine();
  } catch (error) {
    console.error("Error loading component:", error);
  }
}

function initAlpine() {
  document.querySelectorAll("[x-data]:not([x-init])").forEach((el) => {
    Alpine.initializeComponent(el);
  });
}

function adjustLinkPaths() {
  // Check if we're in the development environment
  let isDev = window.location.pathname.includes("/src/public/");
  // Get all image elements on the page
  let images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (isDev) {
      if (img.src.includes("https://orbitalsolutions.ca/")) {
        img.src = img.src.replace(
          "https://orbitalsolutions.ca/",
          "/src/public/"
        );
      }
    }
  });

  // Get all as elements on the page
  let as = document.querySelectorAll("a");
  as.forEach((a) => {
    if (isDev) {
      if (a.href.includes("https://orbitalsolutions.ca/")) {
        let newHref = a.href.replace(
          "https://orbitalsolutions.ca/",
          "/src/public/"
        );
        a.href = newHref + ".html";
      }
    }
  });

  // Get all links elements on the page
  let links = document.querySelectorAll("link");
  links.forEach((link) => {
    if (isDev) {
      if (link.href.includes("https://orbitalsolutions.ca/assets/img/")) {
        link.href = link.href.replace(
          "https://orbitalsolutions.ca/assets/img/",
          "/src/public/assets/img/"
        );
      }
    }
  });
}

async function refreshTokenAsync() {
  // Get refresh token and username from local storage
  const user = localStorage.getItem("username");
  const refreshToken = localStorage.getItem("refreshToken");

  //send request to server
  const XHR = new XMLHttpRequest();
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status != 200) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent =
        "Session Expired";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Session expired, please log in again.\nRedirecting to login page...";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event.responseText);
      setTimeout(() => {
        window.location.href = "/src/public/login";
      }, 5000);
      return;
    }
    //set the token cookie
    const json = JSON.parse(event.responseText);
    localStorage.setItem("token", json.token);
    console.log(json);
    localStorage.setItem("json", event.responseText);
    return;
  });
  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    document.querySelector("#modal p.text-lg").textContent = "Session Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "A session error occurred, please try again later. Please log in again.\nRedirecting to login page...";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event.responseText);
    setTimeout(() => {
      window.location.href = "/src/public/login";
    }, 5000);
    return;
  });
  // Set up our request
  XHR.open("POST", `${ApiUrl}/v1/users/tokens/refresh`);
  // Add the required headers
  XHR.setRequestHeader("Content-Type", "application/json");
  // Send our FormData object; HTTP headers are set automatically
  XHR.send(
    JSON.stringify({
      user: user,
      refreshToken: refreshToken,
    })
  );
}

window.loadComponent = loadComponent;
window.adjustLinkPaths = adjustLinkPaths;
