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

// Create the floating UI element
function createFloatingCounter() {
    const counterDiv = document.createElement('div');
    counterDiv.id = 'time-tracker';
    counterDiv.style.position = 'fixed';
    counterDiv.style.bottom = '10px';
    counterDiv.style.right = '10px';
    counterDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    counterDiv.style.color = 'white';
    counterDiv.style.padding = '10px';
    counterDiv.style.borderRadius = '5px';
    counterDiv.style.fontSize = '16px';
    counterDiv.style.zIndex = '9999';
    counterDiv.innerHTML = `Time Spent: 0 mins`;
    document.body.appendChild(counterDiv);
}

// Update the counter in the UI
function updateFloatingCounter(time) {
    const counterDiv = document.getElementById('time-tracker');
    if (counterDiv) {
        counterDiv.innerHTML = `Time Spent: ${Math.floor(time / 60)} mins ${time % 60} secs`;
    }
}

// Start tracking time
function startTracking() {
    if (isSocialMediaSite()) {
        console.log(`Started tracking on: ${window.location.hostname}`);
        createFloatingCounter();
        loadTimeSpent();
        intervalId = setInterval(() => {
            timeSpent += 1;
            saveTimeSpent();
            updateFloatingCounter(timeSpent);
        }, 1000);
    }
}

function stopTracking() {
    clearInterval(intervalId);
}

function loadTimeSpent() {
    chrome.storage.local.get('trackingWastedTime', (data) => {
        if (data['trackingWastedTime']) {
            timeSpent = data['trackingWastedTime'];
        }
    });
}

// Save time spent to chrome storage
function saveTimeSpent() {
    chrome.storage.local.set({ ['trackingWastedTime']: timeSpent });
}

// Start tracking when the page loads
startTracking();

// Stop tracking when the page is unloaded
window.addEventListener('beforeunload', stopTracking);
