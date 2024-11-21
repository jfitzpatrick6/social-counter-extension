// Object to track time spent on each site (stored in local storage)
let totalTimeBySite = {};

// Load the stored data when the extension starts
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get('totalTimeBySite', (data) => {
        if (data.totalTimeBySite) {
            totalTimeBySite = data.totalTimeBySite;
        }
    });
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'openPopup') {
        // Open the popup programmatically (simulates user click on extension icon)
        chrome.action.openPopup();
    }
    if (message.type === 'TRACK_TIME') {
        const { site, time } = message;
        // If this is the first time tracking time for this site, initialize its time
        if (!totalTimeBySite[site]) {
            totalTimeBySite[site] = 0;
        }
        
        // Add the time to the total time for this site
        totalTimeBySite[site] += time;

        console.log(`Total time on ${site}: ${totalTimeBySite[site]} seconds`);

        // Save the updated time to local storage
        chrome.storage.local.set({ totalTimeBySite });

        // Optionally, send the updated time to the content script or popup
        sendResponse({ totalTimeBySite });
    }
    // Ensure the response is sent asynchronously
    return true;
});
