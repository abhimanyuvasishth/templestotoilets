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

function replaceText(v){
	v = v.replace("temple","toilet");
    v = v.replace(/(H|h)ome/,"homeless");
    v = v.replace("Temple","Toilet");
    v = v.replace("temples","toilets");
    v = v.replace("Temples","Toilets");
	return v;
}

var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        console.log(mutation.type);
        walk(document.body);
    });
});

observer.observe(document.body,{attributes:true,childList:true,characterData:true});

// This is based on the millennials to snake people chrome extension
walk(document.body);