async function loadComponent(componentName, targetElementId) {
  try {
    let isDev = window.location.pathname.includes("/src/public/");
    let url = isDev
      ? "/src/public/dashboard/components/"
      : "/dashboard/components/";
    let response = await fetch(url + componentName + ".html");
    let data = await response.text();

    // Get the target element
    let targetElement = document.getElementById(targetElementId);

    // Replace the entire target div with the fetched data
    targetElement.outerHTML = data;

    // Initialize Alpine.js for the new content
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

window.addEventListener("DOMContentLoaded", function () {
  loadComponent("sidebar-desktop", "sidebarDesktopContainer");
  loadComponent("sidebar-mobile", "sidebarMobileContainer");
  loadComponent("header", "headerContainer");
  loadComponent("modal", "modalContainer");
});
