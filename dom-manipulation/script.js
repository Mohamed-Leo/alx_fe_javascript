// catch elements---
const quoteDisplayDiv = document.getElementById('quoteDisplay'),
newQuoteBtn = document.getElementById('newQuote'),
exportQuotesBtn = document.getElementById('exportQuotes');


let quotes = [];

// variable to check if form created--
let formCreated = false;

newQuoteBtn.addEventListener('click' , showRandomQuote);
exportQuotesBtn.addEventListener('click' , exportQuotesToJson);

function showRandomQuote () {
    // declare randomQuote--
    let randomQuote;

    // check if there is quotes in local storage first---
    if(localStorage.quotesData) {
        quotes = JSON.parse(localStorage.quotesData);
        randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteDisplayDiv.textContent = `${randomQuote.text} (${randomQuote.category})`;
    }
    // else if (quotes.length > 0) {
    //     randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    //     quoteDisplayDiv.textContent = `${randomQuote.text} (${randomQuote.category})`;
    // } 
    else {
        quoteDisplayDiv.textContent = 'No quotes available. Please add a quote.';
        !formCreated && createAddQuoteForm();
    }
}



function addQuote () {
    // get elements-----
    const newQuoteTextInput = document.getElementById('newQuoteText'),
    newQuoteCategoryInput = document.getElementById('newQuoteCategory');

    // check on values are not empty----
    if (newQuoteTextInput.value && newQuoteCategoryInput.value) {
        // get and push values---
        quotes.push({text : newQuoteTextInput.value.trim() 
        , category : newQuoteCategoryInput.value.trim()});

        // add quotes to local storage----
        localStorage.setItem('quotesData' , JSON.stringify(quotes));

        // show showRandomQuote--
        showRandomQuote();

        // clear inputs--
        newQuoteTextInput.value = '';
        newQuoteCategoryInput.value = '';
    }
}


function createAddQuoteForm() {
    let formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formDiv);

    // form created-----
    formCreated = true;
}



function exportQuotesToJson() {
    // check if there are quotes in local storage---
    if (localStorage.getItem('quotesData')) {
        const data = JSON.stringify(localStorage.quotesData);
        const blob = new Blob([data], {type : 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    else {
        quoteDisplayDiv.textContent = 'No quotes to export';
    }
}



function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(JSON.parse(event.target.result));
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}


function saveQuotes() {
    localStorage.quotesData = JSON.stringify(quotes);
}