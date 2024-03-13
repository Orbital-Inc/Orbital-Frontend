let Url = "https://orbitalsolutions.ca";
let DevEnv = "";

window.addEventListener("load", () => {
  if (window.location.pathname.includes("/src/public")) {
    Url = "/src/public";
    DevEnv = ".html";
  }
  if (window.location.pathname.endsWith(`/open-ticket${DevEnv}`)) {
    return;
  }
  GetTicketsAsync();
});

async function SubmitTicketAsync() {
  // Get the form and form data
  let form = document.getElementById("ticketForm");
  let formData = new FormData(form);
  let formValues = Object.fromEntries(formData.entries());

  // Extract individual form values
  let ticketType = formValues["ticketType"];
  let subject = formValues["subject"];
  let ticketContent = formValues["ticketContent"];

  // Basic validation
  if (!ticketType || !subject || !ticketContent) {
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

  XHR.open("POST", `${Url}/v1/ticket`);

  XHR.setRequestHeader("Content-Type", "application/json");
  let token = localStorage.getItem("token");
  if (!token) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please log in to submit a ticket";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  }
  XHR.setRequestHeader("Authorization", `Bearer ${token}`);

  // Prepare the data to be sent in the request
  let dataToSend = JSON.stringify({
    ticketType: ticketType,
    subject: subject,
    ticketContent: ticketContent,
  });

  // Send the request
  XHR.send(dataToSend);
}

async function GetTicketsAsync() {
  // Create a new XMLHttpRequest
  const XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener("load", function (event) {
    if (XHR.status == 200) {
      let response = JSON.parse(event.responseText);
      let tickets = response.tickets;
      let ticketList = document.getElementById("ticketList");

      // Clear ticket list
      ticketList.innerHTML = "";

      // Loop through tickets and add them to the ticket list
      tickets.forEach((ticket) => {
        let ticketItem = document.createElement("li");
        ticketItem.classList.add(
          "flex",
          "items-center",
          "justify-between",
          "px-4",
          "py-4",
          "text-sm",
          "font-medium",
          "text-gray-500",
          "dark:text-gray-400",
          "border-t",
          "border-gray-200",
          "dark:border-gray-700"
        );

        let ticketLink = document.createElement("a");
        ticketLink.classList.add(
          "hover:text-gray-800",
          "dark:hover:text-gray-200"
        );
        ticketLink.href = `${Url}dashboard/support/ticket${DevEnv}`;
        ticketLink.textContent = ticket.subject;
        ticketLink.onclick = () => {
          localStorage.setItem("ticketID", ticket._id);
        };

        let ticketStatus = document.createElement("span");
        ticketStatus.classList.add("text-gray-400", "dark:text-gray-500");
        ticketStatus.textContent = ticket.status;

        ticketItem.appendChild(ticketLink);
        ticketItem.appendChild(ticketStatus);

        ticketList.appendChild(ticketItem);
      });
    } else {
      document.querySelector("#modal p.text-lg").textContent = "Error";

      // Change the modal description
      document.querySelector("#modal p.text-sm").textContent =
        "Error getting tickets";

      // Display the modal if it isn't already displayed
      if (!document.documentElement.__x.$data.isModalOpen) {
        document.documentElement.__x.$data.openModal();
      }
      console.log(event);
    }
  });

  // Define what happens in case of error
  XHR.addEventListener("error", function (event) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Error getting tickets";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    console.log(event);
  });

  XHR.open("GET", `${Url}/v1/ticket`);

  let token = localStorage.getItem("token");
  if (!token) {
    document.querySelector("#modal p.text-lg").textContent = "Error";

    // Change the modal description
    document.querySelector("#modal p.text-sm").textContent =
      "Please log in to view tickets";

    // Display the modal if it isn't already displayed
    if (!document.documentElement.__x.$data.isModalOpen) {
      document.documentElement.__x.$data.openModal();
    }
    return;
  }
  XHR.setRequestHeader("Authorization", `Bearer ${token}`);
  XHR.send();
}
