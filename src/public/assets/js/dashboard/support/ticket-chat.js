let Url = "https://orbitalsolutions.ca";
let DevEnv = "";

window.addEventListener("load", () => {
  if (window.location.pathname.includes("/src/public")) {
    Url = "/src/public";
    DevEnv = ".html";
  }
});

async function getTicketChat() {}

async function ReplyToTicketAsync() {}

async function CloseTicketAsync() {
  // Get the ticket ID
  let ticketID = document.getElementById("ticketID").textContent;

  // Create a new XMLHttpRequest
  const XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status == 200) {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Successfully closed ticket";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }

      // Set href on modal button
      document.getElementById("modalAcceptButton").onclick = () => {
        window.location.href = `${Url}dashboard/support/support${DevEnv}`;
      };

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }

      console.log(event);

      setTimeout(() => {
        window.location.href = `${Url}dashboard/support/support${DevEnv}`;
      }, 5000);
    } else {
      // Change the modal header
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error closing ticket";

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
      "Error closing ticket";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event);
  });

  XHR.open("PATCH", `${Url}/v1/ticket/${ticketID}`);

  XHR.setRequestHeader("Content-Type", "application/json");

  let token = localStorage.getItem("token");
  if (!token) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please log in to close a ticket";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  }
  XHR.setRequestHeader("Authorization", `Bearer ${token}`);

  // Prepare the data to be sent in the request
  let dataToSend = JSON.stringify({
    status: "closed",
  });
  XHR.send(dataToSend);
}
