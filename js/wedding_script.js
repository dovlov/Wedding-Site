document.addEventListener("DOMContentLoaded", function() {
    const card = document.querySelector('.card');
    let isDragging = false;
    let startX, startY;
    let moveFlag = false;
    const clickThreshold = 10; // Threshold in pixels to distinguish between a click and a drag

    // Function to get a random position within the viewport
    function getRandomPosition() {
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const randomX = Math.random() * (windowWidth - cardWidth);
        const randomY = Math.random() * (windowHeight - cardHeight);

        return { x: randomX, y: randomY };
    }

    // Set initial random position for the card
    const { x, y } = getRandomPosition();
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;

    // Mouse Events
    card.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);
    card.addEventListener('click', flipCard);

    // Touch Events
    card.addEventListener('touchstart', dragStart);
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('touchmove', drag);

    function dragStart(e) {
        isDragging = true;
        moveFlag = false;
        e.preventDefault();
        
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }
        card.classList.add('lifted'); // Add the lifted class when dragging starts
    }

    function dragEnd(e) {
        isDragging = false;
        card.classList.remove('lifted'); // Remove the lifted class when dragging ends
        
        if (!moveFlag) {
            // Check if movement was within the click threshold
            let endX, endY;
            if (e.type === 'touchend') {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
            } else {
                endX = e.clientX;
                endY = e.clientY;
            }
            // Check if the move distance is within the threshold
            if (Math.abs(endX - startX) < clickThreshold && Math.abs(endY - startY) < clickThreshold) {
                flipCard(e);
            }
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            if (e.type === 'touchmove') {
                card.style.left = `${e.touches[0].clientX - startX}px`;
                card.style.top = `${e.touches[0].clientY - startY}px`;
            } else {
                card.style.left = `${e.clientX - startX}px`;
                card.style.top = `${e.clientY - startY}px`;
            }
            moveFlag = true;
        }
    }

    function flipCard(e) {
        card.classList.toggle('flipped');
    }
});
