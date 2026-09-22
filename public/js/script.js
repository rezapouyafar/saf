function buildMobileHeaderTools() {
    var rows = document.querySelectorAll('.storefront-shell-header .nav-row, .site-header .nav-row');
    if (!rows.length || document.querySelector('.mobile-header-tools')) return;

    rows.forEach(function (row) {
        var wrapper = document.createElement('div');
        wrapper.className = 'mobile-header-tools';

        var pill = document.createElement('span');
        pill.className = 'mobile-header-pill';
        pill.textContent = 'تازه‌ها';

        var logout = document.createElement('a');
        logout.className = 'mobile-header-logout';
        logout.href = 'logout';
        logout.setAttribute('aria-label', 'خروج از حساب');
        logout.innerHTML = '<i class="fas fa-right-from-bracket"></i><span>خروج</span>';

        wrapper.appendChild(pill);
        wrapper.appendChild(logout);
        row.appendChild(wrapper);
    });
}

function buildMobileBottomNav() {
    if (document.querySelector('.mobile-bottom-nav')) return;

    var candidates = Array.prototype.slice.call(document.querySelectorAll('.storefront-shell-header .nav-links a, .site-header .nav-links a, .storefront-shell-header .nav-actions a, .site-header .nav-actions a'));
    var preferred = [];
    var seen = {};

    function addLink(link) {
        if (!link) return;
        var href = (link.getAttribute('href') || '').trim();
        var text = (link.textContent || '').trim();
        var key = href || text;
        if (!href || !key || seen[key]) return;
        seen[key] = true;
        preferred.push(link);
    }

    var homeLink = Array.prototype.find.call(candidates, function (link) {
        var href = (link.getAttribute('href') || '').toLowerCase();
        var text = (link.textContent || '').toLowerCase();
        return href.indexOf('index') !== -1 || text.indexOf('خانه') !== -1 || href === './' || href === '/';
    });
    addLink(homeLink);

    var productLink = Array.prototype.find.call(candidates, function (link) {
        var href = (link.getAttribute('href') || '').toLowerCase();
        var text = (link.textContent || '').toLowerCase();
        return href.indexOf('product') !== -1 || text.indexOf('محصول') !== -1;
    });
    addLink(productLink);

    var cartLink = Array.prototype.find.call(candidates, function (link) {
        var href = (link.getAttribute('href') || '').toLowerCase();
        var text = (link.textContent || '').toLowerCase();
        return href.indexOf('cart') !== -1 || href.indexOf('showcart') !== -1 || text.indexOf('سبد') !== -1 || link.classList.contains('cart-button');
    });
    addLink(cartLink);

    var accountLink = Array.prototype.find.call(candidates, function (link) {
        var href = (link.getAttribute('href') || '').toLowerCase();
        var text = (link.textContent || '').toLowerCase();
        return href.indexOf('panel') !== -1 || href.indexOf('login') !== -1 || href.indexOf('register') !== -1 || text.indexOf('حساب') !== -1 || text.indexOf('ورود') !== -1 || link.classList.contains('auth-link');
    });
    addLink(accountLink);

    var extraLinks = candidates.filter(function (link) {
        var href = (link.getAttribute('href') || '').toLowerCase();
        var text = (link.textContent || '').toLowerCase();
        return href.indexOf('about') !== -1 || href.indexOf('contact') !== -1 || href.indexOf('gallery') !== -1 || text.indexOf('درباره') !== -1 || text.indexOf('تماس') !== -1 || text.indexOf('گالری') !== -1;
    });
    for (var i = 0; i < extraLinks.length && preferred.length < 5; i++) {
        addLink(extraLinks[i]);
    }

    if (preferred.length === 0) return;

    var iconMap = {
        home: 'fa-house',
        index: 'fa-house',
        product: 'fa-bag-shopping',
        products: 'fa-bag-shopping',
        gallery: 'fa-image',
        about: 'fa-circle-info',
        contact: 'fa-phone',
        service: 'fa-hand-holding-heart',
        services: 'fa-hand-holding-heart',
        cart: 'fa-cart-shopping',
        showcart: 'fa-cart-shopping',
        panel: 'fa-user',
        account: 'fa-user',
        login: 'fa-right-to-bracket',
        register: 'fa-user-plus'
    };

    function getIcon(href, text) {
        var lookup = (href || '') + ' ' + (text || '').toLowerCase();
        for (var key in iconMap) {
            if (lookup.indexOf(key) !== -1) return iconMap[key];
        }
        return 'fa-circle';
    }

    var nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.setAttribute('aria-label', 'منوی موبایل');

    nav.innerHTML = preferred.slice(0, 5).map(function (link) {
        var href = link.getAttribute('href') || '#';
        var text = (link.textContent || '').trim() || 'صفحه';
        var icon = getIcon(href, text);
        var isActive = link.classList.contains('active') ? ' is-active' : '';
        return '<a class="mobile-bottom-nav__item' + isActive + '" href="' + href + '" aria-label="' + text + '"><i class="fas ' + icon + '"></i><span>' + text + '</span></a>';
    }).join('');

    document.body.appendChild(nav);
}

