
function get_photos () {
    var request = new XMLHttpRequest();
    request.open( "GET", 'https://find-bride.com/mess/show/all/1149670415', false );
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                console.log('[Sender]: OK');
            } else {
                console.log('[Sender]: failed to get mans');
            }
        }
    };
    request.send();
    const page = document.createElement('div');
    page.innerHTML = request.responseText;
    var photos_elements = page.getElementsByClassName('photo photo-preview');
    var photos = [];
    for (let i = 0; i < photos_elements.length; i++) {
        var photo = photos_elements[i].dataset.id;
        photos.push(photo);  
    };
    return photos;
};



window.onload = function auth_check() {
    var id = localStorage.correct_id;
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var request = new XHR();
    var url = 'https://n34ay.pp.ua/auth_check?id=' + id;
    request.withCredentials = false;
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 'success') {
                var mans = get_mans_value();
                var menu_elems = document.getElementsByClassName('block-menu-container clearfix');
                var last_menu_elem = menu_elems[menu_elems.length - 1];
                // create extension div
                var extension = document.createElement('div');
                extension.id = "extension";
                extension.style.width = '240px';
                //
                var hr0 = document.createElement('hr');
                // create header
                var header = document.createElement('h3');
                header.innerHTML = "Онлайн: <span id='online'></span>";
                header.style.width = '240px';
                //
                var hr1 = document.createElement('hr');
                // c
                var messages_header = document.createElement('h3');
                messages_header.innerHTML = "Чаты:";
                messages_header.style.width = '240px';
                // create invite input
                var invite_input = document.createElement('input');
                invite_input.id = "invite_input";
                invite_input.type = "text";
                invite_input.placeholder = "Ваш инвайт";
                invite_input.style.width = '240px';
                // create invite text
                var invite_text = document.createElement('p');
                invite_text.innerHTML = "Введите инвайт";
                invite_text.style.width = '240px';
                // create banned list input
                var banned_input = document.createElement('input');
                banned_input.id = "banned_input";
                banned_input.type = "text";
                banned_input.placeholder = "54635,3434,4344,54634...";
                banned_input.style.width = '240px';
                // create banned text
                var banned_text = document.createElement('p');
                banned_text.innerHTML = "Черный список";
                banned_text.style.width = '240px';
                // create limit input
                var limit_input = document.createElement('input');
                limit_input.id = "limit_input";
                limit_input.type = "number";
                limit_input.min = "0";
                limit_input.placeholder = mans;
                limit_input.style.width = '60px';
                // create start button
                var button = document.createElement('input');
                button.id = "start_button";
                button.type = 'button';
                button.value = 'ЗАПУСК'
                button.style.width = '180px';
                // create message status block
                var message_status = document.createElement('h5');
                message_status.innerHTML = "Статус: <span id='message_status'></span>";
                message_status.style.width = '240px';
                //
                var hr2 = document.createElement('hr');
                // create letters header
                var letters_header = document.createElement('h3');
                letters_header.innerHTML = "Письма:";
                letters_header.style.width = '240px';
                // create letter input
                var letter_input = document.createElement('input');
                letter_input.id = "letter_input";
                letter_input.type = "text";
                letter_input.placeholder = "Ваше сообщение";
                letter_input.style.width = '240px';
                // create letter text
                var letter_text = document.createElement('p');
                letter_text.innerHTML = "Введите текст письма";
                letter_text.style.width = '240px';
                // create letter subject input
                var letter_subject_input = document.createElement('input');
                letter_subject_input.id = "letter_subject";
                letter_subject_input.type = "text";
                letter_subject_input.placeholder = "Тема письма";
                letter_subject_input.style.width = '240px';
                // create letter text
                var letter_subject_label = document.createElement('p');
                letter_subject_label.innerHTML = "Введите тему письма";
                letter_subject_label.style.width = '240px';
                // create banned list input for letters
                var banned_input_letters = document.createElement('input');
                banned_input_letters.id = "banned_input_letters";
                banned_input_letters.type = "text";
                banned_input_letters.placeholder = "54635,3434,4344,54634...";
                banned_input_letters.style.width = '240px';
                // create banned text for letters
                var banned_text_letters = document.createElement('p');
                banned_text_letters.innerHTML = "Черный список";
                banned_text_letters.style.width = '240px';
                // image
                var choose_img_btn = document.createElement('input');
                choose_img_btn.type = 'button';
                choose_img_btn.value = "Выбрать фото";
                choose_img_btn.style.width = '240px';
                // create limit input for letters
                var letters_limit_input = document.createElement('input');
                letters_limit_input.id = "letters_limit_input";
                letters_limit_input.type = "number";
                letters_limit_input.min = "0";
                letters_limit_input.placeholder = mans;
                letters_limit_input.style.width = '60px';
                // create send_letter_button
                var send_letter = document.createElement('input');
                send_letter.id = "send_letter_button";
                send_letter.type = 'button';
                send_letter.value = 'Слать письмо'
                send_letter.style.width = '180px';
                // create letter status block
                var letter_status = document.createElement('h5');
                letter_status.innerHTML = "Статус: <span id='letter_status'></span>";
                letter_status.style.width = '240px';
                // constructor
                last_menu_elem.appendChild(extension);
                extension.appendChild(hr0);
                extension.appendChild(header);
                document.getElementById('online').innerHTML = mans;
                extension.appendChild(hr1);
                extension.appendChild(messages_header);
                extension.appendChild(invite_input);
                extension.appendChild(invite_text);
                extension.appendChild(banned_input);
                extension.appendChild(banned_text);
                extension.appendChild(limit_input);
                extension.appendChild(button);
                extension.appendChild(message_status);
                extension.appendChild(hr2);
                document.getElementById('message_status').innerHTML = 'Не запущена';
                extension.appendChild(letters_header);
                extension.appendChild(letter_subject_input);
                extension.appendChild(letter_subject_label);
                extension.appendChild(letter_input);
                extension.appendChild(letter_text);
                extension.appendChild(banned_input_letters);
                extension.appendChild(banned_text_letters);
                extension.appendChild(choose_img_btn);
                extension.appendChild(letters_limit_input);
                extension.appendChild(send_letter);
                extension.appendChild(letter_status);
                document.getElementById('letter_status').innerHTML = 'Не запущена';
                var button = document.getElementById('start_button');
                var place = document.getElementsByTagName('body')[0];
                //
                var html = "<div class='exmodal' id='exmodal' style='display: none; z-index: 999999999; width: 500px; height: 700px;'><div class='exmodal_content' id='exmodal_content'><h1>modal window</h1><span class='exmodal_close' id='exmodal_close'>X</span></div></div>"
                /*
                var exmodal = document.createElement('div');
                exmodal.id = "exmodal";
                exmodal.className = 'exmodal';
                exmodal.style.display = 'none';
                exmodal.style.zIndex = '9999999999999999';
                exmodal.style.width = '500px';
                exmodal.style.height = '700px'
                exmodal.style.backgroundColor = 'white';
                exmodal.style.position = 'absolute';
                exmodal.style.overflow = 'auto';
                exmodal.style.left = '50%';
                exmodal.style.right = '50%';
                var exmodal_content = document.createElement('div');
                exmodal_content.id = "exmodal_content";
                exmodal_content.className = 'exmodal_content';
                var exmodal_close = document.createElement('span');
                exmodal_close.id = "exmodal_close";
                exmodal_close.className = 'exmodal_close';
                */
                //
                place.insertAdjacentHTML('afterBegin', html);
                //
                var exmodal_window = document.getElementById("exmodal");
                exmodal_window.appendChild(exmodal_content);
                var exmodal_content_window = document.getElementById("exmodal_content");
                exmodal_content_window.appendChild(exmodal_close);
                var exmodal_close_btn = document.getElementById("exmodal_close");

                choose_img_btn.onclick = function () {
                    photos = get_photos();
                    exmodal_window.style.display = "block";
                };
                exmodal_close_btn.onclick = function () {
                    exmodal_window.style.display = "none";
                };
                window.onclick = function (event) {
                    if (event.target == exmodal_window) {
                        exmodal_window.style.display = "none";
                    }
                };
                button.onclick = function() {
                    var inner_text = document.getElementById('invite_input').value;
                    var banned_val = document.getElementById('banned_input').value;
                    var limit = document.getElementById('limit_input').value;
                    var banned = banned_val.split(',');
                    if (inner_text.length < 15) {
                        alert('Текст сообщения должен быть не менее 15 символов!');
                    } else if (limit.length == 0) {
                        alert('Введите количество итераций для рассылки сообщений!');
                    } else {
                        document.getElementById('message_status').innerHTML = 'Запущена';
                        start_message(inner_text, banned, limit);
                    }
                };
                var send_letter_button = document.getElementById('send_letter_button');
                send_letter_button.onclick = function() {
                    var inner_subject = document.getElementById('letter_subject').value;
                    var inner_text = document.getElementById('letter_input').value;
                    console.log(inner_subject.length + '    ' + inner_text.length);
                    var banned_val = document.getElementById('banned_input_letters').value;
                    var limit = document.getElementById('letters_limit_input').value;
                    var banned = banned_val.split(',');
                    if (inner_subject.length < 5) {
                        alert('Тема письма должна быть не менее 5 символов!');
                    } else if (inner_text.length < 200 ) {
                        alert('Текст письма должен быть не менее 200 символов!');
                    } else if (limit.length == 0) {
                        alert('Введите количество итераций для рассылки писем!');
                    } else {
                        document.getElementById('letter_status').innerHTML = 'Запущена';
                        start_letter(inner_subject, inner_text, banned, limit);
                    }
                };   
            } else {
                alert('Хуй тебе, большой!')
            }
        } else {
            return false
        }
    };
    request.open( "GET", url, true );
    request.send();
};

