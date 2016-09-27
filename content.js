function walk(rootNode){
    // First replace the text of the title
    document.title = replaceText(document.title);

    // Find all the text nodes in rootNode -> which is the document body
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;
    // Modify each text node's value
    while (node = walker.nextNode()) {
    	node.nodeValue = replaceText(node.nodeValue);
    }
}	

function replaceText(text){
    // Temple -> Toilet
    text = text.replace(/\bTemple(s)?\b/g, "Toilet$1");
    text = text.replace(/\btemple(s)?\b/g, "toilet$1");
    text = text.replace(/\bTEMPLE(S)?\b/g, "TOILET$1");

    // Home -> Homeless
    text = text.replace(/\bHOME(SCREEN|PAGE)?\b/g, "HOMELESS$1");    
    text = text.replace(/\bHome(screen|page)?\b/g, "Homeless$1");    
    text = text.replace(/\bhome(screen|page)?\b/g, "homeless$1");    

    // Jobs or Careers -> Unemployment
    text = text.replace(/\bJOB(S)?\b/g, "UNEMPLOYMENT");    
    text = text.replace(/\bCAREER(S)?\b/g, "UNEMPLOYMENT");    

    text = text.replace(/\bJob(s)?\b/g, "Unemployment");    
    text = text.replace(/\bCareer(s)?\b/g, "Unemployent");    
    
    text = text.replace(/\bjob(s)?\b/g, "unemployment");    
    text = text.replace(/\bcareer(s)?\b/g, "unemployment");    

    // Privacy -> Exposed
    text = text.replace(/\bPRIVACY\b/g, "EXPOSED DATA");    
    text = text.replace(/\bPrivacy\b/g, "Exposed Data");    
    text = text.replace(/\bprivacy\b/g, "exposed data");        

    // Weather -> Climate Change
    text = text.replace(/\bWEATHER\b/g, "CLIMATE CHANGE");    
    text = text.replace(/\bWeather\b/g, "Climate Change");    
    text = text.replace(/\bweather\b/g, "climate change"); 

    // Ads/Adverts/Advertisements -> Obey
    text = text.replace(/\b(AD(S|s)?|ADVERT(S|s)?|ADVERTISEMENT(S|s)?)\b/g, "COMMANDS");    
    text = text.replace(/\b(Ad(s)?|Advert(s)?|Advertisement(s)?)\b/g, "Commands");    
    text = text.replace(/\b(ad(s)?|advert(s)?|advertisement(s)?)\b/g, "commands"); 

    text = text.replace(/\bADVERTISING\b/g, "COERCING"); 
    text = text.replace(/\bAdvertising\b/g, "Coercing");
    text = text.replace(/\badvertising\b/g, "coercing");

	return text;
}

var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        // console.log(mutation.type);
        for (var i = 0; i < arrayOfWords.length; i++){
           findWords(arrayOfWords[i], arrayOfLinks[i]);
        }        
        walk(document.body);
    });
});

var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
}

// don't replace text within these tags
// var arrayOfWords = ["Temple", "temple", "TEMPLE",
//                     "Home", "home", "HOME",
//                     "Weather", "weather", "WEATHER",
//                     "Privacy", "privacy", "PRIVACY",
//                     "Careers", "careers", "CAREERS",
//                     "Jobs", "jobs", "JOBS",
//                     "Ads", "ads", "ADS"];

var arrayOfWords = ["Temple", "Home", "Weather", "Privacy", "Careers", "Jobs", "Ads"];

var arrayOfLinks = ["http://timesofindia.indiatimes.com/india/-toilets-first-and-temples-later-Narendra-Modi-says/articleshow/23422631.cms",
                    "http://www.independent.co.uk/news/world/europe/refugee-crisis-migrants-world-day-un-a7090986.html",
                    "http://www.conserve-energy-future.com/various-climate-change-facts-php",
                    "https://www.theguardian.com/world/interactive/2013/nov/01/snowden-nsa-files-surveillance-revelations-decoded#section/6",
                    "https://www.google.com/search?q=unemployment&tbm=nws",
                    "https://www.google.com/search?q=unemployment&tbm=nws",
                    "https://www.youtube.com/watch?v=JI8AMRbqY6w"];

var skipTags = {'a': 1, 'style': 1, 'script': 1, 'iframe': 1, 'input': 1};

// find text nodes to apply replFn to
function findKW(el,term,replFn){
    var child, tag;

    for (var i = el.childNodes.length - 1; i >= 0; i--) {
        child = el.childNodes[i];


        if (child.nodeType == 1) { // ELEMENT_NODE
            tag = child.nodeName.toLowerCase();
            if (!(tag in skipTags)) {
                findKW(child, term, replFn);
            }
        }
        else if (child.nodeType == 3) { // TEXT_NODE
            replaceKW(child, term, replFn);
        }
    }
}

// replace terms in text according to replFn
function replaceKW( text, term, replFn ) {
    var match,
        matches = [];

    while (match = term.exec(text.data)) {
        matches.push(match);
    }
    for (var i = matches.length - 1; i >= 0; i--) {
        match = matches[i];

        // cut out the text node to replace
        text.splitText(match.index);
        text.nextSibling.splitText(match[1].length);
        text.parentNode.replaceChild(replFn(match[1]), text.nextSibling);
    }
};

function findWords(replTerm, linkTerm){
    findKW(document.body, new RegExp('\\b(' + replTerm + ')\\b', 'g'),
        function (match) {
            var link = document.createElement('a');
            link.href = linkTerm;
            link.innerHTML = match;
            return link;
        }
    );
}

// Got loads of help from here
// Real shoutout to these guys
// http://stackoverflow.com/questions/8949445/javascript-bookmarklet-to-replace-text-with-a-link

// This is based on the millennials to snake people chrome extension
// Look here for more help: https://developer.mozilla.org/en/docs/Web/API/MutationObserver
for (var i = 0; i < arrayOfWords.length; i++){
    findWords(arrayOfWords[i], arrayOfLinks[i]);
}
walk(document.body);
observer.observe(document.body,config);