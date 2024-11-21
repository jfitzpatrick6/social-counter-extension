let timeSpent = 0;
let intervalId;

const socialMediaSites = [
    'facebook.com',
    'twitter.com',
    'instagram.com',
    'reddit.com'
];

// Check if the current site is a social media site
function isSocialMediaSite() {
    return socialMediaSites.some((site) => window.location.hostname.includes(site));
}

// Start tracking time
function startTracking() {
    if (isSocialMediaSite()) {
        console.log(`Started tracking on: ${window.location.hostname}`);
        intervalId = setInterval(() => {
            timeSpent += 1;

            // Save the time spent for the current site in chrome storage
            chrome.storage.local.get('totalTimeBySite', (data) => {
                const totalTimeBySite = data.totalTimeBySite || {};

                // Update time for the current site
                if (!totalTimeBySite[window.location.hostname]) {
                    totalTimeBySite[window.location.hostname] = 0;
                }
                totalTimeBySite[window.location.hostname] += 1;

                // Save the updated time back to chrome storage
                chrome.storage.local.set({ totalTimeBySite });
            });
        }, 1000);
    }
}

function stopTracking() {
    clearInterval(intervalId);
    console.log(`Stopped tracking on: ${window.location.hostname}. Total time spent: ${timeSpent}`);

    // When the page is unloaded, save the final time
    chrome.storage.local.get('totalTimeBySite', (data) => {
        const totalTimeBySite = data.totalTimeBySite || {};
        
        // Update the time for the current site
        if (!totalTimeBySite[window.location.hostname]) {
            totalTimeBySite[window.location.hostname] = 0;
        }
        totalTimeBySite[window.location.hostname] += timeSpent;

        // Save the updated time to chrome storage
        chrome.storage.local.set({ totalTimeBySite });
    });
}

// Start tracking when the page loads
startTracking();

// Stop tracking when the page is unloaded
window.addEventListener('beforeunload', stopTracking);
