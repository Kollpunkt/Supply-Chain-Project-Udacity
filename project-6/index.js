// import Web3 from 'web3';
import supplyChainArtifact from "../build/contracts/SupplyChain.json" assert { type: "json" };
//import supplyChainArtifact from "../build/contracts/SupplyChain.json"; 
// var supplyChainArtifact = require("../build/contracts/SupplyChain.json");
const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      console.log(supplyChainArtifact);
      const deployedNetwork = supplyChainArtifact.networks[networkId];
      // const deployedNetwork = supplyChainArtifact.networks[networkId] 
      console.log(deployedNetwork);
      
      this.meta = new web3.eth.Contract(
        supplyChainArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("ftc-history");
    status.innerHTML = message;
  },

  addFarmer: async function() {
    //const { isFarmer } = this.meta.methods;
     
    const originFarmerID = document.getElementById("farmerID").value;
    console.log(originFarmerID);
    const originFarmerIDHex = originFarmerID.toString(16);
    console.log(originFarmerIDHex);
    console.log(this.account);
    //await addFarmer(originFarmerID).call({from: this.account});

    const check2 = await this.meta.methods.isFarmer(originFarmerIDHex).call();
    console.log(check2);

    App.setStatus("Access as Farmer granted to " + originFarmerID + ".");
  },

  fetchItemBufferOne: async function(){
    const { fetchItemBufferOne } = this.meta.methods;
     
    const itemBufferOne = await fetchItemBufferOne(1).call({from: this.account});
    console.log(itemBufferOne);

    App.setStatus("/n ItemBufferOne fetched.");
  },

  harvestItem: async function() {
    const { harvestItem } = this.meta.methods;
    const upc = document.getElementById("upc").value;
    const sku = document.getElementById("sku").value; 
    const originFarmerID = this.account; // document.getElementById("farmerID").value;
    const originFarmName = document.getElementById("originFarmName").value;;
    const originFarmInformation = document.getElementById("originFarmInformation").value;
    const originFarmLatitude = document.getElementById("originFarmLatitude").value;
    const originFarmLongitude = document.getElementById("originFarmLongitude").value;
    const productNotes = document.getElementById("farmerID").value;
    const ownerID = this.account; // document.getElementById("farmerID").value;
    const productID = 1;

    await harvestItem(upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes, productID).call({from:this.account})
    //console.log(originFarmerID)
    console.log(this.account);


    const check1 = await fetchItemBufferOne(1).call({from: this.account});
    console.log(check1);

    App.setStatus("Access as Farmer granted to " + originFarmerID + ".");
  },


};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"),);
  }

  App.start();
});