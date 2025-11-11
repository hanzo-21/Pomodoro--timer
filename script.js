// Pomodoro Timer JavaScript

class PomodoroTimer {
    constructor() {
        this.timers = {
            work: {
                defaultMinutes: 25,
                defaultSeconds: 0,
                currentMinutes: 25,
                currentSeconds: 0,
                isRunning: false,
                intervalId: null,
                totalTime: 25 * 60,
                remainingTime: 25 * 60
            },
            break: {
                defaultMinutes: 5,
                defaultSeconds: 0,
                currentMinutes: 5,
                currentSeconds: 0,
                isRunning: false,
                intervalId: null,
                totalTime: 5 * 60,
                remainingTime: 5 * 60
            }
        };
        
        this.stats = {
            workSessions: 0,
            breakSessions: 0
        };
        
        this.currentEditingTimer = null;
        this.theme = 'light';
        
        this.init();
    }
    
    init() {
        this.loadStats();
        this.loadTheme();
        this.setupEventListeners();
        this.updateDisplays();
        this.updateStats();
    }
    
    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Modal events
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeEditModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeEditModal();
            }
        });
    }
    
    toggleTimer(type) {
        const timer = this.timers[type];
        const button = document.getElementById(`${type}StartStop`);
        const display = document.getElementById(`${type}Timer`);
        
        if (timer.isRunning) {
            // Stop timer
            this.stopTimer(type);
            button.innerHTML = '<i class="fas fa-play"></i> Start';
            button.classList.remove('running');
            display.classList.remove('active');
        } else {
            // Start timer
            this.startTimer(type);
            button.innerHTML = '<i class="fas fa-pause"></i> Pause';
            button.classList.add('running');
            display.classList.add('active');
        }
    }
    
    startTimer(type) {
        const timer = this.timers[type];
        timer.isRunning = true;
        
        timer.intervalId = setInterval(() => {
            if (timer.remainingTime > 0) {
                timer.remainingTime--;
                timer.currentMinutes = Math.floor(timer.remainingTime / 60);
                timer.currentSeconds = timer.remainingTime % 60;
                this.updateDisplay(type);
            } else {
                this.completeTimer(type);
            }
        }, 1000);
    }
    
    stopTimer(type) {
        const timer = this.timers[type];
        timer.isRunning = false;
        
        if (timer.intervalId) {
            clearInterval(timer.intervalId);
            timer.intervalId = null;
        }
    }
    
    resetTimer(type) {
        const timer = this.timers[type];
        
        // Stop if running
        if (timer.isRunning) {
            this.stopTimer(type);
            const button = document.getElementById(`${type}StartStop`);
            const display = document.getElementById(`${type}Timer`);
            button.innerHTML = '<i class="fas fa-play"></i> Start';
            button.classList.remove('running');
            display.classList.remove('active');
        }
        
        // Reset to default values
        timer.currentMinutes = timer.defaultMinutes;
        timer.currentSeconds = timer.defaultSeconds;
        timer.remainingTime = timer.totalTime;
        
        this.updateDisplay(type);
    }
    
    completeTimer(type) {
        const timer = this.timers[type];
        const display = document.getElementById(`${type}Timer`);
        const button = document.getElementById(`${type}StartStop`);
        
        // Stop the timer
        this.stopTimer(type);
        
        // Update UI
        button.innerHTML = '<i class="fas fa-play"></i> Start';
        button.classList.remove('running');
        display.classList.remove('active');
        display.classList.add('completed');
        
        // Play completion animation
        setTimeout(() => {
            display.classList.remove('completed');
        }, 600);
        
        // Update stats
        this.stats[`${type}Sessions`]++;
        this.saveStats();
        this.updateStats();
        
        // Reset timer
        timer.currentMinutes = timer.defaultMinutes;
        timer.currentSeconds = timer.defaultSeconds;
        timer.remainingTime = timer.totalTime;
        this.updateDisplay(type);
        
        // Show notification
        this.showNotification(type);
        
        // Play sound (if browser supports it)
        this.playCompletionSound();
    }
    
    updateDisplay(type) {
        const timer = this.timers[type];
        const display = document.querySelector(`#${type}Timer .time-text`);
        
        const minutes = timer.currentMinutes.toString().padStart(2, '0');
        const seconds = timer.currentSeconds.toString().padStart(2, '0');
        
        display.textContent = `${minutes}:${seconds}`;
    }
    
    updateDisplays() {
        this.updateDisplay('work');
        this.updateDisplay('break');
    }
    
    openEditModal(type) {
        this.currentEditingTimer = type;
        const timer = this.timers[type];
        const modal = document.getElementById('editModal');
        const title = document.getElementById('modalTitle');
        const minutesInput = document.getElementById('minutesInput');
        const secondsInput = document.getElementById('secondsInput');
        
        title.textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)} Timer`;
        minutesInput.value = timer.defaultMinutes;
        secondsInput.value = timer.defaultSeconds;
        
        modal.style.display = 'block';
        minutesInput.focus();
    }
    
    closeEditModal() {
        const modal = document.getElementById('editModal');
        modal.style.display = 'none';
        this.currentEditingTimer = null;
    }
    
    saveTimerSettings() {
        if (!this.currentEditingTimer) return;
        
        const type = this.currentEditingTimer;
        const timer = this.timers[type];
        const minutesInput = document.getElementById('minutesInput');
        const secondsInput = document.getElementById('secondsInput');
        
        const minutes = parseInt(minutesInput.value) || 1;
        const seconds = parseInt(secondsInput.value) || 0;
        
        // Validate input
        if (minutes < 1 || minutes > 60 || seconds < 0 || seconds > 59) {
            alert('Please enter valid time values (1-60 minutes, 0-59 seconds)');
            return;
        }
        
        // Update timer settings
        timer.defaultMinutes = minutes;
        timer.defaultSeconds = seconds;
        timer.totalTime = minutes * 60 + seconds;
        
        // Reset current timer if not running
        if (!timer.isRunning) {
            timer.currentMinutes = minutes;
            timer.currentSeconds = seconds;
            timer.remainingTime = timer.totalTime;
            this.updateDisplay(type);
        }
        
        this.closeEditModal();
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        
        this.saveTheme();
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('pomodoroTheme') || 'light';
        this.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', this.theme);
        
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    saveTheme() {
        localStorage.setItem('pomodoroTheme', this.theme);
    }
    
    updateStats() {
        document.getElementById('workSessions').textContent = this.stats.workSessions;
        document.getElementById('breakSessions').textContent = this.stats.breakSessions;
    }
    
    loadStats() {
        const savedStats = localStorage.getItem('pomodoroStats');
        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
    }
    
    saveStats() {
        localStorage.setItem('pomodoroStats', JSON.stringify(this.stats));
    }
    
    showNotification(type) {
        const message = type === 'work' ? 
            'Work session completed! Time for a break.' : 
            'Break time is over! Ready to work?';
        
        // Check if browser supports notifications
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('Pomodoro Timer', {
                    body: message,
                    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGRkEyMzkiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxNiIgeT0iMTYiPgo8cGF0aCBkPSJNMTYgNEExMiAxMiAwIDEgMSA0IDE2IDEyIDEyIDAgMCAxIDE2IDRaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE2IDhWMTZMMjIgMjIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K'
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('Pomodoro Timer', {
                            body: message
                        });
                    }
                });
            }
        }
        
        // Fallback: Browser alert
        setTimeout(() => {
            alert(message);
        }, 100);
    }
    
    playCompletionSound() {
        // Create audio context and play a simple beep
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio not supported');
        }
    }
}

// Global functions for HTML onclick handlers
let pomodoroTimer;

function toggleTimer(type) {
    pomodoroTimer.toggleTimer(type);
}

function resetTimer(type) {
    pomodoroTimer.resetTimer(type);
}

function openEditModal(type) {
    pomodoroTimer.openEditModal(type);
}

function closeEditModal() {
    pomodoroTimer.closeEditModal();
}

function saveTimerSettings() {
    pomodoroTimer.saveTimerSettings();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    pomodoroTimer = new PomodoroTimer();
    
    // Request notification permission on load
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

// Handle page visibility changes (pause timers when tab is not visible)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - could pause timers here if desired
        console.log('Page hidden');
    } else {
        // Page is visible again
        console.log('Page visible');
    }
});

// Handle beforeunload to warn about running timers
window.addEventListener('beforeunload', (e) => {
    const hasRunningTimer = Object.values(pomodoroTimer.timers).some(timer => timer.isRunning);
    
    if (hasRunningTimer) {
        const message = 'You have running timers. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = message;
        return message;
    }
});