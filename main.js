const contractAddress = "0x05A956ab48C7bDf9227DD134f81c77282aD094dD";

async function getABI() {
  let abi_;

  await fetch("./smartContract/contracts/artifacts/Ballot.json")
    .then((response) => response.json())
    .then((text) => (abi_ = text.abi))
    //.then(abi=>abi1=abi)
    //.then((abi) => console.log(abi));

  return abi_;
}


async function getProvider() {
  // const web3 = new Web3("http://127.0.0.1:8545");
  // const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
  var provider = "http://127.0.0.1:7545";
  var web3Provider = new Web3.providers.HttpProvider(provider);
  var web3 = new Web3(web3Provider);
  window.web3 = web3;
}

async function fetchAccounts() {
  // var provider = "http://127.0.0.1:7545";
  // var web3Provider = new Web3.providers.HttpProvider(provider);
  // var web3 = new Web3(web3Provider);
  await this.getProvider()
  let accounts;
  await web3.eth.getAccounts().then((result) => {
    accounts = result;
  });

  return accounts;
}

async function showAccounts() {
  let accounts;
  await this.fetchAccounts().then((res) => {
    accounts = res;
  });

  // make button hidden
  var btn = document.getElementById("btn-accounts"); // pernas to id toy table
  // btn.style.visibility = "hidden"; // kanis ton pinaka orato

  // make table visible
  var tableContainer = document.getElementById("table-container"); // pernas to id toy table
  tableContainer.style.visibility = "visible"; // kanis ton pinaka orato

  var table = document.getElementById("accounts-table"); // perneis ton pinaka

  // helper function        
  function addCell(tr, text) {
      var td = tr.insertCell();
      td.textContent = text;
      return td;
  }

  // insert data
  accounts.forEach(function (account, index) {
    var row = table.insertRow();
    addCell(row, index);
    addCell(row, account);
  });
}

async function start() {
  let abi_
  await this.getProvider()
  await this.getABI().then((result) => {
    abi = result;
  });

  const ballot = new web3.eth.Contract(abi, contractAddress)
  ballot.methods.getInfo().call().then(data => {console.log(data)})
  // web3.eth.defaultAccount=accounts[0]
  // ballot.forEach()


}


