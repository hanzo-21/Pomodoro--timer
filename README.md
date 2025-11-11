# 🍅 Pomodoro Timer

[link](https://pomodoro-timer-gamma-five.vercel.app/)

A modern, responsive web-based Pomodoro Timer application built with HTML, CSS, and JavaScript. This app helps you stay focused and productive using the Pomodoro Technique with connected work and break timers.

## ✨ Features

### 🕐 **Connected Timer System**
- **Dual Timers**: Work timer (default: 25 minutes) and Break timer (default: 5 minutes)
- **Automatic Switching**: When work ends, break automatically starts (and vice versa)
- **Single Control Panel**: One set of Start/Stop and Reset buttons controls both timers
- **Continuous Cycle**: Work → Break → Work → Break...

### ⚙️ **Customizable Settings**
- **Flexible Time Settings**: Set timers from 1 second to 60 minutes
- **Zero Minutes Allowed**: Minimum time is 1 second total
- **Edit Controls**: Easy-to-use edit buttons for each timer
- **Persistent Settings**: Your custom times are saved between sessions

### 🎨 **Modern Design**
- **Light & Dark Mode**: Toggle between themes with a single click
- **Custom Color Palette**: 
  - Light Blue: `#8CE4FF`
  - Light Yellow: `#FEEE91`
  - Orange: `#FFA239`
  - Red: `#FF5656`
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Visual feedback and transitions

### 🔊 **Audio Notifications**
- **Custom Sound Files**: Play your own audio files when timers complete
- **Different Sounds**: Separate sounds for work and break completion
- **Multiple Formats**: Supports MP3, WAV, OGG, M4A

### 📊 **Session Tracking**
- **Statistics**: Track completed work and break sessions
- **Local Storage**: Stats persist between browser sessions
- **Visual Feedback**: Active timer highlighting and completion animations

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. **Download/Clone** the project files
2. **Add Sound Files** (optional):
   - Place `breakBegin.mp3` and `workBegin.mp3` in the `sounds/` directory
   - Or use any audio format and update the file paths in `script.js`
3. **Open** `index.html` in your web browser
4. **Start** using your Pomodoro Timer!

## 🎵 Sound Setup

### Required Sound Files:
- `sounds/breakBegin.mp3` - Plays when work session completes
- `sounds/workBegin.mp3` - Plays when break session completes

### Audio Format Support:
- MP3 (.mp3) - Recommended
- WAV (.wav)
- OGG (.ogg)
- M4A (.m4a)

### File Guidelines:
- Keep files under 1MB for optimal performance
- Use pleasant, non-jarring sounds
- Recommended duration: 1-3 seconds

## 🎯 How to Use

1. **Set Your Times**: Click the edit buttons (📝) to customize work and break durations
2. **Start Timer**: Click the "Start" button to begin your work session
3. **Automatic Flow**: The app automatically switches between work and break phases
4. **Track Progress**: Monitor your completed sessions in the statistics section
5. **Theme Toggle**: Use the moon/sun icon to switch between light and dark modes
6. **Reset Anytime**: Use the reset button to stop and return to the beginning

## 🛠️ Customization

### Changing Default Times:
- Work Timer: Default 25 minutes (customizable via edit button)
- Break Timer: Default 5 minutes (customizable via edit button)
- Minimum time: 1 second
- Maximum time: 60 minutes

### Modifying Sound Files:
Edit the `playCompletionSound()` method in `script.js`:
```javascript
// Change file paths
audio.src = './sounds/your-custom-sound.mp3';

// Adjust volume (0.0 to 1.0)
audio.volume = 0.7;
```

### Color Scheme:
Update CSS variables in `style.css`:
```css
:root {
    --accent-blue: #8CE4FF;
    --accent-yellow: #FEEE91;
    --accent-orange: #FFA239;
    --accent-red: #FF5656;
}
```

## 📁 Project Structure

```
Pomodoro Timer/
├── index.html          # Main HTML file
├── style.css           # Stylesheet with light/dark themes
├── script.js           # JavaScript functionality
├── sounds/             # Audio files directory
│   ├── breakBegin.mp3  # Break start sound
│   └── workBegin.mp3   # Work start sound
└── README.md           # This file
```

## 🌟 Key Features Explained

### Connected Timers
Unlike traditional separate timers, this app connects work and break timers in a continuous cycle, just like the real Pomodoro Technique.

### Visual Feedback
- **Active Timer**: Currently running timer is highlighted
- **Inactive Timer**: Non-active timer is dimmed
- **Completion Animation**: Special animation when phases complete
- **Theme Adaptation**: All elements adapt to light/dark mode

### Data Persistence
- Timer settings are saved to browser localStorage
- Session statistics persist between visits
- Theme preference is remembered

## 🎨 Design Philosophy

This Pomodoro Timer combines functionality with aesthetics:
- **Clean, Modern Interface**: Minimalist design focused on usability
- **Responsive Layout**: Adapts to any screen size
- **Accessibility**: High contrast, clear typography, keyboard navigation
- **Performance**: Lightweight, fast-loading, smooth animations

## 🤝 Contributing

Feel free to fork this project and make improvements! Some ideas:
- Additional sound customization options
- More theme variations
- Export/import of settings
- Advanced statistics and charts
- Integration with task management

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Aayush Rana Magar**

---

### 🍅 About the Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo:
1. Work for 25 minutes (one "pomodoro")
2. Take a 5-minute break
3. Repeat the cycle
4. After 4 pomodoros, take a longer break (15-30 minutes)

This app automates the timing aspect, letting you focus on your work!