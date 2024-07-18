document.addEventListener('DOMContentLoaded', function() {
    function updateTime() {
        const options = { timeZone: 'America/Mexico_City', hour12: false };
        const now = new Date().toLocaleTimeString('en-US', options);
        const timeParts = now.split(':');
        const hours = timeParts[0];
        const minutes = timeParts[1];
        const suffix = hours >= 12 ? '_PM' : '_AM';
        document.getElementById('queretaroTime').innerText = `${hours}:${minutes}${suffix}`;
    }

    setInterval(updateTime, 60000); // update by min
    updateTime();

    function randomChar() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&/()?¡¿{}';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    function animateCharacters(element) {
        const originalText = element.getAttribute('data-original-text');
        const chars = originalText.split('');
        let animationId;

        function runAnimation(index) {
            if (index < chars.length) {
                const random = randomChar();
                const updatedText = originalText.slice(0, index) + random + originalText.slice(index + 1);
                element.innerText = updatedText;
                animationId = setTimeout(() => {
                    runAnimation(index + 1);
                }, 40); // Animation duration
            } else {
                element.innerText = originalText; // Reset to original text after animation completes
            }
        }

        runAnimation(0);

        let isHovered = true; // Flag to check if element is hovered

        element.addEventListener('mouseenter', function() {
            isHovered = true;
            this.classList.add('hovered');
            animateCharacters(this);
        });

        element.addEventListener('mouseleave', function() {
            isHovered = false;
            clearTimeout(animationId);
            element.style.transition = 'color 0.5s ease-out'; 
            element.style.color = 'transparent'; 

            
            setTimeout(() => {
                if (!isHovered) {
                    element.style.color = '#fcfcfc'; 
                    animateCharacters(element); // restart animation on gawddd
                }
            }, 500); 
        });
    }

    const navOptions = document.querySelectorAll('.nav-option');
    navOptions.forEach(option => {
        option.setAttribute('data-original-text', option.innerText);

        option.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
            this.style.color = '#ff4f30'; 
            animateCharacters(this);
        });

        option.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
            this.style.color = '#fcfcfc'; 
        });
    });
});
