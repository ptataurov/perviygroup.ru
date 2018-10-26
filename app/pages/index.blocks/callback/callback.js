(function() {
    const $callback = $('.callback');
    const $checkbox = $('.callback__checkbox');
    const $checked = $('.callback__checkbox-checked');
    const $input = $('.callback__input', $callback);
    let formFlag = true;

    $('.callback__input[type="tel"]').mask('(000) 000-00-00');

    $checkbox.click(() => {
        $checked.toggleClass('callback__checkbox-checked--hidden');
        $checkbox.removeClass('callback__checkbox--error');
    });

    $input.focusin(function() {
        $(this).addClass('callback__input--active');
    });

    $input.focusout(function() {
        $(this).removeClass('callback__input--active');
    });

    $input.blur(function() {
        if ($(this).data('required') && $(this).val() === '') {
            $(this).addClass('callback__input--error');
        } else {
            $(this).removeClass('callback__input--error');
        }
    });

    $('.callback__submit', $callback).click(function(e) {
        formFlag = true;
        e.preventDefault();
        e.stopPropagation();
        if ($checked.hasClass('callback__checkbox-checked--hidden')) {
            $checkbox.addClass('callback__checkbox--error');
            formFlag = false;
        }

        $input.each(function() {
            if ($(this).data('required') && $(this).val() === '') {
                $(this).addClass('callback__input--error');
                formFlag = false;
            } else if (formFlag) {
                $(this).removeClass('callback__input--error');
                let userName = $('.callback__input-name').val();
                const userPhone = $('.callback__input-tel').val();
                const userEmail = $('.callback__input-mail').val();

                $.ajax({
                    url: "mail.php", // куда отправляем
                    type: "post", // метод передачи
                    dataType: "json", // тип передачи данных
                    data: { // что отправляем
                        "user_name": userName,
                        "user_phone": userPhone,
                        "user_email": userEmail
                    },
                    // после получения ответа сервера
                    success: function(data){
                        let newUserName = '';
                        userName = Array.from(userName);
                        userName = userName.map((el, index) => {
                            if (index === 0) {
                                newUserName += userName[index].toUpperCase();
                            } else {
                                newUserName += userName[index];
                            }

                        });
                        document.querySelector('.callback__success-text span').textContent = newUserName;
                        $('.callback__submit').hide();
                        $('.callback__success').addClass('callback__success--show');
                    }
                });
            }
        });
    });

})();


