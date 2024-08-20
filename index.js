let startTime, updatedTime, difference, tInterval;
let running = false;
let lapTimes = [];
let bestLap, worstLap;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

// Sound notification elements
const lapSound = new Audio('lap-sound.mp3'); // add a sound file
const resetSound = new Audio('reset-sound.mp3'); // add a sound file

// Function to format time
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    let formattedMS = ms.toString().padStart(3, '0');

    return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

// Start/Stop function
function startStop() {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = "Stop";
        startStopBtn.classList.toggle('start-btn');
        startStopBtn.classList.toggle('reset-btn');
    } else {
        running = false;
        clearInterval(tInterval);
        startStopBtn.textContent = "Start";
        startStopBtn.classList.toggle('start-btn');
        startStopBtn.classList.toggle('reset-btn');
    }
}

// Update time display
function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = timeToString(difference);
}

// Reset function
function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00.000";
    startStopBtn.textContent = "Start";
    startStopBtn.classList.add('start-btn');
    startStopBtn.classList.remove('reset-btn');
    laps.innerHTML = ''; // Clear laps
    lapTimes = [];
    bestLap = null;
    worstLap = null;
    resetSound.play(); // Play reset sound
}

// Record lap
function recordLap() {
    if (running) {
        const lapTime = difference;
        lapTimes.push(lapTime);
        updateBestWorstLap(lapTime);

        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.length}: ${timeToString(lapTime)}`;
        lapItem.classList.add('lap-time');
        laps.appendChild(lapItem);

        // Add best/worst lap highlighting
        highlightBestWorstLaps();

        lapSound.play(); // Play lap sound
    }
}

// Update best and worst lap times
function updateBestWorstLap(currentLapTime) {
    if (!bestLap || currentLapTime < bestLap) {
        bestLap = currentLapTime;
    }

    if (!worstLap || currentLapTime > worstLap) {
        worstLap = currentLapTime;
    }
}

// Highlight best and worst lap times
function highlightBestWorstLaps() {
    const lapItems = document.querySelectorAll('.lap-time');
    lapItems.forEach((lapItem, index) => {
        lapItem.classList.remove('best-lap', 'worst-lap');
        if (lapTimes[index] === bestLap) {
            lapItem.classList.add('best-lap');
        }
        if (lapTimes[index] === worstLap) {
            lapItem.classList.add('worst-lap');
        }
    });
}

// Event listeners
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
