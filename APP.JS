let customers = JSON.parse(localStorage.getItem("customers")) || [];
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let payments = JSON.parse(localStorage.getItem("payments")) || [];

function saveData() {
  localStorage.setItem("customers", JSON.stringify(customers));
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("payments", JSON.stringify(payments));
  viewData();
}

function addCustomer() {
  let code = document.getElementById("code").value;
  let name = document.getElementById("name").value;

  customers.push({ code, name, status: "active" });
  saveData();
}

function saveAccount() {
  let limit = Number(document.getElementById("limit").value);
  let bf = Number(document.getElementById("bf").value);
  let total = limit + bf;

  accounts.push({ limit, bf, total });
  saveData();
}

function savePayment() {
  let type = document.getElementById("ptype").value;
  let amount = Number(document.getElementById("amount").value);
  let desc = document.getElementById("desc").value;

  payments.push({ type, amount, desc });
  saveData();
}

function viewData() {
  let output = "";
  customers.forEach(c => {
    output += `<p>Code: ${c.code} | Name: ${c.name}</p>`;
  });
  document.getElementById("list").innerHTML = output;
}

viewData();
