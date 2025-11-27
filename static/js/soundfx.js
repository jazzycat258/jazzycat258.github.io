// Sound effects for the website
class SoundEffects {
    constructor() {
        this.sounds = {
            click: this.createSound('https://assets.mixkit.co/active_storage/sfx/2216/2216-preview.mp3')
        };
        
        // Preload sounds
        Object.values(this.sounds).forEach(sound => {
            sound.volume = 0.3; // 30% volume
        });
    }

    createSound(url) {
        const audio = new Audio(url);
        audio.preload = 'auto';
        return audio;
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            const sound = this.sounds[soundName].cloneNode();
            sound.volume = 0.3;
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
        // Skip if it's an anchor link or opens in a new tab
        if (link.href.includes('#') || link.target === '_blank') {
            return;
        }
        
        link.addEventListener('click', (e) => {
            // For anchor links, just play sound and let default behavior happen
            if (link.href.includes('#')) {
                soundEffects.play('click');
                return;
            }
            
            // For regular links, prevent default, play sound, then navigate
            e.preventDefault();
            soundEffects.play('click');
            
            // Small delay to let the sound play before navigation
            setTimeout(() => {
                window.location.href = link.href;
            }, 200);
        });
    });
});