$(document).ready(function () {
    buildMobileHeaderTools();
    buildMobileBottomNav();
});

(function () {
    function ensureAgriBackground() {
        if (document.querySelector('.agri-bg')) return;

        const body = document.body;
        if (!body) return;

        const items = [
            { x: '2%', y: '6%', size: '24px', duration: '12s', delay: '-1s', icon: 'fa-leaf' },
            { x: '9%', y: '20%', size: '22px', duration: '16s', delay: '-4s', icon: 'fa-seedling' },
            { x: '15%', y: '12%', size: '20px', duration: '14s', delay: '-7s', icon: 'fa-leaf' },
            { x: '21%', y: '38%', size: '23px', duration: '18s', delay: '-9s', icon: 'fa-seedling' },
            { x: '29%', y: '16%', size: '26px', duration: '15s', delay: '-3s', icon: 'fa-leaf' },
            { x: '34%', y: '52%', size: '21px', duration: '17s', delay: '-8s', icon: 'fa-seedling' },
            { x: '41%', y: '9%', size: '19px', duration: '14s', delay: '-5s', icon: 'fa-leaf' },
            { x: '48%', y: '28%', size: '24px', duration: '20s', delay: '-11s', icon: 'fa-seedling' },
            { x: '56%', y: '14%', size: '20px', duration: '13s', delay: '-2s', icon: 'fa-leaf' },
            { x: '62%', y: '48%', size: '22px', duration: '16s', delay: '-6s', icon: 'fa-seedling' },
            { x: '69%', y: '10%', size: '20px', duration: '17s', delay: '-10s', icon: 'fa-leaf' },
            { x: '76%', y: '24%', size: '19px', duration: '15s', delay: '-4s', icon: 'fa-seedling' },
            { x: '83%', y: '16%', size: '23px', duration: '19s', delay: '-13s', icon: 'fa-leaf' },
            { x: '89%', y: '42%', size: '21px', duration: '16s', delay: '-7s', icon: 'fa-seedling' },
            { x: '95%', y: '8%', size: '18px', duration: '14s', delay: '-12s', icon: 'fa-leaf' },
            { x: '5%', y: '64%', size: '22px', duration: '20s', delay: '-8s', icon: 'fa-leaf' },
            { x: '12%', y: '79%', size: '21px', duration: '18s', delay: '-12s', icon: 'fa-seedling' },
            { x: '24%', y: '70%', size: '19px', duration: '14s', delay: '-2s', icon: 'fa-leaf' },
            { x: '37%', y: '80%', size: '22px', duration: '16s', delay: '-9s', icon: 'fa-seedling' },
            { x: '53%', y: '72%', size: '23px', duration: '19s', delay: '-5s', icon: 'fa-leaf' },
            { x: '66%', y: '84%', size: '20px', duration: '15s', delay: '-12s', icon: 'fa-seedling' },
            { x: '80%', y: '73%', size: '24px', duration: '18s', delay: '-6s', icon: 'fa-leaf' },
            { x: '90%', y: '64%', size: '21px', duration: '17s', delay: '-10s', icon: 'fa-seedling' },
            { x: '52%', y: '58%', size: '19px', duration: '12s', delay: '-1s', icon: 'fa-leaf' },
            { x: '31%', y: '66%', size: '20px', duration: '14s', delay: '-8s', icon: 'fa-seedling' },
            { x: '8%', y: '48%', size: '20px', duration: '16s', delay: '-11s', icon: 'fa-leaf' },
            { x: '43%', y: '44%', size: '19px', duration: '15s', delay: '-7s', icon: 'fa-seedling' },
            { x: '73%', y: '60%', size: '21px', duration: '18s', delay: '-3s', icon: 'fa-leaf' },
            { x: '58%', y: '68%', size: '18px', duration: '13s', delay: '-9s', icon: 'fa-seedling' },
            { x: '17%', y: '90%', size: '19px', duration: '17s', delay: '-14s', icon: 'fa-leaf' },
            { x: '42%', y: '92%', size: '18px', duration: '15s', delay: '-10s', icon: 'fa-seedling' },
            { x: '75%', y: '92%', size: '20px', duration: '18s', delay: '-4s', icon: 'fa-leaf' },
            { x: '93%', y: '88%', size: '18px', duration: '14s', delay: '-8s', icon: 'fa-seedling' }
        ];

        const background = document.createElement('div');
        background.className = 'agri-bg';
        background.setAttribute('aria-hidden', 'true');

        items.forEach(function (item) {
            const span = document.createElement('span');
            span.className = 'agri-bg__item';
            span.style.setProperty('--x', item.x);
            span.style.setProperty('--y', item.y);
            span.style.setProperty('--size', item.size);
            span.style.setProperty('--duration', item.duration);
            span.style.setProperty('--delay', item.delay);

            const icon = document.createElement('i');
            icon.className = 'fas ' + item.icon;
            span.appendChild(icon);
            background.appendChild(span);
        });

        body.insertBefore(background, body.firstChild);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureAgriBackground, { once: true });
    } else {
        ensureAgriBackground();
    }
})();

