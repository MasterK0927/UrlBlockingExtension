"use strict";
import { adultSiteRules } from "./blokedSites/adultSites.js";
import { socialMediaRules } from "./blokedSites/socialMedia.js";
import { illegalSiteRules } from "./blokedSites/illegalSites.js";


let isSidePanelOpen = false; //flag for tracking the state of the side panel

// Function  for toggling the side panel
function toggleSidePanel(activeTab) {
  // if (isSidePanelOpen) {
  //   //sending the message to close the sidebar if it is open but this opeion is not given by the chrome API
  //   chrome.tabs.sendMessage(activeTab.id, { action: "closeSidebar" });
  // } else {
  //   chrome.sidePanel.open({ windowId: activeTab.windowId });
  // }
  // //updating the state of the sidepanel
  // isSidePanelOpen = !isSidePanelOpen;

  //as the chrome API does not provide the option to close the sidebar, we are using the below code to close the sidebar
  chrome.sidePanel.open({ windowId: activeTab.windowId });

  // if the side panel is open, sending the instructions to the popup to close
  chrome.runtime.sendMessage({ action: "closePopup" });
}

// Querying the active tab and adding a message listener to handle messages from the content script using the chrome API named "tabs" and "runtime"
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var activeTab = tabs[0];

  // added a message listener to handle the message from the content script to toggle the sidebar using the chrome API named "runtime" and "tabs" 
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'toggleSidebar') {
      //calling the function to toggle the side panel with the active tab as the argument 
      toggleSidePanel(activeTab);
    }
  });
});

//functions to inject and deinject the service worker by adding and removing the rules from the service worker using the chrome API named "declarativeNetRequest"
export function injectServiceWorker(socialMediaChecked, adultChecked, illegalChecked) {
  const rulesToInject = [];

  if (socialMediaChecked) {
    rulesToInject.push(...socialMediaRules);
  }

  if (adultChecked) {
    rulesToInject.push(...adultSiteRules);
  }

  if (illegalChecked) {
    rulesToInject.push(...illegalSiteRules);
  }

  chrome.declarativeNetRequest.updateDynamicRules({
    "addRules": rulesToInject
  });

  console.log("Service worker started.");
}

// function to deinject the service worker by removing the rules from the service worker using the chrome API named "declarativeNetRequest" 
export function deinjectServiceWorker() {
  const removeRuleIds = [];

  if (socialMediaRules.length > 0) {
    removeRuleIds.push(...socialMediaRules.map(rule => rule.id));
  }

  if (adultSiteRules.length > 0) {
    removeRuleIds.push(...adultSiteRules.map(rule => rule.id));
  }

  if (illegalSiteRules.length > 0) {
    removeRuleIds.push(...illegalSiteRules.map(rule => rule.id));
  }

  chrome.declarativeNetRequest.updateDynamicRules({
    "removeRuleIds": removeRuleIds
  });

  console.log("Service worker stopped.");
}
