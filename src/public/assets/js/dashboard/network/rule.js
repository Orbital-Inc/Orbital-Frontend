window.addEventListener("DOMContentLoaded", () => {
  // Check if id is in the query string if so modify the title page text and page form
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  if (id) {
    const title = document.getElementById("ipTitle");
    const ruleButton = document.getElementById("ruleButton");
    const idInput = document.getElementById("id");
    idInput.setAttribute("disabled", true);
    title.innerText = "Modify Firewall Rule";
    ruleButton.innerText = "Modify Rule";
    ruleButton.onclick = modifyFirewallRule;
  }
});

async function getFirewallRule(ip) {}

async function AddFirewallRuleAsync() {}

async function modifyFirewallRule(ip, id) {}
