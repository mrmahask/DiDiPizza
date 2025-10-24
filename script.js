document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navbar.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.remove('active');
            navbar.classList.remove('active');
        }
    });

    // Description Text Slider
    const slides = document.querySelectorAll('.description-slider .slide');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, slideInterval);
    showSlide(currentSlide); // Initial slide

    // Image Menu Slider
    const menuSlider = document.querySelector('.menu-slider');
    const menuPages = document.querySelectorAll('.menu-page');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    let currentPage = 0;

    function updateMenuSlider() {
        menuSlider.style.transform = `translateX(-${currentPage * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentPage = (currentPage < menuPages.length - 1) ? currentPage + 1 : 0; // Loop to start
        updateMenuSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentPage = (currentPage > 0) ? currentPage - 1 : menuPages.length - 1; // Loop to end
        updateMenuSlider();
    });

    // Language Switcher
    const langEnBtn = document.getElementById('lang-en');
    const langViBtn = document.getElementById('lang-vi');

    const translations = {
        en: {
            home: 'Home',
            about_us_nav: 'About Us',
            menu: 'Menu',
            info: 'Info',
            desc1: 'The best pizza in town.',
            desc2: 'Fresh ingredients, authentic taste.',
            desc3: 'Family friendly, great atmosphere.',
            desc4: 'Delivery and take-away available.',
            desc5: 'Order online now!',
            about_us: 'About Us',
            about_text: 'Welcome to DiDiPizza, where we serve the most delicious pizzas in Hoi An, made with love and the freshest local ingredients. Our passion for authentic Italian pizza and our commitment to quality make us the perfect choice for a memorable meal.',
            our_menu: 'Our Menu',
            prev: 'Previous',
            next: 'Next',
            website_info: 'Website Information',
            name: 'Name',
            address: 'Address',
            email: 'Email',
            copyright: '&copy; 2025 DiDiPizza. All Rights Reserved.'
        },
        vi: {
            home: 'Trang Chủ',
            about_us_nav: 'Về Chúng Tôi',
            menu: 'Thực Đơn',
            info: 'Thông Tin',
            desc1: 'Pizza ngon nhất trong thị trấn.',
            desc2: 'Nguyên liệu tươi, hương vị đích thực.',
            desc3: 'Thân thiện với gia đình, không khí tuyệt vời.',
            desc4: 'Có giao hàng và mang đi.',
            desc5: 'Đặt hàng trực tuyến ngay!',
            about_us: 'Về Chúng Tôi',
            about_text: 'Chào mừng đến với DiDiPizza, nơi chúng tôi phục vụ những chiếc bánh pizza ngon nhất Hội An, được làm bằng tình yêu và những nguyên liệu tươi ngon nhất của địa phương. Niềm đam mê pizza Ý đích thực và cam kết về chất lượng của chúng tôi khiến chúng tôi trở thành sự lựa chọn hoàn hảo cho một bữa ăn đáng nhớ.',
            our_menu: 'Thực Đơn Của Chúng Tôi',
            prev: 'Trước',
            next: 'Tiếp',
            website_info: 'Thông Tin Website',
            name: 'Tên',
            address: 'Địa Chỉ',
            email: 'Email',
            copyright: '&copy; 2025 DiDiPizza. Bảo lưu mọi quyền.'
        }
    };

    function switchLanguage(lang) {
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        document.documentElement.lang = lang;

        if (lang === 'en') {
            langEnBtn.classList.add('active');
            langViBtn.classList.remove('active');
        } else {
            langViBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        }
    }

    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    langViBtn.addEventListener('click', () => switchLanguage('vi'));

    // Set default language on page load
    switchLanguage('en');
});