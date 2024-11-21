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
    if (message.type === 'TRACK_TIME') {
        const { site, time } = message;
        if (!totalTimeBySite[site]) {
            totalTimeBySite[site] = 0;
        }
        totalTimeBySite[site] += time;
        chrome.storage.local.set({ totalTimeBySite });
        sendResponse({ totalTimeBySite });
    }
    return true;
});
