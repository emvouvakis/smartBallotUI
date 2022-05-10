const contractAddress = "0x002Aaf0397e0ac8CB06D2Fc31fC3CC11305745AC";

async function getABI() {
  let abi_;

  await fetch("./smartContract/contracts/artifacts/Ballot.json")
    .then((response) => response.json())
    .then((text) => (abi_ = text.abi))

  return abi_;
}


async function getProvider() {

  var provider = "http://127.0.0.1:7545";
  var web3Provider = new Web3.providers.HttpProvider(provider);
  var web3 = new Web3(web3Provider);
  window.web3 = web3;
}

async function fetchAccounts() {

  await this.getProvider()
  let accounts;
  await web3.eth.getAccounts().then((result) => {
    accounts = result;
  });

  return accounts;
}

async function showAccounts() {
  var Table = document.getElementById("accounts-table");
  Table.innerHTML = "";

  let accounts;
  await this.fetchAccounts().then((res) => {
    accounts = res;
  });

  var tableContainer = document.getElementById("table-container"); 
  tableContainer.style.visibility = "visible"; 

  var table = document.getElementById("accounts-table"); //

 
  function addCell(tr, text) {
      var td = tr.insertCell();
      td.textContent = text;
      return td;
  }

  accounts.forEach(function (account, index) {
    var row = table.insertRow();
    addCell(row, index);
    addCell(row, account);
  });
}


async function showResults(){
  //Clear Table First
  var Table = document.getElementById("accounts-table");
  Table.innerHTML = "";

  await this.getProvider()
  await this.getABI().then((result) => {
    abi = result;
  });
  let ballot = new web3.eth.Contract(abi, contractAddress)

  var tableContainer = document.getElementById("table-container"); 
  tableContainer.style.visibility = "visible";

  var table = document.getElementById("accounts-table");
  function addCell(tr, text) {
    var td = tr.insertCell();
    td.textContent = text;
    return td;
}

  var row = table.insertRow();
  addCell(row, 'Candidates:');
  addCell(row, "Total Votes:")
  addCell(row, "District 0:")
  addCell(row, "District 1:")
  addCell(row, "District 2:")
  addCell(row, "District 3:")
  addCell(row, "District 4:")
  addCell(row, "District 5:")
  addCell(row, "District 6:")
  addCell(row, "District 7:")
  addCell(row, "District 8:")
  addCell(row, "District 9:")

  for (let i=0; i<5; i++){
    let data2;
    var row = table.insertRow();

    await ballot.methods.res(i).call().then(result=>data=result)

    for (let j=0; j<12; j++){
      addCell(row, data[j]);
    }
  }
}


async function start_voting(){
  
  await this.getProvider()
  await this.getABI().then((result) => {
    abi = result;
  });

  let ballot = new web3.eth.Contract(abi, contractAddress)

  let accounts;
  await this.fetchAccounts().then((res) => {
  accounts = res;
  });


  for (let i=0; i<50; i++){
    // web3.eth.getBalance(accounts[0]).then(result => console.log(result));
    // web3.eth.getBlock("latest").gasLimit.then(result => console.log(result));
    // console.log(accounts[i])
    ballot.methods.vote().send({from: accounts[i],gas:'500000'})
  }
  alert("Voting Competed!")
}