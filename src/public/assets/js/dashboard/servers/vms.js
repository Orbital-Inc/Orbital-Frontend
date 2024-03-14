let Url = "http://localhost:1337";

window.addEventListener("DOMContentLoaded", function () {
  loadVms();
});

function loadVms() {
  //send request to server
  const XHR = new XMLHttpRequest();
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status != 200) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error getting all vms";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event.responseText);
      return;
    }

    return;
  });
  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Error getting all vms";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event.responseText);
    return;
  });
  // Set up our request
  XHR.open("GET", `${Url}/v1/vms`);
  XHR.send();
}

function createVm() {}

function deleteVm() {}

function modifyVm() {}

function startVm() {
  //send request to server
  const XHR = new XMLHttpRequest();
  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status != 200) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error starting vm";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event.responseText);
      return;
    }

    return;
  });
  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Error starting vm";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event.responseText);
    return;
  });
  // Set up our request
  XHR.open("POST", `${Url}/v1/vms/start`);
  XHR.send();
}

function stopVm() {}

function restartVm() {}

function getVm() {}
