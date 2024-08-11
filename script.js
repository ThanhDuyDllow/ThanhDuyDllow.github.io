let slideIndex = 0;
let startX, endX;
let isDragging = false;

showSlides(slideIndex);

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].style.opacity = 0; // Đặt opacity về 0 khi không hoạt động
        slides[i].addEventListener('dragstart', (e) => e.preventDefault()); // Ngăn chặn kéo ảnh
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active-dot");
    }
    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active-dot");

    // Thêm thời gian chờ để đảm bảo hiệu ứng chuyển đổi được nhìn thấy
    setTimeout(() => {
        slides[slideIndex].style.opacity = 1;
    }, 50);
}

function currentSlide(n) {
    showSlides(slideIndex = n - 1);
}

function nextSlide() {
    showSlides(slideIndex += 1);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
}

// Touch events for mobile
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

// Mouse events for desktop
document.addEventListener('mousedown', (e) => {
    // Check if the mouse button is left or right
    if (e.button === 0 || e.button === 2) {
        startX = e.clientX;
        isDragging = true;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        endX = e.clientX;
    }
});

document.addEventListener('mouseup', (e) => {
    if (isDragging) {
        isDragging = false;
        handleSwipe();
    }
});

function handleSwipe() {
    if (startX > endX + 50) {
        nextSlide();
    } else if (startX < endX - 50) {
        prevSlide();
    }
}
