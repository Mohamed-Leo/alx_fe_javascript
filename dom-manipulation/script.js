// catch elements---
const quoteDisplayDiv = document.getElementById('quoteDisplay'),
newQuoteBtn = document.getElementById('newQuote');
// newQuoteTextInput = document.getElementById('newQuoteText'),
// newQuoteCategoryInput = document.getElementById('newQuoteCategory');

let quotesArray = [];

// variable to check if form created--
let formCreated = false;

newQuoteBtn.addEventListener('click' , showRandomQuote);

function showRandomQuote () {
    if (quotesArray.length > 0) {
        let randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
        quoteDisplayDiv.textContent = `${randomQuote.text} (${randomQuote.category})`;
    } 
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
        quotesArray.push({text : newQuoteTextInput.value.trim() 
        , category : newQuoteCategoryInput.value.trim()});

        // show showRandomQuote--
        showRandomQuote();
    }
}


function createAddQuoteForm() {
    let formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.append(formDiv);

    // form created-----
    formCreated = true;
}