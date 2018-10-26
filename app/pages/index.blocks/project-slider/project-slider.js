(function() {
    const $projectSlider = $('.project-slider');
    const $projectSliderWrap = $('.project-slider__wrap', $projectSlider);
    const $projectSliderName = $('.project-slider__name', $projectSlider);
    const $projectImg = $('.project-slider__img', $projectSlider);
    document.querySelector('.project-slider__wrap').onclick = () => {
        location.href = $projectImg.eq(0).data('link');
    };

    const $pointsList = $('.points__list', $projectSlider);
    const point = document.createElement('li');
    point.classList.add('points__item');

    for (let i = 0; i < $projectImg.length; i++) {
        $pointsList.append(point.cloneNode());
    }

    const $pointsItem = $('.points__item', $projectSlider);

    $('.points__item:first', $pointsList).addClass('points__item--active');

    let counter = 0;
    let sliderRun = true;

    $projectSliderName.text($projectImg.eq(0).data('name'));

    const run = (index) => {
        $pointsItem.removeClass('points__item--active');
        $projectImg.removeClass('project-slider__img--active');

        $pointsItem.eq(index).addClass('points__item--active');
        $projectImg.eq(index).addClass('project-slider__img--active');
        $projectSliderName.text($projectImg.eq(index).data('name'));
        document.querySelector('.project-slider__wrap').onclick = () => {
            location.href = $projectImg.eq(index).data('link');
        };
        $pointsList.click(() => {
            return false;
        })
    };

    const init = () => {
        if (!sliderRun) {
            return false
        }

        run(counter++);

        if (counter >= $projectImg.length) {
            counter = 0;
        }
    };

    setInterval(init, 5000);

    $projectSlider.hover(
        () => {
        sliderRun = false;
    },
        () => {
        sliderRun = true;
    });

    $pointsItem.click((e) => {
        let index = $pointsItem.index(e.target);

        run(index);

        counter = index;
    })

})();
