(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);

// Kiểm tra trạng thái đăng nhập khi trang được tải
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('/api/auth/user', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' // Thêm credentials để gửi cookie cùng yêu cầu
        });

        if (response.ok) {
            const user = await response.json();
            const usernameDisplay = document.getElementById('username-display');
            usernameDisplay.textContent = `Xin chào ${user.username}`;
            document.getElementById('user-greeting').style.display = 'block'; // Hiển thị phần tử navbar chứa tên người dùng
            document.getElementById('logout-link').style.display = 'block'; // Hiển thị nút đăng xuất
            document.getElementById('login-link').style.display = 'none'; // Ẩn nút đăng nhập
            document.getElementById('register-link').style.display = 'none'; // Ẩn nút đăng ký
        } else {
            // Không có người dùng đã đăng nhập
            document.getElementById('user-greeting').style.display = 'none'; // Ẩn phần tử navbar chứa tên người dùng
            document.getElementById('logout-link').style.display = 'none'; // Ẩn nút đăng xuất
            document.getElementById('login-link').style.display = 'block'; // Hiển thị nút đăng nhập
            document.getElementById('register-link').style.display = 'block'; // Hiển thị nút đăng ký
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Xử lý đăng xuất
document.getElementById('logout').addEventListener('click', async function (event) {
    event.preventDefault();
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (response.ok) {
            document.getElementById('user-greeting').style.display = 'none'; // Ẩn phần tử navbar chứa tên người dùng
            document.getElementById('logout-link').style.display = 'none'; // Ẩn nút đăng xuất
            document.getElementById('login-link').style.display = 'block'; // Hiển thị nút đăng nhập
            document.getElementById('register-link').style.display = 'block'; // Hiển thị nút đăng ký
            alert('Logout successful');
        } else {
            const data = await response.json();
            alert(`Logout failed: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during logout');
    }
});
