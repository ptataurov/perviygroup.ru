(function() {

    const $slider = $('.header-slider');
    const $images = $('.header-slider__img', $slider);
    const $btns = $('.header-slider__btn-prev, .header-slider__btn-next', $slider);
    const $pointsList = $('.points__list', $slider);
    const point = document.createElement('li');
    point.classList.add('points__item');

    let resetInterval = false;

    let counter = 0;

    for (let i = 0; i < $images.length; i++) {
        $pointsList.append(point.cloneNode());
    }

    const $pointsItem = $('.points__item', $slider);

    $pointsItem.first().addClass('points__item--active');
    
    const run = (index) => {
        $pointsItem.removeClass('points__item--active').eq(index).addClass('points__item--active');
        $images.removeClass('header-slider__img--active').eq(index).addClass('header-slider__img--active');

        if (resetInterval) {
            clearInterval(interval)
        }

    };

    const init = () => {
        run(counter++);
        
        if (counter >= $images.length) {
            counter = 0;
        }
    };

    const interval = setInterval(init, 5000);

    $pointsItem.click((e) => {

        counter = $pointsItem.index(e.target);

        run(counter);
        resetInterval = true;
    });

    $btns.click(function() {
        if ($(this).hasClass('header-slider__btn-prev')) {
            if (--counter < 0) {
                counter = $images.length - 1;
            }
            run(counter);
            resetInterval = true;
        } else {
            if (++counter === $images.length) {
                counter = 0;
            }
            run(counter);
            resetInterval = true;
        }
    });

})();

