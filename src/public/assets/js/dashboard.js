let pageLoaded = false;

checkTokenAndRedirect();
setTimeout(fadeOutLoader, 1000);

window.addEventListener("load", function () {
  pageLoaded = true;
});

window.addEventListener("DOMContentLoaded", function () {
  window
    .loadComponent("dashboard-header", "headerContainer")
    .then(() =>
      window.loadComponent("sidebar-desktop", "sidebarDesktopContainer")
    )
    .then(() =>
      window.loadComponent("sidebar-mobile", "sidebarMobileContainer")
    )
    .then(() => window.loadComponent("modal", "modalContainer"))
    .then(() => this.window.adjustLinkPaths())
    .then(() => userViewPermissions())
    .then(() => ActivePage())
    .catch((error) => {
      console.error("Error in loading components:", error);
    });
});

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

async function userViewPermissions() {
  let testEnv = window.location.pathname.includes("/src/public/");
  //let user = JSON.parse(localStorage.getItem("user"));
  const dropdowns = [
    "servers-dropdown-desktop",
    "network-dropdown-desktop",
    "admin-dropdown-desktop",
    "miscellaneous-dropdown-desktop",
    "servers-dropdown-mobile",
    "network-dropdown-mobile",
    "admin-dropdown-mobile",
    "miscellaneous-dropdown-mobile",
  ];

  const processedIds = [];

  const checkElements = () => {
    dropdowns.forEach((id) => {
      let element = document.getElementById(id);
      if (element && testEnv) {
        element.classList.remove("hidden");
        processedIds.push(id); // Add the ID to the processed list
      } else {
        console.log("Cannot find element: " + id);
      }
    });
    // Remove processed IDs from the ids array
    processedIds.forEach((id) => {
      const index = dropdowns.indexOf(id);
      if (index > -1) {
        dropdowns.splice(index, 1);
      }
    });
  };

  checkElements();
}

function ActivePage() {
  const currentPath = window.location.pathname;

  const currentPage = currentPath.split("/").pop();

  const pageMapping = {
    "index.html": ["dashboard-page-desktop", "dashboard-page-mobile"],
    "vms.html": ["vms-page-desktop", "vms-page-mobile"],
    "dedis.html": ["dedis-page-desktop", "dedis-page-mobile"],
    "firewall.html": ["firewall-page-desktop", "firewall-page-mobile"],
    "statistics.html": [
      "network-statistics-page-desktop",
      "network-statistics-page-mobile",
    ],
    "api.html": ["api-page-desktop", "api-page-mobile"],
    "admin/users.html": ["admin-users-page-desktop", "admin-users-page-mobile"],
    "support.html": ["support-page-desktop", "support-page-mobile"],
  };

  // Get the array of IDs corresponding to the current page
  const activeElementIds = pageMapping[currentPage];

  if (activeElementIds) {
    activeElementIds.forEach((activeElementId) => {
      const activeElement = document.getElementById(activeElementId);
      if (!activeElement) {
        console.log(`Element with ID ${activeElementId} not found.`);
        return;
      }
      const activeLink = activeElement.querySelector("a");

      // Add the active indicator to the parent <li> tag
      const parentLi = activeLink.closest("li");
      const activeIndicator = document.createElement("span");
      activeIndicator.setAttribute("aria-hidden", "true");
      activeIndicator.classList.add(
        "absolute",
        "inset-y-0",
        "left-0",
        "w-1",
        "rounded-tr-lg",
        "rounded-br-lg",
        "bg-primary-600"
      );
      parentLi.prepend(activeIndicator);

      // Update the classes on the <a> tag to reflect the active state
      activeLink.classList.add("text-gray-800", "dark:text-gray-100");
      activeLink.classList.remove(
        "hover:text-gray-800",
        "dark:hover:text-gray-200"
      );
    });
  }
}

function refreshToken() {
  const token = localStorage.getItem("token");
  const XHR = new XMLHttpRequest();
  XHR.addEventListener("load", function (event) {
    if (XHR.status != 200) {
      console.log(event.responseText);
      return;
    }
    const response = JSON.parse(event.responseText);
    localStorage.setItem("token", response.token);
  });
  XHR.addEventListener("error", function (event) {
    console.log(event.responseText);
    return;
  });
  XHR.open("GET", `${Url}/v1/refresh`);
  XHR.setRequestHeader("Authorization", `Bearer ${token}`);
  XHR.send();
}
