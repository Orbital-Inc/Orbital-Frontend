async function loadComponent(componentName, targetElementId) {
  try {
    let isDev = window.location.pathname.includes("/src/public/");
    let url = isDev ? "/src/public/components/" : "/components/";
    let response = await fetch(url + componentName + ".html");
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
    if (!isDev) {
      if (img.src.includes("/src/public/")) {
        img.src = img.src.replace("/src/public/", "/");
      }
    }
  });

  // Get all image elements on the page
  let as = document.querySelectorAll("a");
  as.forEach((a) => {
    if (!isDev) {
      if (a.href.includes("/src/public/")) {
        a.href = a.href.replace("/src/public/", "/");
      }
    }
  });
}

window.adjustLinkPaths = adjustLinkPaths;
window.loadComponent = loadComponent;
