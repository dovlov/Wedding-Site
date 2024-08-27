document.addEventListener("DOMContentLoaded", function() {
    const card = document.querySelector('.card');
    let isDragging = false;
    let startX, startY, initialX, initialY;
    let moveFlag = false;

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
        // Prevent touch event from triggering mouse events
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

    function dragEnd() {
        isDragging = false;
        card.classList.remove('lifted'); // Remove the lifted class when dragging ends
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
        if (!moveFlag) {
            card.classList.toggle('flipped');
        }
    }
});