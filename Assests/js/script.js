const track = document.querySelector('.logo-carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.logo-carousel-button.next');
const prevButton = document.querySelector('.logo-carousel-button.prev');

let currentIndex = 0;
const totalSlides = slides.length;

// Duplicate the first and last slides for infinite effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const updateCarousel = (index) => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const amountToMove = slideWidth * index;
    track.style.transform = `translateX(-${amountToMove}px)`;
};

// Adjust the initial index to account for clones
nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex > totalSlides) {
        track.style.transition = 'none'; // Disable transition
        currentIndex = 1; // Move to first real slide
        updateCarousel(currentIndex);
        setTimeout(() => {
            track.style.transition = ''; // Re-enable transition
            updateCarousel(currentIndex);
        }, 0);
    } else {
        updateCarousel(currentIndex);
    }
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        track.style.transition = 'none'; // Disable transition
        currentIndex = totalSlides; // Move to last real slide
        updateCarousel(currentIndex);
        setTimeout(() => {
            track.style.transition = ''; // Re-enable transition
            updateCarousel(currentIndex);
        }, 0);
    } else {
        updateCarousel(currentIndex);
    }
});

// Optional: Auto-slide
setInterval(() => {
    nextButton.click();
}, 3000); // Change slide every 3 seconds
