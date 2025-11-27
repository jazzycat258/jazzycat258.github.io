// Play sound when typing in the ask box
document.addEventListener('DOMContentLoaded', () => {
    const answerInput = document.getElementById('answer-input');
    const sound = new Audio('/static/sounds/752274__ienba__magic-glow.wav');
    
    if (answerInput) {
        answerInput.addEventListener('input', () => {
            sound.currentTime = 0; // Reset sound to start
            sound.play().catch(e => console.log('Sound playback prevented:', e));
        });
    }
});
