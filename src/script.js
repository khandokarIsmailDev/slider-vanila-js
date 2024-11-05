document.addEventListener("DOMContentLoaded", function () {
    const carouselItems = [
        { bgImage: "paharer-rasta.jpg", contentClass: "kishoregonj" },
        { bgImage: "saintmartin.jpg", contentClass: "dhaka" },
        { bgImage: "green-tree.jpg", contentClass: "kuakata" },
        { bgImage: "rice-seed.jpg", contentClass: "rangpur" },
        { bgImage: "pahar.jpg", contentClass: "manikganj" },
    ];

    let currentIndex = 0;
    let autoSlideInterval;
    let isSliding = false; // Flag to prevent multiple slides at once

    // Function to update the background and content based on the current index
    function updateCarousel(index) {
        const bodyContainer = document.querySelector(".banner");
        const allContents = document.querySelectorAll(".content");

        // Add transition for smooth background change
        bodyContainer.style.transition = "background-image 1s ease-in-out";

        // Update background image
        bodyContainer.style.backgroundImage = `url('./assets/${carouselItems[index].bgImage}')`;

        // Hide all content elements
        allContents.forEach(content => {
            content.classList.remove("active");
            content.classList.add("hidden");
        });

        // Show the active content
        const activeContent = document.querySelector(`.${carouselItems[index].contentClass}`);
        if (activeContent) {
            activeContent.classList.add("active");
            activeContent.classList.remove("hidden");
        }
    }

    // Function to handle auto-slide
    function autoSlide() {
        if (!isSliding) { // Check if not currently sliding
            isSliding = true; // Set the flag to true
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel(currentIndex);
            setTimeout(() => {
                isSliding = false; // Reset the flag after the update
            }, 1000); // Adjust timeout based on your transition duration
        }
    }

    // Start auto-slide with a set interval
    function startAutoSlide() {
        autoSlideInterval = setInterval(autoSlide, 5300);
    }

    // Stop auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Manual change background function
    function changeBg(index) {
        currentIndex = index; // Update the current index
        updateCarousel(currentIndex);
        stopAutoSlide(); // Stop auto-slide on manual change
        //setTimeout(startAutoSlide, 7000); // Restart auto-slide after 5 seconds
    }

    // Initialize carousel display
    updateCarousel(currentIndex);

   

    // Set up event listeners for carousel items
    document.querySelectorAll('.carousel-item').forEach((item, index) => {
        item.addEventListener('click', function () {
            changeBg(index); // Change background based on clicked item
        });
    });

    // Initialize Materialize carousel
    const carousel = document.querySelector('.carousel');
    M.Carousel.init(carousel, {
        // indicators: true
    });

    const instance = M.Carousel.getInstance(carousel);

    // Automatically move to the next slide every 5 seconds
    setInterval(() => {
        instance.next(); // Move to the next item
        autoSlide(); // Update the background based on the next item
    }, 5300);
});

function preloadImages() {
    carouselItems.forEach(item => {
        const img = new Image();
        img.src = `./assets/${item.bgImage}`; // Preload each image
    });
}

// Initialize carousel display
updateCarousel(currentIndex);
preloadImages(); // Preload images before starting auto-slide

// Start the auto-slide
startAutoSlide();

 // Start the auto-slide
 startAutoSlide();