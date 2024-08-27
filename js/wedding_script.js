document.addEventListener("DOMContentLoaded", function() {
    const card = document.querySelector('.card');
    let isDragging = false;
    let startX, startY;
    let touchStartX, touchStartY;
    let moveFlag = false;
    let clickTimeout;
    const MIN_BOTTOM_DISTANCE = 30; // Minimum distance from the bottom of the screen

    // Function to get a random position within the viewport
    function getRandomPosition() {
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Ensure the card is not less than MIN_BOTTOM_DISTANCE from the bottom
        const maxX = windowWidth - cardWidth;
        const maxY = windowHeight - cardHeight - MIN_BOTTOM_DISTANCE;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

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

    // Touch Events
    card.addEventListener('touchstart', dragStart);
    document.addEventListener('touchend', dragEnd);
    document.addEventListener('touchmove', drag);

    function dragStart(e) {
        e.preventDefault();
        isDragging = true;
        moveFlag = false;
        
        if (e.type === 'touchstart') {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            startX = touchStartX - card.offsetLeft;
            startY = touchStartY - card.offsetTop;
        } else {
            startX = e.clientX - card.offsetLeft;
            startY = e.clientY - card.offsetTop;
        }

        card.classList.add('lifted'); // Add the lifted class when dragging starts
    }

    function dragEnd(e) {
        isDragging = false;
        card.classList.remove('lifted'); // Remove the lifted class when dragging ends
        
        // Handle click
        if (!moveFlag) {
            if (e.type === 'touchend') {
                clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => flipCard(), 150); // Allow some time for click handling
            } else {
                clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => flipCard(), 150); // Allow some time for click handling
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

    function flipCard() {
        card.classList.toggle('flipped');
    }
});