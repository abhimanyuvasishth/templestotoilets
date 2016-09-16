//this will only run once the extension is loaded the first time
console.log("Running background now!");

var count = 1;

// This listener is called when a tab becomes active
// in a window (e.g. the user clicks on the tab icon)
chrome.tabs.onActivated.addListener(function(details) {
	count = count + 1;
	var test_var = "bg_message";
	var tabId = details.tabId;
	var windowId = details.windowId;
	var title = details.tabTitle;
	console.log('tab activated with id:',tabId,
	              ' in window id: ', windowId, ' count: ', count);

	//this is sent to the tab / content.js
	chrome.tabs.sendMessage(tabId, {tab: tabId, win: windowId, test: test_var, count: count}, function(response) {
		console.log('here in background.js');
	});

	//chrome.pageAction.show(tabId);
	});

