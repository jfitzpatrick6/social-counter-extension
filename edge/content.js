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
            // Send the time spent to the popup
            chrome.runtime.sendMessage({
                action: 'updateTime',
                time: timeSpent
            });
        }, 1000);
    }
}

function stopTracking() {
    clearInterval(intervalId);
    console.log(`Stopped tracking on: ${window.location.hostname}. Total time spent: ${timeSpent}`);
}

startTracking();
window.addEventListener('beforeunload', stopTracking);