$(document).ready(function () {
    $(".carousel").carousel();
  });

let isChangingBg = false; // Flag to prevent multiple calls

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

    contents.forEach(content => {
        content.classList.remove("active");
        if (content.classList.contains(title)) {
            content.classList.add("active");
        }
    });

    setTimeout(() => {
        isChangingBg = false;
    }, 500); // 500ms delay
}

document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const bg = this.querySelector('img').src.split('/').pop();
        const title = this.classList[1];
        changeBg(bg, title);
    });
});