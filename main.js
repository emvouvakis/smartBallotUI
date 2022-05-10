const contractAddress = "0xA2442A5400372DB262647FDEF2366928a9Bc7325";

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

async function fetchResults(candidate){
  let ballot = new web3.eth.Contract(abi, contractAddress)
  await ballot.methods.res(candidate).call().then(data=>data1=data)

  return data1
}

async function fetchAllResults2(){
  let abi_
  await this.getProvider()
  await this.getABI().then((result) => {
    abi = result;
  });

  var tableContainer = document.getElementById("table-container"); // pernas to id toy table
  tableContainer.style.visibility = "visible"; // kanis ton pinaka orato

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
    await this.fetchResults(i).then(result=>{data2=result})

    for (let j=0; j<12; j++){
      addCell(row, data2[j]);
    }
  }
}


async function vote_one(address){
  let abi_
  
  await this.getProvider()
  await this.getABI().then((result) => {
    abi = result;
  });
  let accounts;
  await this.fetchAccounts().then((res) => {
  accounts = res;
  });
  address=accounts[0]

  let ballot = new web3.eth.Contract(abi, contractAddress)
  ballot.methods.vote(address).call()
}

async function start_voting(){

  let accounts;
  await this.fetchAccounts().then((res) => {
  accounts = res;
  });

  accounts.forEach(async function(address){
    vote_one(address)
  })
  accounts.forEach(element=>console.log(element))

  
}



