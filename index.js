let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

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
}

// Record lap
function recordLap() {
    if (running) {
        const lapTime = timeToString(difference);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        laps.appendChild(lapItem);
    }
}

// Event listeners
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
