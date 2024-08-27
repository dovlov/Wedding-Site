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

    card.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);
    card.addEventListener('click', flipCard);

    function dragStart(e) {
        isDragging = true;
        moveFlag = false;
        startX = e.clientX - card.offsetLeft;
        startY = e.clientY - card.offsetTop;
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
            card.style.left = `${e.clientX - startX}px`;
            card.style.top = `${e.clientY - startY}px`;
            moveFlag = true;
        }
    }

    function flipCard(e) {
        if (!moveFlag) {
            card.classList.toggle('flipped');
        }
    }
});