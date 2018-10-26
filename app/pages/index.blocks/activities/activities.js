(function() {

    const $switches = $('.activities__switches');
    const $icon = $('.activities__icons-group-item', $switches);

    const $content = $('.activities__content');
    const $contentImg = $('.activities__img', $content);
    const $contentBody = $('.activities__content-body', $content).add($contentImg);
    const $iconActive = $('.activities__icons-group-item--active', $switches);

    $('.activities__icon-active', $icon).hide();

    $contentBody.each(function() {

        const currentContent = $iconActive.data('name');

        $icon.each(function() {
           if ($(this).data('name') === currentContent) {
               $('.activities__icon', $(this)).hide();
               $('.activities__icon-active', $(this)).show();
           }
        });

        if ($(this).data('name') !== currentContent) {
            $(this).hide().filter($contentImg).addClass('activities__img--hidden');
        }
    });

    $icon.click(function() {

        const $self = $(this);

        $icon.removeClass('activities__icons-group-item--active').find($('.activities__label')).removeClass('bold');
        $self.addClass('activities__icons-group-item--active').find($('.activities__label')).addClass('bold');

        $contentBody.each(function() {

            $('.activities__icon-active').hide();
            $('.activities__icon').show();

            const $iconActive = $('.activities__icons-group-item--active', $switches);

            $('.activities__icon', $iconActive).hide();
            $('.activities__icon-active', $iconActive).show();

            if ($(this).data('name') !== $iconActive.data('name')) {

                $(this).filter($contentImg).addClass('activities__img--hidden').addBack().hide();

            } else if ($(this).data('name') === $iconActive.data('name')) {

                $(this).show().filter($contentImg).removeClass('activities__img--hidden');

            }
        });
    })
})();