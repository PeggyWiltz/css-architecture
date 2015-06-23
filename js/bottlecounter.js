// JavaScript source code

function randomIntFromInterval(min, max) {
    //Method found here: http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setQuote () {
    var quoteArray = [
        {
            "text": "Beer is made by men, wine by God.",
            "author": "Martin Luther"
        },
        {
            "text": "I cook with wine, sometimes I even add it to the food.",
            "author": "W.C. Fields"
        },
        {
            "text": "Either give me more wine or leave me alone.",
            "author": "Rumi"
        },
        {
            "text": "Wine is the most healthful and most hygienic of beverages.",
            "author": "Louis Pasteur"
        },
        {
            "text": "Age appears best in four things: old wood to burn, old wine to drink, old friends to trust and old authors to read.",
            "author": "Francis Bacon"
        },
        {
            "text": "What wine goes with Captain Crunch?",
            "author": "George Carlin"
        },
        {
            "text": "In wine, there's truth.",
            "author": "Pliny the Elder"
        },
        {
            "text": "I pray you, do not fall in love with me, for I am falser than vows made in wine.",
            "author": "William Shakespeare"
        },
        {
            "text": "Give me wine to wash me clean of the weather-stains of cares.",
            "author": "Ralph Waldo Emerson"
        },
        {
            "text": "If we sip the wine, we find dreams coming upon us out of the imminent night",
            "author": "D.H. Lawrence"
        },
        {
            "text": "Wine makes all things possible.",
            "author": "George R.R. Martin"
        },
        {
            "text": "They are not long, the days of wine and roses.",
            "author": "Ernest Dowson"
        },
        {
            "text": "A bottle of wine begs to be shared; I have never met a miserly wine lover.",
            "author": "Clifton Fadiman"
        },
        {
            "text": "Life's too short to drink cheap wine...",
            "author": "Cliff Hakim"
        }
    ];
    var numQuotes = quoteArray.length;
    if (numQuotes > 0) {
        var rand = randomIntFromInterval(0, numQuotes);
        var myQuote = quoteArray[rand];
        
        var quoteNode = document.getElementById("home").firstElementChild.firstElementChild.lastElementChild;
        var oldQuote = quoteNode.firstElementChild.firstChild.nodeValue;
        var oldAuthor = quoteNode.lastElementChild.firstChild.nodeValue;
        oldAuthor = myQuote.author;
        oldQuote = myQuote.text;
    }
}

window.onload = function () {

    var el = document.getElementById("header__text");
    if (el.addEventListener) {
        el.addEventListener("mouseover", setQuote, false);
    } else {
        el.attachEvent('onmouseover', setQuote);
    }

};
//document.getElementsByTagName("header")[0].addEventListener("mouseover", setQuote, false);



