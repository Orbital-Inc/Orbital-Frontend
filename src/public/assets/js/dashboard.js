let pageLoaded = false;

// Function to fade out the loader and then hide it
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
// Set a timeout to check the token and potentially redirect after 1 second
checkTokenAndRedirect();

// Set a timeout to fade out the loader after 3 seconds
setTimeout(fadeOutLoader, 3000);

// Mark the page as loaded when it's fully loaded
window.onload = function () {
  pageLoaded = true;
};

function checkTokenAndRedirect() {
  const token = localStorage.getItem("token");
  if (!token) {
    document.querySelector(".fixed.inset-0 p.text-gray-700").textContent =
      "Redirecting...";
    setTimeout(() => {
      let isDev = window.location.pathname.includes("/src/public/");
      let redirectURL = isDev ? "/src/public/login.html" : "/login.html";
      window.location.href = redirectURL;
    }, 1000);
    return;
  }
}

async function LogOutAsync() {
  localStorage.removeItem("token");

  let isDev = window.location.pathname.includes("/src/public/");
  let redirectURL = isDev ? "/src/public/login.html" : "/login.html";
  window.location.href = redirectURL;
}
