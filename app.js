// Play sound when typing in the ask box and show random messages
document.addEventListener('DOMContentLoaded', () => {
    const answerInput = document.getElementById('answer-input');
    
    if (answerInput) {
        // Preload the sound
        const sound = new Audio('/static/sounds/752274__ienba__magic-glow.wav');
        sound.volume = 0.3; // Reduce volume to 30%
        
        // List of possible messages
        const messages = [
            "A worthwhile relationship isn't made up of two halves, but two wholes.",
            "You are ready to embark on a quest. It will be a lonely lonely adventure.",
            "You are the most elaborate and sweet dessert.",
            "The message sent is not necessarily the message received.",
            "Because in 799 Charlemagne helped pope leo 3 crush a rebellion in Rome.",
            "Kanye West.",
            "Stop asking questions that only your neighbor can answer",
            "being high.",
            "It's never ok for someone to put you down.",
            "Delayed gratification now will reap you greater rewards later.",
            "You're averaging fewer steps a day this year than last year.",
            "Book with American.",
            "normalize going to medieval times with your friends on a random tuesday night for dinner,",
            "Frequency of Evening Activities,",
            "Ya gooch",
            "DONT LEAVE HER ON READ",
            "You must learn more about the problem you are trying to solve and also what testing has already been done.",
            "Some ppl would find it disrespectful bc fajitas are usually the first to be ready and arrive at the table, and its one of those foods that commands attention.",
            "Giving it all for the one you love is the best way to make sure you get it all back.",




        ];
        
        // Function to show a random message in the input
        function showRandomMessage() {
            const randomIndex = Math.floor(Math.random() * messages.length);
            const message = messages[randomIndex];
            
            // Clear any existing timeout
            if (window.messageTimeout) {
                clearTimeout(window.messageTimeout);
            }
            
            // Reset input first
            answerInput.value = '';
            answerInput.style.height = 'auto';
            
            // Force reflow to ensure height is reset
            void answerInput.offsetHeight;
            
            // Set the message and expand the input
            answerInput.value = message;
            answerInput.classList.add('expanded');
            
            // Calculate the scroll height and set it as the height
            const scrollHeight = answerInput.scrollHeight;
            answerInput.style.height = scrollHeight + 'px';
            
            // Clear the message and reset after 10 seconds
            window.messageTimeout = setTimeout(() => {
                answerInput.value = '';
                answerInput.classList.remove('expanded');
                answerInput.style.height = '';
            }, 10000);
        }
        
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
        
        // Handle Enter key press
        answerInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                showRandomMessage();
                // Don't clear the input here, let showRandomMessage handle it
                sound.currentTime = 0; // Reset sound to start
                sound.play().catch(e => console.log('Sound playback prevented:', e));
            }
        });
    }
});
