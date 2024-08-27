document.addEventListener("DOMContentLoaded", function() {
    const card = document.querySelector('.card');
    let isDragging = false;
    let startX, startY;
    let touchStartX, touchStartY;
    let moveFlag = false;
    let clickTimeout;

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