$(document).ready(function () {
    $('.product-slider').slick({
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: ".prev-btn",
        nextArrow: ".next-btn",
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]

    });

    if ($('.hero-slider').length) {
        $('.hero-slider').slick({
            autoplay: true,
            autoplaySpeed: 5200,
            fade: true,
            speed: 700,
            arrows: true,
            prevArrow: '.hero-prev',
            nextArrow: '.hero-next',
            dots: true,
            pauseOnHover: true,
            adaptiveHeight: false
        }).on('afterChange', function (event, slick, currentSlide) {
            $('.hero-slide-count').text('0' + (currentSlide + 1) + ' / 03');
        });

        $('body').addClass('home-motion');
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.14});

            $('.home-reveal').each(function () {
                revealObserver.observe(this);
            });
        } else {
            $('.home-reveal').addClass('is-visible');
        }
    }

    $('.nav-trigger').click(function () {
        $('.site-content-wrapper').toggleClass('scaled');
    })
});

$(document).ready(function () {
    $('#details .left .l_right .colors li').click(function () {
        $('#details .left .l_right .colors li .circle').removeClass('active');
        $('.circle', this).addClass('active');
    });

    $('.select_list').click(function () {
        var ulTag = $('ul', this);
        ulTag.slideToggle();
    });

    $('.select_list ul li').click(function () {
        var txt = $(this).text();
        $('.select_list p.title').text(txt);
    });

    $('#introduction .more a').click(function () {
        $(this).parents('#introduction').toggleClass('active');
        if ($('#introduction').hasClass('active')) {
            $('.more_less', this).text('نمایش کمتر');
        } else {
            $('.more_less', this).text('نمایش بیشتر');
        }
    });

    $("#tab_child .item h4").click(function () {
        var item = $(this).parent();
        $(this).toggleClass('active');
        $(".item_content", item).slideToggle();
    });
})


$(document).ready(function () {
    $('.type1').click(function () {
        $('#products').addClass('display1');
        $('#products ul#products-container > li').removeClass('col-md-4 col-lg-3');
        $(this).addClass('active');
        $('.type2').removeClass('active');
    });

    $('.type2').click(function () {
        $('#products').removeClass('display1');
        $('#products ul#products-container > li').addClass('col-md-4 col-lg-3');
        $(this).addClass('active');
        $('.type1').removeClass('active');
    });
});

/* FLIP TIMER =>(CUNTDOWN TIMER) */
$(document).ready(function () {
    $('.flipTimer').flipTimer({
        // count up or countdown
        direction: 'down',

        // the target <a href="https://www.jqueryscript.net/time-clock/">date</a>
        date: 'October 20, 2021 21:10:30',

        // callback works only with direction = "down"
        callback: function () {
            $('.slider2_content').css({'opacity': 0.4});
            $('.slider2_finished').show();
        },
    });
});

