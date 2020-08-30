<?php
header("Status: 200");
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
?>
<div id='extension'>
    <hr>
    <h3 class='exheader'>Онлайн: <span id='online'></span></h3>
    <hr>
    <h3 class='exheader'>Чаты:</h3>
    <input id='invite_input' type='text' placeholder='Ваш инвайт'>
    <p class='exlabel'>Введите инвайт</p>
    <input id='banned_input' type='text' placeholder='54635,3434,4344,54634...'>
    <p class='exlabel'>Черный список</p>
    <input id='limit_input' type='number' min=0>
    <input id='start_button' value='Запуск' type='button'>
    <h5 id='messages_status'>Статус: <span id='message_status'></span></h5>
    <hr>
    <h3 class='exheader'>Письма:</h3>
    <input id='subject_input' type='text' placeholder='Тема письма'>
    <p class='exlabel'>Введите тему письма</p>
    <input id='letter_input' type='text' placeholder='Ваше сообщение'>
    <p class='exlabel'>Введите текст письма</p>
    <input id='banned_input_letters' type='text' placeholder='54635,3434,4344,54634...'>
    <p class='exlabel'>Введите текст письма</p>
    <p class='exlabel'>Черный список</p>
    <input id='choose_photo_button' value='Выбрать фото' type='button'>
    <input id='letters_limit_input' type='number' min=0>
    <input id='send_letter_button' value='Запуск' type='button'>
    <h5 id='letters_status'>Статус: <span id='letter_status'></span></h5>
</div>