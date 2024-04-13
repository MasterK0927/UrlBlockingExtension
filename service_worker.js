"use strict";
import { adultSiteRules } from "./blokedSites/adultSites.js";
import { socialMediaRules } from "./blokedSites/socialMedia.js";
import { illegalSiteRules } from "./blokedSites/illegalSites.js";

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  // Assign the active tab to a variable
  var activeTab = tabs[0];

  // Add a message listener to handle messages
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'openSidebar') {
      // Use the windowId from the active tab
      chrome.sidePanel.open({ windowId: activeTab.windowId });
    }
  });
});


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


