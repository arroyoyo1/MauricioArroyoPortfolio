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
                }, 40); // duration
            } else {
                element.innerText = originalText; // turn back to og state
            }
        }

        runAnimation(0);

        let isHovered = true; // check if the element is hovered

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
            this.style.color = '#ff8400'; 
            animateCharacters(this);
        });

        option.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
            this.style.color = '#fcfcfc'; 
        });
    });

    const navContainer = document.querySelector('.nav-container');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navContainer.style.background = 'rgba(0, 0, 0, 0.1)'; // translucent background
            navContainer.style.backdropFilter = 'blur(5px)'; // blur effect
            navContainer.style.borderRadius = '10px'; // rounded corners
            navContainer.style.boxShadow = '0px 0px 16px 0px rgba(0, 0, 0, 0.4)'; // shadow for depth
        } else {
            navContainer.style.background = 'rgba(0, 0, 0, 0)'; // no style for the background
            navContainer.style.backdropFilter = 'none'; // remove blur effect
            navContainer.style.boxShadow = 'none'; // remove shadow
        }
    });

    const words = ["design", "technology", "programming", "experiences", "development"];
    let currentIndex = 0;
    const changingWordElement = document.getElementById("changing-word");

    function typeWriter(word, index) {
        if (index < word.length) {
            changingWordElement.innerText += word.charAt(index);
            setTimeout(() => {
                typeWriter(word, index + 1);
            }, 100); // typing speed here
        } else {
            setTimeout(deleteWriter, 2000); // wait before starting to delete
        }
    }

    function deleteWriter() {
        const currentText = changingWordElement.innerText;
        if (currentText.length > 0) {
            changingWordElement.innerText = currentText.slice(0, -1);
            setTimeout(deleteWriter, 100); // deleting speed here
        } else {
            currentIndex = (currentIndex + 1) % words.length;
            setTimeout(() => {
                typeWriter(words[currentIndex], 0);
            }, 500); // wait before starting to type new word
        }
    }

    function changeWord() {
        changingWordElement.innerText = ""; // clear current text
        typeWriter(words[currentIndex], 0);
    }

    changeWord(); // initial call
});


