document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    const bgSlides = document.querySelectorAll('.bg-slide');
    const subtitleItems = document.querySelectorAll('.subtitle-item');
    let currentHeroIndex = 0;

    setInterval(() => {
        bgSlides[currentHeroIndex].classList.remove('active');
        subtitleItems[currentHeroIndex % subtitleItems.length].classList.remove('active');

        currentHeroIndex = (currentHeroIndex + 1) % bgSlides.length;

        bgSlides[currentHeroIndex].classList.add('active');
        subtitleItems[currentHeroIndex % subtitleItems.length].classList.add('active');
    }, 3000);

    const slider = document.getElementById('menu-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const slides = document.querySelectorAll('.menu-item');
    const totalSlides = slides.length;
    
    let currentIndex = 0;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateSliderPosition() {
        currentTranslate = currentIndex * -slider.clientWidth;
        prevTranslate = currentTranslate;
        slider.style.transform = `translateX(${currentTranslate}px)`;
        slider.style.transition = 'transform 0.5s ease-in-out';
    }

    function updateNavButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSliderPosition();
            updateNavButtons();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
            updateNavButtons();
        }
    });
    
    slides.forEach((slide, index) => {
        slide.addEventListener('mousedown', dragStart(index));
        slide.addEventListener('touchstart', dragStart(index));
        
        slide.addEventListener('mousemove', drag);
        slide.addEventListener('touchmove', drag);

        slide.addEventListener('mouseup', dragEnd);
        slide.addEventListener('touchend', dragEnd);
        slide.addEventListener('mouseleave', dragEnd);
    });

    function dragStart(index) {
        return function(event) {
            isDragging = true;
            startPos = getPositionX(event);
            slider.classList.add('grabbing');
            slider.style.transition = 'none';
        }
    }

    function drag(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
            slider.style.transform = `translateX(${currentTranslate}px)`;
        }
    }

    function dragEnd(event) {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove('grabbing');
        
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < totalSlides - 1) {
            currentIndex++;
        }
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }

        updateSliderPosition();
        updateNavButtons();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    updateNavButtons();

    const langEN = document.getElementById('lang-en');
    const langVI = document.getElementById('lang-vi');

    const translations = {
        en: {
            navAbout: "Our Story",
            navMenu: "Menu",
            navContact: "Contact",
            navReserve: "Reserve Now",
            heroTitle: "A Slice of Italy in Hoi An",
            subtitle1: "Experience authentic pizza crafted with passion.",
            subtitle2: "We have a passion for pizza.",
            subtitle3: "We are open Monday to Sunday from 13:00 to 22:00.",
            subtitle4: "Dedicated service.",
            heroButton: "Explore Our Menu",
            aboutTitle: "Our Story",
            aboutText: "Welcome to DiDiPizza, where we bring a slice of Italy to the heart of Hoi An. Our passion for authentic pizza is reflected in every dish we create. Using only the freshest local ingredients and traditional recipes, we promise a dining experience that is both delicious and unforgettable. Join us and taste the difference.",
            menuTitle: "Our Menu",
            introTitle: "Didi Pizza - Fresh pizza daily in the heart",
            introParagraph: "Are you looking for a great stop in the heart of Hoi An to enjoy the true, fresh pizza every day? Do not miss Didi Pizza, a small but impressive small pizza shop, which brings a different and memorable pizza experience.",
            introAdvantagesTitle: "Outstanding advantages:",
            introAdvantage1: "Pizza refreshes every day - Thin, crispy powder, ingredients are always carefully selected and fresh.",
            introAdvantage2: "Delicate flavor, unique - attractive topping, balanced flavor, light and easy to addicted.",
            introAdvantage3: "Cozy, friendly space - Clean shop, gentle decoration, somewhat overlooking the street for you to enjoy the pace of the Hoi An Life",
            introAdvantage4: "Dedicated service, fast - Customers praise attentive service, fast delivery, reasonable price.",
            introAdvantage5: "Interesting interactive experience - You can see chef Didi performing bakery techniques, throwing pizza in front of guests",
            introDishesTitle: "The dishes to try:",
            introDish1: "Gentle pizza can be enough for two people, suitable for light evening.",
            introDish2: "\"Best Sellers\" such as Catch of the Day, 4 Seasons, or traditional types such as Margarita, BBQ Chicken, Diavola.",
            contactTitle: "Visit Us",
            contactInfoTitle: "Information",
            contactAddress: "Address:",
            contactEmail: "Email:",
            contactMapsTitle: "Our Locations",
            footerText: "&copy; 2025 DiDiPizza. All Rights Reserved."
        },
        vi: {
            navAbout: "Câu Chuyện",
            navMenu: "Thực Đơn",
            navContact: "Liên Hệ",
            navReserve: "Đặt Bàn Ngay",
            heroTitle: "Hương Vị Ý tại Hội An",
            subtitle1: "Trải nghiệm pizza đích thực được làm bằng đam mê.",
            subtitle2: "Chúng tôi có niềm đam mê với Pizza.",
            subtitle3: "Chúng tôi có mặt Thứ 2 đến Chủ nhật từ 13:00 đến 22:00.",
            subtitle4: "Phục vụ tận tình.",
            heroButton: "Khám Phá Thực Đơn",
            aboutTitle: "Câu Chuyện Của Chúng Tôi",
            aboutText: "Chào mừng đến với DiDiPizza, nơi chúng tôi mang một lát cắt của Ý đến trái tim Hội An. Niềm đam mê của chúng tôi đối với pizza đích thực được thể hiện trong từng món ăn. Chỉ sử dụng những nguyên liệu tươi ngon nhất của địa phương và công thức truyền thống, chúng tôi hứa hẹn một trải nghiệm ẩm thực ngon miệng và khó quên. Hãy đến và cảm nhận sự khác biệt.",
            menuTitle: "Thực Đơn",
            introTitle: "DiDi Pizza – Pizza tươi hằng ngày giữa lòng phố Hội.",
            introParagraph: "Bạn đang tìm kiếm một điểm dừng chân tuyệt vời giữa lòng Hội An để tận hưởng vị pizza đích thực, tươi ngon mỗi ngày? Đừng bỏ qua DiDi Pizza, một quán pizza nhỏ xinh nhưng đầy ấn tượng, nơi mang đến trải nghiệm pizza khác biệt và đáng nhớ.",
            introAdvantagesTitle: "Ưu điểm nổi bật:",
            introAdvantage1: "Pizza làm tươi mỗi ngày – bột mỏng, giòn rụm, nguyên liệu luôn được chọn kỹ và tươi mới.",
            introAdvantage2: "Hương vị tinh tế, độc đáo – topping hấp dẫn, hương vị cân bằng, nhẹ nhàng và dễ ghiền.",
            introAdvantage3: "Không gian ấm cúng, thân thiện – quán sạch sẽ, trang trí nhẹ nhàng, có phần nhìn ra phố để bạn tận hưởng nhịp sống Hội An",
            introAdvantage4: "Dịch vụ tận tâm, nhanh chóng – khách khen phục vụ chu đáo, giao hàng nhanh, giá cả hợp lý .",
            introAdvantage5: "Trải nghiệm tương tác thú vị – bạn có thể xem đầu bếp Didi biểu diễn kỹ thuật làm bánh, ném đế pizza trước mặt khách",
            introDishesTitle: "Các món nên thử:",
            introDish1: "Pizza nhẹ nhàng có thể đủ cho hai người, thích hợp dùng buổi tối nhẹ.",
            introDish2: "Các “best sellers” như Catch of the Day, 4 Seasons, hoặc các loại truyền thống như Margarita, BBQ Chicken, Diavola.",
            contactTitle: "Ghé Thăm Chúng Tôi",
            contactInfoTitle: "Thông Tin",
            contactAddress: "Địa chỉ:",
            contactEmail: "Email:",
            contactMapsTitle: "Các Cơ Sở",
            footerText: "&copy; 2025 DiDiPizza. Bản Quyền Được Bảo Hộ."
        }
    };

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        langEN.classList.toggle('active', lang === 'en');
        langVI.classList.toggle('active', lang === 'vi');
    }

    langEN.addEventListener('click', () => setLanguage('en'));
    langVI.addEventListener('click', () => setLanguage('vi'));
    setLanguage('en');
});
