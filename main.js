//Necessary components to make connection to the contract
const contractAddress = "0x52e206d7913eAf7038EdCcD2Fd1B8B7872DE9cCa"; //Needs to be changed ! !

async function getABI() {
  let abi_;

  await fetch("./smartContract/contracts/artifacts/Ballot.json")
    .then((response) => response.json())
    .then((text) => (abi_ = text.abi))

  return abi_;
}

async function getProvider() {

  var provider = "http://127.0.0.1:8545";
  var web3Provider = new Web3.providers.HttpProvider(provider);
  var web3 = new Web3(web3Provider);
  window.web3 = web3;
}

//Get all accounts from ganache-cli
async function fetchAccounts() {

  await this.getProvider();
  let accounts;
  await web3.eth.getAccounts().then((result) => {accounts = result});

  return accounts;
}

//Get status of voting for each address (true-false) and their district
async function voteStatus(address){

  //Make connection to the contract
  await this.getProvider()
  await this.getABI().then((result) => {abi = result});
  let ballot = new web3.eth.Contract(abi, contractAddress)

  let voteStatus_;
  await ballot.methods.voters(address).call().then((result) => {voteStatus_ = result})

  return voteStatus_
}

//Function to fill the tables with data
function addCell(tr, text) {
  var td = tr.insertCell();
  td.textContent = text;
  return td;
}


//Using all the above, makes a table with adddress, vote status and district 
async function showAccounts() {

  //Clear table
  var Table = document.getElementById("accounts-table");
  Table.innerHTML = "";

  let accounts;
  await this.fetchAccounts().then((res) => {accounts = res});

  var tableContainer = document.getElementById("table-container"); 
  tableContainer.style.visibility = "visible"; 
  var table = document.getElementById("accounts-table"); 

  //Create head of the table
  var head = table.createTHead();
  var header = head.insertRow(0);
  addCell(header, '#');
  addCell(header, "Address");
  addCell(header, "Vote Status");
  addCell(header, "District");

  //Fill rest of the table
  for (let i=0; i<accounts.length; i++){
    let voteStatus_;
    await this.voteStatus(accounts[i]).then(result=>voteStatus_=result[0]); //Vote status
    let district;
    await this.voteStatus(accounts[i]).then(result=>district=result[1]); //District
    
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

  //Make connection to the contract
  await this.getProvider();
  await this.getABI().then((result) => {abi = result});
  let ballot = new web3.eth.Contract(abi, contractAddress);

  var tableContainer = document.getElementById("table-container"); 
  tableContainer.style.visibility = "visible";
  var table = document.getElementById("accounts-table");

  //Create head of the table
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

  //Fill rest of the table
  for (let i=0; i<5; i++){
    var body= table.createTBody();
    var row = body.insertRow();

    await ballot.methods.res(i).call().then(result=>data=result);

    for (let j=0; j<12; j++){
      addCell(row, data[j]);
    }
  }

  //Call counter
  await ballot.methods.countV().call().then((result) => countV_= result)

  //Show counters in the last row
  var row = body.insertRow();
  addCell(row, 'Total');
  addCell(row, countV_);
}

//Automate voting process for all accounts
async function start_voting(){
  //Clear table First
  var Table = document.getElementById("accounts-table");
  Table.innerHTML = "";

  //Make connection to the contract
  await this.getProvider();
  await this.getABI().then((result) => {abi = result});
  let ballot = new web3.eth.Contract(abi, contractAddress);

  let accounts;
  await this.fetchAccounts().then((res) => {accounts = res});
  await ballot.methods.countV().call().then((result) => countV_= result);

  //Checking if addresses have voted
  if (countV_<accounts.length){

    //Voting
    for (let i=0; i<=accounts.length; i++){
      ballot.methods.vote().send({from: accounts[i],gas:'500000'});
    }

    alert('Addresses votes successfully !');

    //Alert for max 100 voters
    if (accounts.length>100){ alert('Reached max voters')};
  } else {
    alert('Addresses have already voted !');
  }
}