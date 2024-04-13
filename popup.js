document.addEventListener("DOMContentLoaded", function () {
    var openSidePanelButton = document.getElementById("openSidePanel");
    openSidePanelButton.addEventListener("click", function () {
      // Send a message to background script to toggle the sidebar
      chrome.runtime.sendMessage({ action: "toggleSidebar" });
    });
  });
  
  // Message listener to close the popup
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'closePopup') {
      window.close();
    }
  });
  