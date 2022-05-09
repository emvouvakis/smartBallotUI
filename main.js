const contractAddress = "0xD590A904049Ebf83c77a445AF266bed500AfA194";

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
  let data1;
  let ballot = new web3.eth.Contract(abi, contractAddress)
  await ballot.methods.res(candidate).call().then(data=>data1=data)

  return data1
}


async function fetchAllResults(){

  function candidates_range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }
  
  const a=candidates_range(5,0)
    
  let all_data=[];
  a.forEach(async function(num) {
    let data2;
    await this.fetchResults(num).then(result=>{data2=result})
    all_data.push(data2)})
  return all_data
}


async function showResults() {
  let abi_
  await this.getProvider()
  await this.getABI().then((result) => {
    abi = result;
  });
  
  var tableContainer = document.getElementById("table-container"); // pernas to id toy table
  tableContainer.style.visibility = "visible"; // kanis ton pinaka orato

  var table = document.getElementById("accounts-table");

  let all_data;
  await this.fetchAllResults().then(result=>all_data=result)

  console.log(all_data);

  function addCell(tr, text) {
      var td = tr.insertCell();
      td.textContent = text;
      return td;
  }

  // insert data
  all_data.forEach(element=>console.log(element))
    // var row = table.insertRow();
    // addCell(row, omg);
    // addCell(row, account);
  // });
}


