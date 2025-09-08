 document.addEventListener('DOMContentLoaded', () => {
            const countdownWrapper = document.getElementById('countdown-wrapper');
            const countdownFinishedMessage = document.getElementById('countdown-finished');
            const countdownEarlyAccessMessage = document.querySelector('.early-access-h3');
            
            // Select the actual h2 tags where the numbers will go
            const daysEl = document.querySelector('#days .countdown-number h2');
            const hoursEl = document.querySelector('#hours .countdown-number h2');
            const minutesEl = document.querySelector('#minutes .countdown-number h2');
            const secondsEl = document.querySelector('#seconds .countdown-number h2');

            // 1. Get the release date from the HTML data attribute
            const releaseDateString = countdownWrapper.dataset.releaseDate;
            if (!releaseDateString) {
                console.error('Release date not found on countdown-wrapper!');
                return;
            }
            const releaseDate = new Date(releaseDateString).getTime();

            // 2. Update the countdown every second
            const timerInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = releaseDate - now;

                // 3. If the countdown is finished
                if (distance < 0) {
                    clearInterval(timerInterval);
                    countdownWrapper.style.display = 'none'; // Hide the timer
                    countdownFinishedMessage.style.display = 'block'; // Show the finished message
                    
                    if (countdownEarlyAccessMessage) {
                        countdownEarlyAccessMessage.style.display = 'none';
                    }
                    return;
                }

                // 4. Calculate time parts
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Helper function to add a leading zero
                const padZero = (num) => num.toString().padStart(2, '0');

                // 5. Display the results in the correct h2 elements
                daysEl.textContent = padZero(days);
                hoursEl.textContent = padZero(hours);
                minutesEl.textContent = padZero(minutes);
                secondsEl.textContent = padZero(seconds);

            }, 1000);
        });