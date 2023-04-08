document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("collect-links").addEventListener("click", async function() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: collectLinks,
    }, function (result) {
      console.log(result);
    });
  });
});

function collectLinks() {
  let links = [];
  Array.prototype.forEach.call(document.getElementsByTagName("a"), function(link) {
    links.push(link.href);
  });
  let text = links.join("\n");
  let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  let url = URL.createObjectURL(blob);
  chrome.downloads.download({ url: url, filename: "links.txt", saveAs: true });
}
