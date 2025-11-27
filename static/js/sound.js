// Sound effects for the website
class SoundEffects {
    constructor() {
        this.sounds = {
            click: new Audio('/static/sounds/click.mp3')
        };
        
        // Preload sounds
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.5; // 50% volume
            sound.preload = 'auto';
        });
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            const sound = this.sounds[soundName].cloneNode();
            sound.volume = 0.5;
            sound.play().catch(e => console.log('Sound playback prevented:', e));
        }
    }
}

// Initialize sound effects
const soundEffects = new SoundEffects();

// Add click sound to all links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        // Don't add to anchor links or external links that open in new tabs
        if (link.href.includes('#') || link.target === '_blank') {
            return;
        }
        
        link.addEventListener('click', (e) => {
            // Don't prevent default for anchor links or external links
            if (link.href.includes('#')) {
                soundEffects.play('click');
                return;
            }
            
            e.preventDefault();
            soundEffects.play('click');
            
            // Small delay to let the sound play before navigation
            setTimeout(() => {
                window.location.href = link.href;
            }, 200);
        });
    });
});
