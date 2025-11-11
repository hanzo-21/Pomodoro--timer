# Sound Files for Pomodoro Timer

This directory should contain the sound files that will be played when timers complete.

## Required Sound Files:

1. **work-complete.mp3** - Plays when work session completes (before break starts)
2. **break-complete.mp3** - Plays when break session completes (before work starts)

## Supported Audio Formats:
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)
- M4A (.m4a)

## File Requirements:
- Keep file sizes reasonable (under 1MB each for web performance)
- Use clear, pleasant sounds that aren't too jarring
- Recommended length: 1-3 seconds

## How to Add Your Sound Files:
1. Place your sound files in this `sounds/` directory
2. Make sure they are named exactly:
   - `work-complete.mp3` (or .wav, .ogg, etc.)
   - `break-complete.mp3` (or .wav, .ogg, etc.)
3. If you use a different audio format, update the file extensions in `script.js`

## Customization:
You can modify the sound file paths in the `playCompletionSound()` method in `script.js` if you want to:
- Use different file names
- Use different audio formats
- Adjust the volume (currently set to 0.7)
- Use the same sound for both events

## Example Sound Ideas:
- **Work Complete**: Gentle chime, bell, or "ding" sound
- **Break Complete**: Slightly different tone, perhaps a bit more energetic

## Troubleshooting:
- Make sure file paths are correct
- Check browser console for error messages
- Ensure sound files are not corrupted
- Some browsers may require user interaction before playing audio