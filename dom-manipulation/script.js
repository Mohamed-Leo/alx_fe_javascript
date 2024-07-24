// catch elements---
const quoteDisplayDiv = document.getElementById('quoteDisplay'),
newQuoteBtn = document.getElementById('newQuote'),
newQuoteTextInput = document.getElementById('newQuoteText'),
newQuoteCategoryInput = document.getElementById('newQuoteCategory');

let quotesArray = [
    {text : "text1" , category : 'cat1'},
    {text : "text2" , category : 'cat2'},
    {text : "text3" , category : 'cat3'},
    {text : "text4" , category : 'cat4'},
    {text : "text5" , category : 'cat5'}
];

newQuoteBtn.addEventListener('click' , showRandomQuote);

function showRandomQuote () {
    let randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
    quoteDisplayDiv.textContent = `${randomQuote.text} (${randomQuote.category})`;
}

function addQuote () {
    quotesArray.push({text : newQuoteTextInput.value.trim() 
    , category : newQuoteCategoryInput.value.trim()});
    
    // clear quoteDisplayDiv---
    quoteDisplayDiv.innerHTML = '';
    // display quotes----
    quotesArray.forEach(quote => {
        quoteDisplayDiv.innerHTML += `${quote.text} (${quote.category})<br>`;
    });
}