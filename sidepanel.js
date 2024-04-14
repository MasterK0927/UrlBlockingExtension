import { injectServiceWorker, deinjectServiceWorker } from './service_worker.js';

const adultToggle = document.getElementById('adultCheckbox');
const socialToggle = document.getElementById('socialMediaCheckbox');
const illegalToggle = document.getElementById('illegalCheckbox');
const urlBlockToggle = document.getElementById('urlBlockToggle');
const toggleOnText = document.getElementById('toggleOnText');

// Function to safely add event listener to an element if it exists else it will return an rerror
function addEventListenerIfExist(element, event, handler) {
  if (element) {
    element.addEventListener(event, handler);
  } else {
    console.error(`Element does not exist: ${element}`);
  }
}

// Add event listeners only if the checkboxes exist else not added
addEventListenerIfExist(adultToggle, 'change', function () {
  if (this.checked) {
    console.log('Adult toggle checked');
    injectServiceWorker(false, true, false); // Injecting the service worker with adult sites rules
  } else {
    console.log('Adult toggle unchecked');
    deinjectServiceWorker();
    // window.location.reload(); //uncomment this option if wants to update all rules to null
  }
});

addEventListenerIfExist(socialToggle, 'change', function () {
  if (this.checked) {
    console.log('Social toggle checked');
    injectServiceWorker(true, false, false); // Injecting the service worker with social media rules
  } else {
    console.log('Social toggle unchecked');
    deinjectServiceWorker();
    // window.location.reload();
  }
});

addEventListenerIfExist(illegalToggle, 'change', function () {
  if (this.checked) {
    console.log('Illegal toggle checked');
    injectServiceWorker(false, false, true); // Injecting the service worker with illegal sites rules
  } else {
    console.log('Illegal toggle unchecked');
    deinjectServiceWorker();
    // window.location.reload();
  }
});

addEventListenerIfExist(urlBlockToggle, 'change', function () {
  if (this.checked) {
    console.log('Block URL toggle checked. Injecting service worker.');
    // Injecting the service worker script with all rules enabled
    injectServiceWorker(true, true, true);
    toggleOnText.style.display = 'block';
    toggleOnText.innerHTML = '*All rules enabled';
  } else {
    console.log('Block URL toggle unchecked. Removing service worker.');
    // Removing the service worker script
    deinjectServiceWorker();
    window.location.reload();
  }
});
