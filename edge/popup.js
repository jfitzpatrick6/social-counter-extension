// Function to update the time tracked display
function updateTimeDisplay(time) {
    const timeTrackedElement = document.getElementById('time-tracked');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeTrackedElement.textContent = `Time Tracked: ${minutes} mins ${seconds} secs`;
}

// Retrieve the stored time spent when the popup opens
chrome.storage.local.get('timeSpent', (data) => {
    if (data.timeSpent) {
        updateTimeDisplay(data.timeSpent);
    }
});
