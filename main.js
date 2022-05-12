const contractAddress = "0xfC89091d74636EF863287c844093820578378c06";

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

async function voteStatus(address){
  await this.getProvider()
  await this.getABI().then((result) => {
    abi = result;
  });

  let ballot = new web3.eth.Contract(abi, contractAddress)

  let voteStatus_;
  await ballot.methods.voters(address).call().then((result) => {
      voteStatus_ = result;
    })

  return voteStatus_
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

  var head = table.createTHead();
  var header = head.insertRow(0);
  addCell(header, '#');
  addCell(header, "Address");
  addCell(header, "Vote Status");
  addCell(header, "District");

  for (let i=0; i<accounts.length; i++){
    let voteStatus_;
    await this.voteStatus(accounts[i]).then(result=>voteStatus_=result[0]);
    let district;
    await this.voteStatus(accounts[i]).then(result=>district=result[1]);
    
    var body= table.createTBody();
    var row = body.insertRow();

    j=i+1
    addCell(row, j);
    addCell(row, accounts[i]);
    addCell(row, voteStatus_);
    addCell(row, district);
  }
}


async function showResults(){
  //Clear Table First
  var Table = document.getElementById("accounts-table");
  Table.innerHTML = "";

  await this.getProvider();
  await this.getABI().then((result) => {
    abi = result;
  });
  let ballot = new web3.eth.Contract(abi, contractAddress);

  var tableContainer = document.getElementById("table-container"); 
  tableContainer.style.visibility = "visible";

  var table = document.getElementById("accounts-table");
  function addCell(tr, text) {
    var td = tr.insertCell();
    td.textContent = text;
    return td;
  }

  var head = table.createTHead();
  var header = head.insertRow(0);
  addCell(header, 'Candidates:');
  addCell(header, "Total Votes:");
  addCell(header, "District 0:");
  addCell(header, "District 1:");
  addCell(header, "District 2:");
  addCell(header, "District 3:");
  addCell(header, "District 4:");
  addCell(header, "District 5:");
  addCell(header, "District 6:");
  addCell(header, "District 7:");
  addCell(header, "District 8:");
  addCell(header, "District 9:");

  for (let i=0; i<5; i++){
    var body= table.createTBody();
    var row = body.insertRow();

    await ballot.methods.res(i).call().then(result=>data=result);

    for (let j=0; j<12; j++){
      addCell(row, data[j]);
    }
  }

  await ballot.methods.countV().call().then((result) => countV_= result)
  var row = body.insertRow();
  addCell(row, 'Total');
  addCell(row, countV_);
}


async function start_voting(){
  var Table = document.getElementById("accounts-table");
  Table.innerHTML = "";

  await this.getProvider();
  await this.getABI().then((result) => {abi = result});

  let ballot = new web3.eth.Contract(abi, contractAddress);

  await ballot.methods.countV().call().then((result) => countV_= result)
  let accounts;
  await this.fetchAccounts().then((res) => {accounts = res});
  if (countV_<accounts.length){

    for (let i=0; i<=accounts.length; i++){
      ballot.methods.vote().send({from: accounts[i],gas:'500000'});
    }

    alert('Addresses votes successfully !');
    if (accounts.length>100){ alert('Reached max voters')};
  } else {
    alert('Addresses have already voted !');
  }
}