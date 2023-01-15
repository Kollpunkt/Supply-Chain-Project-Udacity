// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.toWei(1, "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x0000000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // 1st Test
    it("1) Testing access right granting for farmer", async() => {
        const supplyChain = await SupplyChain.deployed()
        

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event
        var event = supplyChain.FarmerAdded(accounts[1])
        await event.watch((err, res) => {
            eventEmitted = true
        })

        //Grant account[1] access as farmer by owner=accounts[0]
        await supplyChain.addFarmer(accounts[1], {from: accounts[0]});

        //Check that the right role was granted
        const accountToBeChecked = originFarmerID;
        checkIsFarmer = await supplyChain.isFarmer(accountToBeChecked);
        checkIsDistributor = await supplyChain.isDistributor(accountToBeChecked);
        checkIsRetailer = await supplyChain.isRetailer(accountToBeChecked);
        checkIsConsumer = await supplyChain.isConsumer(accountToBeChecked);
        assert.equal(checkIsFarmer, true, 'error: Granting access resulted in invalid isFarmer') 
        assert.equal(checkIsDistributor, false, 'Error: Granting access resulted in invalid isDistributor') 
        assert.equal(checkIsRetailer, false, 'Error: Granting access resulted in invalid isRetailer') 
        assert.equal(checkIsConsumer, false, 'Error: Granting access resulted in invalid isConsumer') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')    
    })   

    // 2nd Test
    it("2) Testing access right granting for distributor", async() => {
        const supplyChain = await SupplyChain.deployed()
        

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event DistributorAdded()
        var event = supplyChain.DistributorAdded(distributorID)
        await event.watch((err, res) => {
            eventEmitted = true
        })

        //Grant access as distributor by owner=accounts[0]
        await supplyChain.addDistributor(distributorID, {from: accounts[0]});

        //Check that the right role was granted
        const accountToBeChecked = distributorID;
        checkIsFarmer = await supplyChain.isFarmer(accountToBeChecked);
        checkIsDistributor = await supplyChain.isDistributor(accountToBeChecked);
        checkIsRetailer = await supplyChain.isRetailer(accountToBeChecked);
        checkIsConsumer = await supplyChain.isConsumer(accountToBeChecked);
        assert.equal(checkIsFarmer, false, 'Error: Granting access resulted in invalid isFarmer') 
        assert.equal(checkIsDistributor, true, 'Error: Granting access resulted in invalid isDistributor') 
        assert.equal(checkIsRetailer, false, 'Error: Granting access resulted in invalid isRetailer') 
        assert.equal(checkIsConsumer, false, 'Error: Granting access resulted in invalid isConsumer') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')   
    })    

        // 3rd Test
    it("3) Testing access right granting for retailer", async() => {
        const supplyChain = await SupplyChain.deployed()
        

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event RetailerAdded()
        var event = supplyChain.RetailerAdded(accounts[3])
        await event.watch((err, res) => {
            eventEmitted = true
        })

        //Grant access as retailer by owner=accounts[0]
        await supplyChain.addRetailer(retailerID, {from: accounts[0]});

        //Check that the right role was granted
        const accountToBeChecked = retailerID;
        checkIsFarmer = await supplyChain.isFarmer(accountToBeChecked);
        checkIsDistributor = await supplyChain.isDistributor(accountToBeChecked);
        checkIsRetailer = await supplyChain.isRetailer(accountToBeChecked);
        checkIsConsumer = await supplyChain.isConsumer(accountToBeChecked);
        assert.equal(checkIsFarmer, false, 'Error: Granting access resulted in invalid isFarmer') 
        assert.equal(checkIsDistributor, false, 'Error: Granting access resulted in invalid isDistributor') 
        assert.equal(checkIsRetailer, true, 'Error: Granting access resulted in invalid isRetailer') 
        assert.equal(checkIsConsumer, false, 'Error: Granting access resulted in invalid isConsumer') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')    
    })    

    // 4th Test
    it("4) Testing access right granting for consumer", async() => {
        const supplyChain = await SupplyChain.deployed()
        

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event ConsumerAdded()
        var event = supplyChain.ConsumerAdded(accounts[4])
        await event.watch((err, res) => {
            eventEmitted = true
        })

        //Grant access as consumer by owner=accounts[0]
        await supplyChain.addConsumer(accounts[4], {from: accounts[0]});

        //Check that the right role was granted
        const accountToBeChecked = consumerID;
        checkIsFarmer = await supplyChain.isFarmer(accountToBeChecked);
        checkIsDistributor = await supplyChain.isDistributor(accountToBeChecked);
        checkIsRetailer = await supplyChain.isRetailer(accountToBeChecked);
        checkIsConsumer = await supplyChain.isConsumer(accountToBeChecked);
        assert.equal(checkIsFarmer, false, 'Error: Granting access resulted in invalid isFarmer') 
        assert.equal(checkIsDistributor, false, 'Error: Granting access resulted in invalid isDistributor') 
        assert.equal(checkIsRetailer, false, 'Error: Granting access resulted in invalid isRetailer') 
        assert.equal(checkIsConsumer, true, 'Error: Granting access resulted in invalid isConsumer') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')    
    })    

    // 5th Test
    it("5) Testing that access right granting for distributor cant be done by someone who is not owner", async() => {
        const supplyChain = await SupplyChain.deployed()
        

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event
        var event = supplyChain.DistributorAdded(accounts[5])
        await event.watch((err, res) => {
            eventEmitted = true
        })

        //Grant account[5] access as distributor by adddress that is not owner => accounts[1]
        var transactionPassed = false;        
        supplyChain.addDistributor(accounts[5], {from: accounts[1]})
        .then((err, res) => {
            //Would be error if resolved
            transactionPassed=true       
        })
        .catch((err, res) => {
            //Expectation that EVM reverts
            transactionPassed=false       
        });       
        
        //Check that it was reverted 
        assert.equal(transactionPassed, false, 'Granting could take place by non-owner')

        //Check that the right role was granted
        const accountToBeChecked = accounts[5];
        checkIsFarmer = await supplyChain.isFarmer(accountToBeChecked);
        checkIsDistributor = await supplyChain.isDistributor(accountToBeChecked);
        checkIsRetailer = await supplyChain.isRetailer(accountToBeChecked);
        checkIsConsumer = await supplyChain.isConsumer(accountToBeChecked);
        assert.equal(checkIsFarmer, false, 'Error: Granting access resulted in invalid isFarmer') 
        assert.equal(checkIsDistributor, false, 'Error: Granting access resulted in invalid isDistributor') 
        assert.equal(checkIsRetailer, false, 'Error: Granting access resulted in invalid isRetailer') 
        assert.equal(checkIsConsumer, false, 'Error: Granting access resulted in invalid isConsumer') 
        assert.equal(eventEmitted, false, 'Invalid event emitted')    
    })    

    // 6th Test
    it("6) Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Harvested()
        var event = supplyChain.Harvested()
        await event.watch((err, res) => {
            eventEmitted = true
        })

        // Mark an item as Harvested by calling function harvestItem()
        await supplyChain.harvestItem(upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes, productID, {from: accounts[1]})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferTwo[2], productID, 'Error: Invalid item Product ID')   
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')        
    })    

    // 7th Test
    it("7) Testing smart contract function processItem() that allows a farmer to process coffee", async() => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Processed()
        var event = supplyChain.Processed()
        await event.watch((err, res) => {
            eventEmitted = true
        })
        
        // Mark an item as Processed by calling function processtItem()
        await supplyChain.processItem(upc, {from: originFarmerID});
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)       

        // Verify the result set
        assert.equal(resultBufferTwo[5], 1, 'Error: Invalid item State') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')  
        
    })    

    // 8th Test
    it("8) Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Packed()
        var event = supplyChain.Packed()
        await event.watch((err, res) => {
            eventEmitted = true
        })
        
        // Mark an item as Processed by calling function processtItem()
        await supplyChain.packItem(upc, {from: originFarmerID});
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)       

        // Verify the result set
        assert.equal(resultBufferTwo[5], 2, 'Error: Invalid item State') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')  
    })    

    // 9th Test
    it("9) Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event ForSale()
        var event = supplyChain.ForSale()
        await event.watch((err, res) => {
            eventEmitted = true
        })
        
        // Mark an item as Processed by calling function processtItem()
        await supplyChain.sellItem(upc, productPrice, {from: originFarmerID});
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)       

        // Verify the result set
        assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')      
    })    

    // 10th Test
    it("10) Testing smart contract function buyItem() to revert as value is smaller than product price", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Sold()
        var event = supplyChain.Sold()
        await event.watch((err, res) => {
            eventEmitted = true
        })
        var beforeAccountBalanceFarmer = await web3.eth.getBalance(originFarmerID);
        var beforeAccountBalanceDistributor = await web3.eth.getBalance(distributorID);
        // Buy item as distributor with less than product Price of 1 ETH
        const offerPrice = web3.toWei(0.90,"ether");

        var transactionPassed = false;        
        await supplyChain.buyItem(upc, {from: distributorID, value: offerPrice, gasUsed:0, gasPrice:0})
        .then((err, res) => {
            //Would be error if resolved
            transactionPassed=true       
        })
        .catch((err, res) => {
            //Expectation that EVM reverts
            transactionPassed=false       
        });  

        //Check that it was reverted 
        assert.equal(transactionPassed, false, 'Error: Transaction should have been reverted')

        //Account balance must remain unchanged
        var afterAccountBalanceFarmer = await web3.eth.getBalance(originFarmerID);
        var afterAccountBalanceDistributor = await web3.eth.getBalance(distributorID);
        assert.equal(afterAccountBalanceFarmer - beforeAccountBalanceFarmer, 0, 'Error: Balance Farmer changed')
        assert.equal(afterAccountBalanceDistributor - beforeAccountBalanceDistributor, 0, 'Error: Balance Distributor changed')
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)       

        // Verify the result set
        // State should still be ForSale
        assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State')
        //OwnerId should still be farmer not retailer
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Farmer is no longer owner')
        //RetailerID should remain empty
        assert.equal(resultBufferTwo[6], emptyAddress, 'Error: DistributorID was updated')
         
        // Event should not have been emitted
        assert.equal(eventEmitted, false, 'Error: Invalid event emitted')      
    
    })    
        
    // 11th Test
    it("11) Testing smart contract function buyItem() with returning overpaid amount", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Sold()
        var event = supplyChain.Sold()
        await event.watch((err, res) => {
            eventEmitted = true
        })
        var beforeAccountBalanceFarmer = await web3.eth.getBalance(originFarmerID);
        var beforeAccountBalanceDistributor = await web3.eth.getBalance(distributorID);
        // Buy item as distributor with more than productPrice
        const offerPrice2 = web3.toWei(1.01,'ether');

        var transactionPassed = false;   
        const transactionReceipt = await supplyChain.buyItem(upc, {from: distributorID, value: offerPrice2, gasUsed:0, gasPrice:0});

        //Account balance must chain but only by productPrice not offerPrice2
        var afterAccountBalanceFarmer = await web3.eth.getBalance(originFarmerID);
        var afterAccountBalanceDistributor = await web3.eth.getBalance(distributorID);

        // Trying to get the actual transaction costs - gave up in the end as there remained a tiny difference
        // set gasUsed anf GasPrice to 0 so transaction costs will be 0
        const transaction = await web3.eth.getTransaction(transactionReceipt.tx);
        const transactionCosts = transaction.gasPrice.mul(transactionReceipt.receipt.gasUsed);
        
        // console.log(productPrice+"/"+offerPrice2);
        // console.log(afterAccountBalanceFarmer +"/"+ beforeAccountBalanceFarmer);
        // console.log(afterAccountBalanceDistributor +"/"+ beforeAccountBalanceDistributor);
        // console.log(transactionReceipt);
        // console.log(transactionCosts);


        assert.equal(afterAccountBalanceFarmer - beforeAccountBalanceFarmer, productPrice, 'Error: Balance Farmer not correct')
        assert.equal(afterAccountBalanceDistributor - beforeAccountBalanceDistributor, -productPrice -transactionCosts, 'Error: Balance Distributor not correct')
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)       

        // Verify the result set
        // State should be changed to Sold
        assert.equal(resultBufferTwo[5], 4, 'Error: Invalid item State')
        //OwnerId should still be farmer not retailer
        assert.equal(resultBufferOne[2], distributorID, 'Error: Distributor did not become owner')
        //RetailerID should change 
        assert.equal(resultBufferTwo[6], distributorID, 'Error: distributorID was not updated correctly')
         
         
        // Event should have been emitted
        assert.equal(eventEmitted, true, 'Invalid event emitted')      
        
    }) 
    // 12th Test
    it("12) Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Shipped()
        var event = supplyChain.Shipped()
        await event.watch((err, res) => {
            eventEmitted = true
        })
        
        // Mark an item as Processed by calling function processtItem()
        await supplyChain.shipItem(upc, {from: distributorID});
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)       

        // Verify the result set
        assert.equal(resultBufferTwo[5], 5, 'Error: Invalid item State') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')         })    

    // 13th Test
    it("13) Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Received()
        var event = supplyChain.Received()
        await event.watch((err, res) => {
            eventEmitted = true
        })
        
        // Mark an item as Processed by calling function receiveItem()
        await supplyChain.receiveItem(upc, {from: retailerID});
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)       

        // Verify the result set
        assert.equal(resultBufferTwo[5], 6, 'Error: Invalid item State') 
        assert.equal(eventEmitted, true, 'Invalid event emitted')
        //retailerID should change 
        assert.equal(resultBufferTwo[7], retailerID, 'Error: retailerID was not updated correctly')
    })    

    // 14th Test
    it("14) Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Purchased()
        var event = supplyChain.Purchased()
        await event.watch((err, res) => {
            eventEmitted = true
        })

        var beforeAccountBalanceRetailer = await web3.eth.getBalance(retailerID);
        var beforeAccountBalanceConsumer = await web3.eth.getBalance(consumerID);

        // Buy item as consumer with more than productPrice of 1 ETH
        const offerPrice2 = web3.toWei(1.01,'ether');

        var transactionPassed = false;   
        const transactionReceipt = await supplyChain.purchaseItem(upc, {from: consumerID, value: offerPrice2, gasUsed:0, gasPrice:0});

        //Account balance must chain but only by productPrice not offerPrice2
        var afterAccountBalanceRetailer = await web3.eth.getBalance(retailerID);
        var afterAccountBalanceConsumer = await web3.eth.getBalance(consumerID);

        // Trying to get the actual transaction costs - gave up in the end as there remained a tiny difference
        // set gasUsed anf GasPrice to 0 so transaction costs will be 0
        const transaction = await web3.eth.getTransaction(transactionReceipt.tx);
        const transactionCosts = transaction.gasPrice.mul(transactionReceipt.receipt.gasUsed);
        
        // console.log(productPrice+"/"+offerPrice2);
        // console.log(afterAccountBalanceFarmer +"/"+ beforeAccountBalanceFarmer);
        // console.log(afterAccountBalanceDistributor +"/"+ beforeAccountBalanceDistributor);
        // console.log(transactionReceipt);
        // console.log(transactionCosts);


        assert.equal(afterAccountBalanceRetailer - beforeAccountBalanceRetailer, productPrice, 'Error: Balance Distributor not correct')
        assert.equal(afterAccountBalanceConsumer - beforeAccountBalanceConsumer, -productPrice -transactionCosts, 'Error: Balance Distributor not correct')
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)       

        // Verify the result set
        // State should be changed to Purchased
        assert.equal(resultBufferTwo[5], 7, 'Error: Invalid item State')
        //OwnerId should still be farmer not retailer
        assert.equal(resultBufferOne[2], consumerID, 'Error: Consumer did not become owner')
        //consumerID should change 
        assert.equal(resultBufferTwo[8], consumerID, 'Error: consumerID was not updated correctly')
         
         
        // Event should have been emitted
        assert.equal(eventEmitted, true, 'Invalid event emitted')      
        
    })    

    // 15th Test
    it("15) Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
    })

    // 16th Test
    it("16) Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferTwo[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferTwo[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[2], productID, 'Error: Invalid item Product ID')        
        assert.equal(resultBufferTwo[3], productNotes, 'Error: Invalid item Product Notes')    
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid item Product Price')
        assert.equal(resultBufferTwo[5], 7, 'Error: Invalid Item State')        
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid Distributor ID')
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid Retailer Id')
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid Consumer ID') 
    
    
    })

});