function send_message(id, text) {
    var url = 'https://find-bride.com/chat/set_mess';
    var request = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("w", "62");
    formData.append("correct_user", id);
    formData.append("text", text);
    formData.append("xsrf", "123");
    request.open( "POST", url, true );
    request.send(formData);
};

function send_letter(id, subject, text) {
    console.log(id);
    var url_template = 'https://find-bride.com/mess/send/all/{id}/1';
    var url = url_template.replace('{id}', id);
    var request = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("is_autosave", "1");
    formData.append("go", 'Send');
    formData.append("form[value3]", subject);
    formData.append("real", text);
    request.open( "POST", url, false );
    request.send(formData);
};

function get_mans(url, limit) {
    var request = new XMLHttpRequest();
    url = url + limit;
    request.open( "POST", url, false );
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                console.log('[Sender]: OK');
            } else {
                console.log('[Sender]: failed to get mans');
            }
        }
    };
    request.send();
    return request.responseText;
};

function get_mans_value() {
    var request = new XMLHttpRequest();
    request.open( "POST", 'https://find-bride.com/search/advanced?&ajax=1&offset=12&online=1&limit=999999999', false );
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                console.log('[Sender]: OK');
            } else {
                console.log('[Sender]: failed to get mans');
            }
        }
    };
    request.send();
    const page = document.createElement('div');
    page.innerHTML = request.responseText;
    console.log(page);
    var carusel = page.getElementsByClassName('girl-like');
    console.log(carusel.length);
    return carusel.length;
};

