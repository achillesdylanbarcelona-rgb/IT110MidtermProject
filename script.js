const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const generateBtn = document.getElementById('generate-quote');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const quoteBox = document.getElementById('quote-box');

async function generateNewQuote() {
    errorMessage.hidden = true;
    loadingMessage.hidden = false;
    quoteText.style.display = 'none';
    quoteAuthor.style.display = 'none';
    generateBtn.disabled = true; 

    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `— ${data.author}`;

        loadingMessage.hidden = true;
        quoteText.style.display = 'block';
        quoteAuthor.style.display = 'block';
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        
        loadingMessage.hidden = true;
        errorMessage.hidden = false;
        errorMessage.textContent = "Could not fetch data. Please try again.";
        
    } finally {
        generateBtn.disabled = false;
    }
}

generateBtn.addEventListener('click', generateNewQuote);
generateNewQuote();