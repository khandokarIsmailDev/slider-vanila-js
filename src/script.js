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
    let isSliding = false;

    // Preload images function
    function preloadImages() {
        return Promise.all(
            carouselItems.map(item => {
                return new Promise(resolve => {
                    const img = new Image();
                    img.src = `./assets/${item.bgImage}`;
                    img.onload = resolve;
                });
            })
        );
    }

    // Function to update the background and content
    function updateCarousel(index) {
        const bodyContainer = document.querySelector(".banner");
        const allContents = document.querySelectorAll(".content");

        bodyContainer.style.transition = "background-image 1s ease-in-out";
        bodyContainer.style.backgroundSize = "cover";
        bodyContainer.style.backgroundPosition = "center";
        bodyContainer.style.backgroundImage = `url('./assets/${carouselItems[index].bgImage}')`;

        allContents.forEach(content => {
            content.classList.remove("active");
            content.classList.add("hidden");
        });

        const activeContent = document.querySelector(`.${carouselItems[index].contentClass}`);
        if (activeContent) {
            activeContent.classList.add("active");
            activeContent.classList.remove("hidden");
        }
    }

    // Function to handle auto-slide
    function autoSlide() {
        if (!isSliding) {
            isSliding = true;
            currentIndex = (currentIndex + 1) % carouselItems.length;
            updateCarousel(currentIndex);
            setTimeout(() => {
                isSliding = false;
            }, 1000);
        }
    }

    // Start auto-slide with a set interval
    function startAutoSlide() {
        autoSlideInterval = setInterval(autoSlide, 5300);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function changeBg(index) {
        currentIndex = index;
        updateCarousel(currentIndex);
        stopAutoSlide();
    }

    // Initialize carousel once images are preloaded
    preloadImages().then(() => {
        updateCarousel(currentIndex); // Initial display
        startAutoSlide(); // Start auto-slide after preloading
    });

    // Event listeners for carousel items
    document.querySelectorAll('.carousel-item').forEach((item, index) => {
        item.addEventListener('click', function () {
            changeBg(index);
        });
    });

    const carousel = document.querySelector('.carousel');
    M.Carousel.init(carousel, {});
    const instance = M.Carousel.getInstance(carousel);

    setInterval(() => {
        instance.next();
        autoSlide();
    }, 5300);
});
