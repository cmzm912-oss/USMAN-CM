// Load data from localStorage
let customers = JSON.parse(localStorage.getItem("customers")) || [];
let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
let payments = JSON.parse(localStorage.getItem("payments")) || [];

function saveData() {
  localStorage.setItem("customers", JSON.stringify(customers));
  localStorage.setItem("accounts", JSON.stringify(accounts));
  localStorage.setItem("payments", JSON.stringify(payments));
  renderTable();
}

// Add Customer
function addCustomer() {
  let code = document.getElementById("code").value;
  let name = document.getElementById("name").value;

  if (!code || !name) {
    alert("Please fill both fields");
    return;
  }

  // Check for duplicate code
  let exists = customers.find(c => c.code === code);
  if (exists) {
    alert("Code already exists!");
    return;
  }

  customers.push({ code, name, status: "active" });
  saveData();
  document.getElementById("code").value = "";
  document.getElementById("name").value = "";
}

// Add Account Entry
function saveAccount() {
  let limit = Number(document.getElementById("limit").value) || 0;
  let bf = Number(document.getElementById("bf").value) || 0;

  if (!limit && !bf) {
    alert("Please enter Limit or BF value");
    return;
  }

  accounts.push({ limit, bf, total: limit + bf });
  saveData();
  document.getElementById("limit").value = "";
  document.getElementById("bf").value = "";
}

// Add Payment
function savePayment() {
  let type = document.getElementById("ptype").value;
  let amount = Number(document.getElementById("amount").value);
  let desc = document.getElementById("desc").value;

  if (!amount || !desc) {
    alert("Enter amount and description");
    return;
  }

  payments.push({ type, amount, desc });
  saveData();
  document.getElementById("amount").value = "";
  document.getElementById("desc").value = "";
}

// Render table
function renderTable() {
  let tbody = document.querySelector("#customerTable tbody");
  tbody.innerHTML = "";

  customers.forEach(customer => {
    let custAccounts = accounts.filter(a => true); // for now all accounts
    let custPayments = payments.filter(p => true); // for now all payments

    let totalLimit = custAccounts.reduce((sum,a)=>sum+a.limit,0);
    let totalBF = custAccounts.reduce((sum,a)=>sum+a.bf,0);
    let grandTotal = totalLimit + totalBF;

    // adjust grand total with payments
    custPayments.forEach(p => {
      if (p.type === "jama") grandTotal -= p.amount;
      if (p.type === "naqad") grandTotal -= p.amount;
    });

    let paymentSummary = custPayments.map(p=>`${p.type}: ${p.amount}`).join(", ");

    let row = `<tr>
      <td>${customer.code}</td>
      <td>${customer.name}</td>
      <td>${totalLimit}</td>
      <td>${totalBF}</td>
      <td>${grandTotal}</td>
      <td>${paymentSummary}</td>
    </tr>`;

    tbody.innerHTML += row;
  });
}

renderTable();
