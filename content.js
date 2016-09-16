console.log("Working on here");

//when tab is active, this is received (form background.js) in its console
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request.count);
		if (request.test == "bg_message") {
			console.log("got it!")


			//call replace text function here


			sendResponse({type: "I got your message"});
		}
	})