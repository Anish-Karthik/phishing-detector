function collectLinks() {
  let links = [];
  Array.prototype.forEach.call(document.getElementsByTagName("a"), function(link) {
    links.push(link.href);
  });
  let text = links.join("\n");
  let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  let url = URL.createObjectURL(blob);
  chrome.runtime.sendMessage({action: "downloadLinks", url: url});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "collectLinks") {
    collectLinks();
    sendResponse({message: "Links collected and saved."});
  }
});
