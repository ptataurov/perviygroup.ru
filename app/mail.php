<?php
	$msg_box = ""; // в этой переменной будем хранить сообщения формы

	$message .= "Имя пользователя: " . $_POST['user_name'] . "<br/>";
	$message .= "Телефон пользователя: " . $_POST['user_phone'] . "<br/>";
	$message .= "E-mail пользователя: " . $_POST['user_email'];
	send_mail($message); // отправим письмо


	// делаем ответ на клиентскую часть в формате JSON
	echo json_encode(array(
		'result' => $msg_box
	));


	// функция отправки письма
	function send_mail($message){
		// почта, на которую придет письмо
		$mail_to = "info@perviygroup.ru";
		// тема письма
		$subject = "Обратная связь";

		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Письмо с главного сайта <no-reply@test.com>\r\n"; // от кого письмо

		// отправляем письмо
		mail($mail_to, $subject, $message, $headers);
	}
