// Pomodoro Timer JavaScript

class PomodoroTimer {
    constructor() {
        this.timers = {
            work: {
                defaultMinutes: 25,
                defaultSeconds: 0,
                currentMinutes: 25,
                currentSeconds: 0,
                totalTime: 25 * 60,
                remainingTime: 25 * 60
            },
            break: {
                defaultMinutes: 5,
                defaultSeconds: 0,
                currentMinutes: 5,
                currentSeconds: 0,
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
        this.isRunning = false;
        this.currentPhase = 'work'; // 'work' or 'break'
        this.intervalId = null;
        
        this.init();
    }
    
    init() {
        this.loadStats();
        this.loadTheme();
        this.setupEventListeners();
        this.updateDisplays();
        this.updateStats();
        this.updateTimerSections();
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
    
    togglePomodoro() {
        const button = document.getElementById('mainStartStop');
        const currentTimer = this.timers[this.currentPhase];
        
        if (this.isRunning) {
            // Stop timer
            this.stopPomodoro();
            button.innerHTML = '<i class="fas fa-play"></i> Start';
            button.classList.remove('running');
            this.updateTimerSections();
        } else {
            // Start timer
            this.startPomodoro();
            button.innerHTML = '<i class="fas fa-pause"></i> Pause';
            button.classList.add('running');
            this.updateTimerSections();
        }
    }
    
    startPomodoro() {
        this.isRunning = true;
        const currentTimer = this.timers[this.currentPhase];
        
        this.intervalId = setInterval(() => {
            if (currentTimer.remainingTime > 0) {
                currentTimer.remainingTime--;
                currentTimer.currentMinutes = Math.floor(currentTimer.remainingTime / 60);
                currentTimer.currentSeconds = currentTimer.remainingTime % 60;
                this.updateDisplay(this.currentPhase);
            } else {
                this.completeCurrentPhase();
            }
        }, 1000);
    }
    
    stopPomodoro() {
        this.isRunning = false;
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    resetPomodoro() {
        // Stop if running
        if (this.isRunning) {
            this.stopPomodoro();
            const button = document.getElementById('mainStartStop');
            button.innerHTML = '<i class="fas fa-play"></i> Start';
            button.classList.remove('running');
        }
        
        // Reset both timers to default values
        Object.keys(this.timers).forEach(type => {
            const timer = this.timers[type];
            timer.currentMinutes = timer.defaultMinutes;
            timer.currentSeconds = timer.defaultSeconds;
            timer.remainingTime = timer.totalTime;
        });
        
        // Reset to work phase
        this.currentPhase = 'work';
        
        this.updateDisplays();
        this.updateTimerSections();
    }
    
    completeCurrentPhase() {
        const currentTimer = this.timers[this.currentPhase];
        const display = document.getElementById(`${this.currentPhase}Timer`);
        
        // Stop the timer
        this.stopPomodoro();
        
        // Play completion animation
        display.classList.add('completed');
        setTimeout(() => {
            display.classList.remove('completed');
        }, 600);
        
        // Update stats
        this.stats[`${this.currentPhase}Sessions`]++;
        this.saveStats();
        this.updateStats();
        
        // Play completion sound
        this.playCompletionSound(this.currentPhase);
        
        // Switch to next phase
        this.switchPhase();
        
        // Auto-start next phase
        setTimeout(() => {
            this.startPomodoro();
            const button = document.getElementById('mainStartStop');
            button.innerHTML = '<i class="fas fa-pause"></i> Pause';
            button.classList.add('running');
            this.updateTimerSections();
        }, 1000);
    }
    
    switchPhase() {
        // Switch between work and break
        this.currentPhase = this.currentPhase === 'work' ? 'break' : 'work';
        
        // Reset current phase timer
        const currentTimer = this.timers[this.currentPhase];
        currentTimer.currentMinutes = currentTimer.defaultMinutes;
        currentTimer.currentSeconds = currentTimer.defaultSeconds;
        currentTimer.remainingTime = currentTimer.totalTime;
        
        this.updateDisplay(this.currentPhase);
        this.updateTimerSections();
    }
    
    nextSession() {
        // Stop current timer if running
        if (this.isRunning) {
            this.stopPomodoro();
        }
        
        // Update stats for current session (as if it was completed)
        this.stats[`${this.currentPhase}Sessions`]++;
        this.saveStats();
        this.updateStats();
        
        // Switch to next phase
        this.switchPhase();
        
        // Show brief visual feedback for transition
        const display = document.getElementById(`${this.currentPhase}Timer`);
        display.classList.add('completed');
        setTimeout(() => {
            display.classList.remove('completed');
        }, 300);
        
        // Auto-start the next session after brief delay
        setTimeout(() => {
            this.startPomodoro();
            const button = document.getElementById('mainStartStop');
            button.innerHTML = '<i class="fas fa-pause"></i> Pause';
            button.classList.add('running');
            this.updateTimerSections();
        }, 500);
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
    
    updateTimerSections() {
        const workSection = document.getElementById('workSection');
        const breakSection = document.getElementById('breakSection');
        
        // Reset classes
        workSection.classList.remove('active', 'inactive');
        breakSection.classList.remove('active', 'inactive');
        
        if (this.currentPhase === 'work') {
            workSection.classList.add('active');
            breakSection.classList.add('inactive');
            if (this.isRunning) {
                document.getElementById('workTimer').classList.add('active');
                document.getElementById('breakTimer').classList.remove('active');
            }
        } else {
            breakSection.classList.add('active');
            workSection.classList.add('inactive');
            if (this.isRunning) {
                document.getElementById('breakTimer').classList.add('active');
                document.getElementById('workTimer').classList.remove('active');
            }
        }
        
        if (!this.isRunning) {
            document.getElementById('workTimer').classList.remove('active');
            document.getElementById('breakTimer').classList.remove('active');
        }
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
        
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 1;
        
        // Validate input - allow 0 minutes but ensure at least 1 second total
        const totalSeconds = minutes * 60 + seconds;
        if (minutes < 0 || minutes > 60 || seconds < 0 || seconds > 59 || totalSeconds < 1) {
            alert('Please enter valid time values (0-60 minutes, 0-59 seconds, minimum 1 second total)');
            return;
        }
        
        // Update timer settings
        timer.defaultMinutes = minutes;
        timer.defaultSeconds = seconds;
        timer.totalTime = minutes * 60 + seconds;
        
        // Reset current timer if not running
        if (!this.isRunning) {
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
    
    playCompletionSound(phase) {
        // Play different sound files for work and break completion
        try {
            const audio = new Audio();
            
            // Set the sound file path based on the completed phase
            if (phase === 'work') {
                // Work session completed, about to start break
                audio.src = './sounds/breakBegin.mp3'; // You can also use .wav, .ogg, etc.
            } else {
                // Break session completed, about to start work
                audio.src = './sounds/workBegin.mp3';
            }
            
            // Set volume (0.0 to 1.0)
            audio.volume = 0.7;
            
            // Play the sound
            audio.play().catch(error => {
                console.log('Could not play sound file:', error);
                console.log('Make sure the sound files exist in the ./sounds/ directory');
            });
            
        } catch (error) {
            console.log('Audio playback not supported or sound file not found:', error);
        }
    }
}

// Global functions for HTML onclick handlers
let pomodoroTimer;

function togglePomodoro() {
    pomodoroTimer.togglePomodoro();
}

function resetPomodoro() {
    pomodoroTimer.resetPomodoro();
}

function nextSession() {
    pomodoroTimer.nextSession();
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
    if (pomodoroTimer && pomodoroTimer.isRunning) {
        const message = 'You have a running timer. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = message;
        return message;
    }
});