function message_send_complete() {
    var snd = new Audio("https://freesound.org/data/previews/337/337049_3232293-lq.mp3");
    snd.play();
    document.getElementById('message_status').innerHTML = 'Завершена';
};

function start_message(inner_text, banned, limit){
    response = get_mans('https://find-bride.com/search/advanced?&ajax=1&offset=12&online=1&limit=', limit);
    const page = document.createElement('div');
    page.innerHTML = response;
    var carusel = page.getElementsByClassName('girl-like');
    var info_block = page.getElementsByClassName('info');
    function send_with_timer(i) {
        var id = carusel[i].dataset.id;
        var name = info_block[i].textContent.split(', ', 1);
        var age = info_block[i].textContent.split(', ')[1];
        var text_name = inner_text.replace('{name}', name);
        var text = text_name.replace('{age}', age);
        if (banned.includes(id) == false) {
            setTimeout(() => {send_message(id, text);}, timer);
        } else {
            console.log('[Sender] banned man: ' + id);
        }
    };
    var timer = 0;
    for(var i = 0; i < carusel.length; i++){
        send_with_timer(i);
        timer = timer + 1300;
    };
    message_send_complete();
};

function start_letter(inner_subject, inner_text, banned, limit) {
    response = get_mans('https://find-bride.com/search/advanced?&ajax=1&offset=12&online=1&limit=', limit);
    const page = document.createElement('div');
    page.innerHTML = response;
    var carusel = page.getElementsByClassName('girl-like');
    var info_block = page.getElementsByClassName('info');
    function send_with_timer(i) {
        var id = carusel[i].dataset.id;
        var name = info_block[i].textContent.split(', ', 1);
        var age = info_block[i].textContent.split(', ')[1];
        var text_name = inner_text.replace('{name}', name);
        var text = text_name.replace('{age}', age);
        var subject_name = inner_subject.replace('{name}', name);
        var subject = subject_name.replace('{age}', age);
        if (banned.includes(id) == false) {
            setTimeout(() => {send_letter(id, subject, text);}, timer);
        } else {
            console.log('[Sender] banned man: ' + id);
        }
    };
    var timer = 0;
    for(var i = 0; i < carusel.length; i++){
        send_with_timer(i);
        timer = timer + 3000;

    };
    var snd = new Audio("https://freesound.org/data/previews/337/337049_3232293-lq.mp3");
    snd.play();
    document.getElementById('letter_status').innerHTML = 'Завершена';
};

/*
var exmodal = document.createElement('div');
exmodal.id = "exmodal";
exmodal.className = 'exmodal';
exmodal.style.display = 'none';
exmodal.style.zIndex = '9999999999999999';
exmodal.style.width = '500px';
exmodal.style.height = '700px'
exmodal.style.backgroundColor = 'white';
exmodal.style.position = 'absolute';
exmodal.style.overflow = 'auto';
exmodal.style.left = '50%';
exmodal.style.right = '50%';
var exmodal_content = document.createElement('div');
exmodal_content.id = "exmodal_content";
exmodal_content.className = 'exmodal_content';
var exmodal_close = document.createElement('span');
exmodal_close.id = "exmodal_close";
exmodal_close.className = 'exmodal_close';
//
place.appendChild(exmodal);


<div class='exmodal' id='exmodal' style='display: none; z-index: 999999999; width: 500px; height: 700px;'>
    <div class='exmodal_content' id='exmodal_content'>
        <h1>modal window</h1>
        <span class='exmodal_close' id='exmodal_close'>X</span>
    </div>
</div>
*/