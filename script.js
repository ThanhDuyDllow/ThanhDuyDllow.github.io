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

const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    grabCursor: true,
});

function changePrice(elementId, price) {
    document.getElementById(elementId).innerText = 'Giá: ' + price.toLocaleString('vi-VN') + ' VND';
}


document.addEventListener('DOMContentLoaded', function() {
    // Danh sách các sản phẩm với ID của phần đánh giá và phản ứng
    const products = [
        { id: 'rating1', reactionId: 'reaction1' },
        { id: 'rating2', reactionId: 'reaction2' },
        { id: 'rating3', reactionId: 'reaction3' },
        { id: 'rating4', reactionId: 'reaction4' },
        { id: 'rating5', reactionId: 'reaction5' },
        { id: 'rating6', reactionId: 'reaction6' },
        { id: 'rating7', reactionId: 'reaction7' },
        { id: 'rating8', reactionId: 'reaction8' }
    ];

    // Lặp qua từng sản phẩm để gán sự kiện cho các ngôi sao
    products.forEach(product => {
        const stars = document.querySelectorAll(`#${product.id} .star`);
        let selectedRating = 0; // Số sao bạn quy định sẵn
        let hasRated = false; // Biến để theo dõi trạng thái đánh giá

        stars.forEach(star => {
            // Sự kiện khi rê chuột qua ngôi sao
            star.addEventListener('mouseover', function() {
                if (!hasRated) {
                    const value = parseInt(this.getAttribute('data-value'));
                    highlightStars(value, stars);
                    showReaction(value, product.reactionId);
                }
            });

            // Sự kiện khi chuột rời khỏi ngôi sao
            star.addEventListener('mouseout', function() {
                if (!hasRated) {
                    highlightStars(selectedRating, stars);
                    hideReaction(product.reactionId);
                }
            });

            // Sự kiện khi nhấp vào ngôi sao
            star.addEventListener('click', function() {
                if (!hasRated) {
                    selectedRating = parseInt(this.getAttribute('data-value'));
                    highlightStars(selectedRating, stars);
                    hasRated = true; // Đánh dấu là đã đánh giá
                }
            });
        });

        // Hàm để làm nổi bật các ngôi sao
        function highlightStars(rating, stars) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('hover');
                    star.innerText = '★';
                } else {
                    star.classList.remove('hover');
                    star.innerText = '☆';
                }
            });
        }

        // Hàm để hiển thị biểu tượng cảm xúc
        function showReaction(rating, reactionId) {
            const reactionElement = document.getElementById(reactionId);
            let reaction = '';

            switch (rating) {
                case 1:
                    reaction = '😢';
                    break;
                case 2:
                    reaction = '🥺';
                    break;
                case 3:
                    reaction = '😊';
                    break;
                case 4:
                    reaction = '😂';
                    break;
                case 5:
                    reaction = '❤️';
                    break;
            }

            reactionElement.innerText = reaction;
            reactionElement.style.display = 'inline';
        }

        // Hàm để ẩn biểu tượng cảm xúc
        function hideReaction(reactionId) {
            const reactionElement = document.getElementById(reactionId);
            reactionElement.style.display = 'none';
        }

        // Khởi tạo trạng thái ban đầu
        highlightStars(selectedRating, stars);
    });
});

// Hàm để thay đổi giá
function changePrice(priceId, newPrice) {
    document.getElementById(priceId).innerText = `Giá: ${newPrice.toLocaleString()} VND`;
}
