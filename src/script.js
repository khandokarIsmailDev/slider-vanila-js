document.addEventListener("DOMContentLoaded", function () {
    // Define an array of carousel items with background images and content IDs
    const carouselItems = [
        { bgImage: "paharer-rasta.jpg", contentClass: "kishoregonj" },
        { bgImage: "saintmartin.jpg", contentClass: "dhaka" },
        { bgImage: "green-tree.jpg", contentClass: "kuakata" },
        { bgImage: "rice-seed.jpg", contentClass: "rangpur" },
        { bgImage: "pahar.jpg", contentClass: "manikganj" },
    ];

    let currentIndex = 0;
    let isChangingBg = false;

    // Function to update background image and content based on index
    function updateCarousel(index) {
        const bodyContainer = document.querySelector(".banner");
        const allContents = document.querySelectorAll(".content");

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

    // Manual change background function for onclick events
    // function changeBg(bgImage, contentClass) {
    //     const index = carouselItems.findIndex(
    //         item => item.bgImage === bgImage && item.contentClass === contentClass
    //     );
    //     if (index !== -1) {
    //         currentIndex = index;
    //         updateCarousel(currentIndex);
    //     }
    // }

    // Auto-slide function
    function autoSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel(currentIndex);
    }

    // Start auto-slide every 5 seconds
    setInterval(autoSlide, 5300);

    // Initialize carousel display
    updateCarousel(currentIndex);

    // Initialize Materialize carousel
    const carousel = document.querySelector('.carousel');
    M.Carousel.init(carousel, {
        indicators: true
    });

    const instance = M.Carousel.getInstance(carousel);

    // Automatically move to the next slide every 3 seconds and update the background
    setInterval(() => {
        const activeItem = document.querySelector('.carousel-item.active');
        updateBackgroundFromItem(activeItem); // Call background update before moving to the next slide
        instance.next();
    }, 5000);
    
    // Update background on item click
    document.querySelectorAll('.carousel-item').forEach(item => {
        item.addEventListener('click', function () {
            const bg = this.querySelector('img').src.split('/').pop();
            const title = this.getAttribute('data-title');
            // changeBg(bg, title);
        });
    });

    // Function to update background from the active item
    function updateBackgroundFromItem(item) {
        if (item) {
            const bg = item.querySelector('img').src.split('/').pop();
            const title = item.getAttribute('data-title');
            // changeBg(bg, title);
        }
    }
});

let isChangingBg = false;

// Function to change background and content with delay
function changeBg(bg, title) {
    if (isChangingBg) return; // Prevent further calls if already changing
    isChangingBg = true; // Set the flag

    const banner = document.querySelector(".banner");
    const contents = document.querySelectorAll(".content");

    console.log("Changing background to:", bg);
    console.log("Title to activate:", title);

    if (banner) {
        setTimeout(() => {
            banner.style.background = `url("./assets/${bg}")`;
            banner.style.backgroundSize = "cover";
            banner.style.backgroundPosition = "center";
        }, 500);
    } else {
        console.error("Banner element not found.");
    }

    setTimeout(() => {
        contents.forEach(content => {
            content.classList.remove("active");
            if (content.classList.contains(title)) {
                content.classList.add("active");
            }else{
                content.classList.add("hidden");
            }
        });
    }, 500); // Delay of 500ms for the contents update

    setTimeout(() => {
        isChangingBg = false;
    }, 500); // 500ms delay
}

// Update background on item click
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const bg = this.querySelector('img').src.split('/').pop();
        const title = this.classList[1];
        changeBg(bg, title);
        
        // Pause auto-slide when an item is clicked
        clearInterval(autoSlideInterval); // Stop the auto-slide
        autoSlideInterval = setInterval(autoSlide, 15000); // Restart auto-slide after a delay if needed
    });
});