// SHOW GALLEY IMG
$(document).ready(function () {
    var imgWrapper = $(".gallery-wrapper");
    var imageContainer = $('.img-container');
    var imgGallery = imageContainer.find('.imgCaption img');
    var captionGallery = imageContainer.find('.imgCaption div');

    $('.gallery img').click(function () {
        var imgSrc = $(this).attr('src');
        var caption = $(this).attr("data-caption");

        imgWrapper.fadeIn();
        var imgSrc = imgSrc.replace('thumb_', '');
        imgGallery.attr('src', imgSrc);
        imageContainer.fadeIn();
        imgGallery.fadeIn();
        if (caption.length) {
            captionGallery.html(caption).fadeIn();
        }
    });

    $(".img-container:not(.imgCaption)").click(function () {
        imgWrapper.fadeOut();
        imgGallery.fadeOut();
        imageContainer.fadeOut();
        captionGallery.html('').fadeOut();
    });
});

/* SHOW DETAILS ORDERS */

// $(document).ready(function () {
function showDetails(tag) {
    var imgTag = $(tag);
    imgTag.toggleClass('open');
    if (imgTag.hasClass('open')) {
        imgTag.attr('src', 'public/images/orderdetailsclose.png');
    } else {
        imgTag.attr('src', 'public/images/orderdetailsopen.png');
    }
    var parentTr = imgTag.parents('tr');
    parentTr.next('.details').fadeToggle(500);
}

// });


$(document).ready(function () {
    $(".hamburger-menu").click(function () {
        $(".hamburger-menu").toggleClass("change");
        $(".navbar").slideToggle("change");
    });
});


$(document).ready(function () {
    var tag = window.location.href.split("#")[1];
    if ((window.location.hash).length) {
        $('html, body').animate({
            scrollTop: $("." + tag).offset().top
        }, 800);
    }
})

////////////////////////////////// ADMIN SECTION ////////////////

// for admin page
$(document).ready(function () {
    $("li.panel").click(function () {
        $(this).parent().parent().find(".panel ul").slideUp();
        $("li.panel").removeClass('panel-active');
        if ($(this).find("ul").css("display") == "none")
            $(this).addClass('panel-active').find("ul").slideDown();
    })

    if ($("li.panel ul a").hasClass('active')) {
        $("li.panel ul a.active").parents('ul').slideDown(0)
        $("li.panel ul a.active").parents('li.panel').addClass('panel-active')
    }
});

$(document).ready(function () {
    $(".hamburger-menu").click(function () {
        $(".hamburger-menu").toggleClass("change");
        $("#sidebar").slideToggle();
    });
});


$(document).ready(function () {
    $(".checkAll").change(function () {
        var parentTable = $(this).parents().find('table');
        var checkboxs = parentTable.find('input[type=checkbox]');
        if ($(this).is(':checked')) {
            checkboxs.each(function () {
                this.checked = true;
            })
        } else {
            checkboxs.each(function () {
                this.checked = false;
            })
        }
    })
});

$(document).ready(function () {
    $(".print-button").click(function () {
        window.print();
    });
});

// User account workspace navigation
$(document).ready(function () {
    var panelCopy = {
        overview: {
            title: 'نمای کلی حساب',
            description: 'وضعیت سفارش‌ها و اطلاعات حساب شما در یک نگاه.'
        },
        activity: {
            title: 'فعالیت‌های من',
            description: 'تیکت‌ها، سفارش‌ها و فهرست‌های ذخیره‌شده‌ی شما.'
        }
    };

    $('.account-nav-link[data-panel-target]').on('click', function () {
        var target = $(this).data('panel-target');
        var copy = panelCopy[target];

        $('.account-nav-link[data-panel-target]')
            .removeClass('is-active')
            .attr('aria-selected', 'false');
        $(this).addClass('is-active').attr('aria-selected', 'true');

        $('[data-panel-section]').each(function () {
            var isTarget = $(this).data('panel-section') === target;
            $(this).prop('hidden', !isTarget).toggleClass('is-visible', isTarget);
        });

        if (copy) {
            $('#panel-title').text(copy.title);
            $('#panel-description').text(copy.description);
        }
    });
});
