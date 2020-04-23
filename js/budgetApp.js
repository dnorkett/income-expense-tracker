//*** ***//
let incomeRecords = [];
let expenseRecords = [];

//*** INPUTS & DOM ***//
let newItemSign = document.querySelector('#valueSign');
let newItemDescription = document.querySelector('#description');
let newItemAmount = document.querySelector('#amount');
let submitButton = document.querySelector('.submitButton');

let incomeItems = document.querySelector('.incomeItems');
let expenseItems = document.querySelector('.expenseItems');

let incomeAmount = document.querySelector('.incomeAmount');
let expensesAmount = document.querySelector('.expensesAmount');
let budgetAmount = document.querySelector('#budgetAmount');
let percentCalcValue = document.querySelector('#percentCalcValue');

//*** FUNCTIONS ***//
function clearInput() {
    newItemSign.value = '+';
    newItemDescription.value = '';
    newItemAmount.value = '';
}

function updateAmounts() {
    incomeItems.innerHTML = '';
    expenseItems.innerHTML = '';
    
    incomeRecords.forEach(item => {        
        let newRecord = document.createElement('li');
        let newRecordDescription = document.createElement('span');
        let newRecordAmount = document.createElement('span');
        let newRecordDelete = document.createElement('i');        
        

        newRecordDescription.innerText = item.description;
        newRecordAmount.innerText = `${item.sign} ${item.amount}`;  
        
        newRecord.appendChild(newRecordDescription);
        newRecord.appendChild(newRecordAmount);        
        newRecord.classList.add('incomeItem');

        incomeItems.appendChild(newRecord)
    });

    expenseRecords.forEach(item => {        
        let newRecord = document.createElement('li');
        let newRecordDescription = document.createElement('span');
        let newRecordAmount = document.createElement('span');

        newRecordDescription.innerText = item.description;
        newRecordAmount.innerText = `${item.sign} ${item.amount}`;
        
        newRecord.appendChild(newRecordDescription);
        newRecord.appendChild(newRecordAmount);
        newRecord.classList.add('expenseItem');
        
        expenseItems.appendChild(newRecord);
    });     
}

function updateTotal() {
    let incomeTotal = incomeRecords.reduce(function(sum, record) { return sum + record.amount}, 0);
    let expenseTotal = expenseRecords.reduce(function(sum, record) { return sum + record.amount}, 0);
    let totalAmount =  incomeTotal - expenseTotal 
    
    if (incomeTotal != 0 && expenseTotal != 0) {
        expensePercent = `${((expenseTotal / incomeTotal)*100).toFixed(2)}%`;
    } else {
        expensePercent = '---';
    }

    budgetAmount.innerText = `${totalAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    incomeAmount.innerText = `${incomeTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    expensesAmount.innerText = `${expenseTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    

    percentCalcValue.innerText = expensePercent;
}


function addNewItem() {    
    if (newItemDescription.value && newItemAmount.value > 0) {
        if (newItemSign.value === '+'){
            incomeRecords.push({sign: newItemSign.value, description: newItemDescription.value, amount: parseInt(newItemAmount.value)});
        } else {
            expenseRecords.push({sign: newItemSign.value, description: newItemDescription.value, amount: parseInt(newItemAmount.value)});
        }

        clearInput();
        updateAmounts();
        updateTotal();
    }
}


function setDate() {
    let today = new Date();
    let month = document.querySelector('#month');
    let year = document.querySelector('#year');

    month.innerText = today.toLocaleString('default', {month: 'long'});
    year.innerText = today.getFullYear();
}

//*** Event Listeners ***//
submitButton.addEventListener("click", addNewItem);
setDate();