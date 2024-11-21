// Update the time tracked display
function updateTimeDisplay() {
    updateDisplay = setInterval(() => {
        // Retrieve the stored time spent on each site when the popup opens
        chrome.storage.local.get('totalTimeBySite', (data) => {
            if (data.totalTimeBySite) {
                const timeTrackedElement = document.getElementById('time-tracked');
                let displayText = 'Time Tracked:\n';
                for (const site in data.totalTimeBySite) {
                    const time = data.totalTimeBySite[site];
                    const minutes = Math.floor(time / 60);
                    const seconds = time % 60;
                    displayText += `${site}: ${minutes} mins ${seconds} secs\n`;
                }
                timeTrackedElement.textContent = displayText;
            }
        });
        
    }, 1000);
}

updateTimeDisplay()