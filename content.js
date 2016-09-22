console.log("Working on here");

//when tab is active, this is received (form background.js) in its console
// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse) {
// 		console.log(request.count);
// 		if (request.test == "bg_message") {
// 			console.log("got it!")
// 			//call replace text function here
// 			sendResponse({type: "I got your message"});
// 		}
// });

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
    // Can replace this stuff with regex later

    // Temple -> Toilet
    // text = text.replace(/\bTemple(s)?\b/g, "<a href='http://www.cricinfo.com'>Toilet$1</a>");
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
    text = text.replace(/\bPRIVACY\b/g, "EXPOSED");    
    text = text.replace(/\bPrivacy\b/g, "Exposed");    
    text = text.replace(/\bprivacy\b/g, "exposed");        

    // Weather -> Climate Change
    text = text.replace(/\bWEATHER\b/g, "CLIMATE CHANGE");    
    text = text.replace(/\bWeather\b/g, "Climate Change");    
    text = text.replace(/\bweather\b/g, "climate change"); 

    // Ads/Adverts/Advertisements -> Obey
    text = text.replace(/\b(ADS|ADVERTS|ADVERTISEMENTS)\b/g, "OBEY");    
    text = text.replace(/\b(Ads|Adverts|Advertisements)\b/g, "Obey");    
    text = text.replace(/\b(ads|adverts|advertisements)\b/g, "obey"); 

	return text;
}

var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        // console.log(mutation.type);
        walk(document.body);
    });
});

var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
}

// This is based on the millennials to snake people chrome extension
// Look here for more help: https://developer.mozilla.org/en/docs/Web/API/MutationObserver
walk(document.body);
observer.observe(document.body,config);