let currentMode = 'countdown';
let durationSeconds = 60;
let remainingSeconds = 60;
let elapsedSeconds = 0;
let timerInterval = null;
let isRunning = false;

const timeDisplay = document.getElementById('timeDisplay');
const timerStatus = document.getElementById('timerStatus');
const startBtn = document.getElementById('startBtn');
const presetsRow = document.getElementById('countdownPresets');

function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
    if (currentMode === 'countdown') {
        timeDisplay.textContent = formatTime(remainingSeconds);
    } else {
        timeDisplay.textContent = formatTime(elapsedSeconds);
    }
}

function toggleTimer() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.textContent = 'Pause Timer';
    startBtn.style.background = '#f59e0b';
    timerStatus.textContent = 'Running...';
    timerStatus.style.color = '#10b981';

    timerInterval = setInterval(() => {
        if (currentMode === 'countdown') {
            if (remainingSeconds > 0) {
                remainingSeconds--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startBtn.textContent = 'Start Timer';
                startBtn.style.background = '#10b981';
                timerStatus.textContent = 'Time Expired!';
                timerStatus.style.color = '#ef4444';
                playBeepAlert();
            }
        } else {
            elapsedSeconds++;
            updateDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = 'Resume Timer';
    startBtn.style.background = '#10b981';
    timerStatus.textContent = 'Paused';
    timerStatus.style.color = '#f59e0b';
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = 'Start Timer';
    startBtn.style.background = '#10b981';
    timerStatus.textContent = 'Ready';
    timerStatus.style.color = '#94a3b8';

    if (currentMode === 'countdown') {
        remainingSeconds = durationSeconds;
    } else {
        elapsedSeconds = 0;
    }
    updateDisplay();
}

function setCountdownDuration(seconds) {
    if (isRunning) pauseTimer();
    durationSeconds = seconds;
    remainingSeconds = seconds;
    updateDisplay();
    document.querySelectorAll('.preset-pill').forEach(pill => pill.classList.remove('active'));
    event.target.classList.add('active');
}

function switchMode(mode) {
    if (currentMode === mode) return;
    resetTimer();
    currentMode = mode;

    document.getElementById('tabCountdown').classList.toggle('active', mode === 'countdown');
    document.getElementById('tabStopwatch').classList.toggle('active', mode === 'stopwatch');

    if (mode === 'countdown') {
        presetsRow.style.display = 'flex';
        remainingSeconds = durationSeconds;
    } else {
        presetsRow.style.display = 'none';
        elapsedSeconds = 0;
    }
    updateDisplay();
}

function playBeepAlert() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
        console.log('Audio alert executed.');
    }
}

// Initialize
updateDisplay();
