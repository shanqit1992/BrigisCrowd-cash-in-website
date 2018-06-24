//listen for transaction submission
document.getElementById('myForm').addEventListener('submit', saveTransaction);

//save transactoion hsitory 
function saveTransaction(e){
    //Get form Values
    var customerName =document.getElementById('customerName').value;
    var transactionAmount =document.getElementById('transactionAmount').value;
    
    if(!validateForm(customerName, transactionAmount)){
        return false;
    }
    
    var transactionrecord = {
        name: customerName,
        amount: transactionAmount,
    }

    /*
    //local storage storing a string
    localStorage.setItem('test', 'transaction Record');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */
    
    //test if transaction record is empty
    if(localStorage.getItem('transactionrecords') === null){
        //intialize an array of transaction records
        var transactionrecords = [];
        //add to a transaction to the transaction record
        transactionrecords.push(transactionrecord);
        // add the array to the local storage JSON.stringify turns a JSON to a string
        localStorage.setItem('transactionrecords', JSON.stringify(transactionrecords));
    } else {
        //Get the tranasaction records from local storage JSON.parse turns a string back to a JSON
        var transactionrecords = JSON.parse(localStorage.getItem('transactionrecords'));
        //Add the new transaction to that array
        transactionrecords.push(transactionrecord);
        //Re-set back to local storage
        localStorage.setItem('transactionrecords', JSON.stringify(transactionrecords));
    }
    
    //clear the form
    document.getElementById('myForm').reset();
    
    //Refetch transaction history
    fetchTransactionrecords();
    
    //prevent form from submiting
    e.preventDefault();
}

// fetch transaction history 
function fetchTransactionrecords(){
    // Get bookmarks from localStorage
    var transactionrecords = JSON.parse(localStorage.getItem('transactionrecords'));
    // Get output id
    var cashinSpreadsheet = document.getElementById('cashinSpreadsheet');
  
    // Build output
    cashinSpreadsheet.innerHTML = '';
    for(var i = 0; i < transactionrecords.length; i++){
      var name = transactionrecords[i].name;
      var amount = transactionrecords[i].amount;

        cashinSpreadsheet.innerHTML += '<div class"well">' +
                                       '<h3>'+name+
                                       amount+
                                       '</h3>'+
                                       '</div>';

    }
}

function validateForm(customerName, transactionAmount){
    if (!customerName || !transactionAmount){
        alert('Please fill in the form')
        return false
    }

    var expression = /^[-+]?\d+$/;
    var regex = new RegExp(expression);
    
    if (!transactionAmount.match(regex)){
        alert('please enter a valid amount')
        return false;
    }

    return true;
}

