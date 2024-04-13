document.addEventListener("DOMContentLoaded", function () {
    var openSidePanelButton = document.getElementById("openSidePanel");
    openSidePanelButton.addEventListener("click", function () {
      // Send a message to background script to toggle the sidebar
      chrome.runtime.sendMessage({ action: "openSidebar" });
    });
  });