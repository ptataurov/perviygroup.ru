(function() {
    const $menu = $('.menu');
    const $hamburger = $('.hamburger');
    const $line = $('.menu__container-line', $menu);

    let menuOpened = false;

    $hamburger.click(() => {
        $('.menu__container', $menu).stop();
        if (window.pageYOffset < '90') {
            $line.toggleClass('menu__container-line--visible');
            $menu.toggleClass('menu--scrolled');
        }

        $('.menu__container', $menu)
            .toggle(500);

        $hamburger.toggleClass('is-active');
        $('body').toggleClass('fixed');
        menuOpened = !menuOpened;
    });

    $(window).scroll((e) => {

        if (window.pageYOffset > '90') {
            $menu.addClass('menu--scrolled');
            $line.addClass('menu__container-line--visible');
        }
        else if (window.pageYOffset < '90' && !menuOpened) {
            $menu.removeClass('menu--scrolled');
            $line.removeClass('menu__container-line--visible');
        }
    });
})();