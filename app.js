// Play sound when typing in the ask box
document.addEventListener('DOMContentLoaded', () => {
    const answerInput = document.getElementById('answer-input');
    
    if (answerInput) {
        // Preload the sound
        const sound = new Audio('/static/sounds/752274__ienba__magic-glow.wav');
        sound.volume = 0.3; // Reduce volume to 30%
        
        let isTyping = false;
        
        answerInput.addEventListener('focus', () => {
            isTyping = true;
        });
        
        answerInput.addEventListener('blur', () => {
            isTyping = false;
        });
        
        answerInput.addEventListener('input', (e) => {
            if (isTyping && e.inputType === 'insertText') {
                sound.currentTime = 0; // Reset sound to start
                sound.play().catch(e => console.log('Sound playback prevented:', e));
            }
        });
    }
});
