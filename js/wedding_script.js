document.addEventListener("DOMContentLoaded", function() {
    const card = document.querySelector('.card');
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let moveFlag = false;
    let clickThreshold = 5; // Threshold in pixels to distinguish between a click and a drag

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
            startX = e.touches[0].clientX - card.offsetLeft;
            startY = e.touches[0].clientY - card.offsetTop;
        } else {
            startX = e.clientX - card.offsetLeft;
            startY = e.clientY - card.offsetTop;
        }
        initialX = card.offsetLeft;
        initialY = card.offsetTop;
        card.classList.add('lifted'); // Add the lifted class when dragging starts
    }

    function dragEnd(e) {
        isDragging = false;
        card.classList.remove('lifted'); // Remove the lifted class when dragging ends
        
        if (!moveFlag) {
            // Determine whether the end event was a click or not
            if (e.type === 'touchend') {
                // For touch events, use touchend event coordinates
                let endX = e.changedTouches[0].clientX;
                let endY = e.changedTouches[0].clientY;
                // Compare with start coordinates to check if movement is within the threshold
                if (Math.abs(endX - startX) < clickThreshold && Math.abs(endY - startY) < clickThreshold) {
                    flipCard(e);
                }
            } else {
                // For mouse events, use mouseup event coordinates
                let endX = e.clientX;
                let endY = e.clientY;
                // Compare with start coordinates to check if movement is within the threshold
                if (Math.abs(endX - startX) < clickThreshold && Math.abs(endY - startY) < clickThreshold) {
                    flipCard(e);
                }
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