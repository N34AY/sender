async function auth_check() {
    var id = localStorage.correct_id;
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var request = new XHR();
    var url = 'https://n34ay.pp.ua/auth_check?id=' + id;
    request.withCredentials = false;
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 'success') {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    };
    request.open( "GET", url, true );
    request.send();
};

window.onload = async function()
{   
    if (auth_check()) {
        var mans = get_mans_value('https://find-bride.com/search/advanced?&ajax=1&offset=12&online=1&limit=999999999');
        var menu_elems = document.getElementsByClassName('block-menu-container clearfix');
        var last_menu_elem = menu_elems[menu_elems.length - 1];
        // create extension div
        var extension = document.createElement('div');
        extension.id = "extension";
        extension.style.width = '240px';
        // create header
        var header = document.createElement('h3');
        header.innerHTML = "Онлайн: <span id='online'></span>";
        header.style.width = '240px';
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
        extension.appendChild(header);
        document.getElementById('online').innerHTML = mans;
        extension.appendChild(invite_input);
        extension.appendChild(invite_text);
        extension.appendChild(banned_input);
        extension.appendChild(banned_text);
        extension.appendChild(limit_input);
        extension.appendChild(button);
        extension.appendChild(message_status);
        document.getElementById('message_status').innerHTML = 'Не запущена';
        extension.appendChild(letters_header);
        extension.appendChild(letter_input);
        extension.appendChild(letter_text);
        extension.appendChild(banned_input_letters);
        extension.appendChild(banned_text_letters);
        extension.appendChild(letters_limit_input);
        extension.appendChild(send_letter);
        extension.appendChild(letter_status);
        document.getElementById('letter_status').innerHTML = 'Не запущена';
        var button = document.getElementById('start_button');
        button.onclick = function() {
            var invite = document.getElementById('invite_input').value;
            var banned_val = document.getElementById('banned_input').value;
            var limit = document.getElementById('limit_input').value;
            var banned = banned_val.split(',');
            if (invite == '') {
                alert('Введите инвайт');
            }
            else {
                document.getElementById('message_status').innerHTML = 'Запущена';
                //alert('Рассылка запущена!');
                start_message(invite, banned, limit);
            }
        };
        var send_letter_button = document.getElementById('send_letter_button');
        send_letter_button.onclick = function() {
            var letter = document.getElementById('letter_input').value;
            var banned_val = document.getElementById('banned_input_letters').value;
            var limit = document.getElementById('letters_limit_input').value;
            var banned = banned_val.split(',');
            if (letter == '') {
                alert('Введите инвайт');
            }
            else {
                document.getElementById('letter_status').innerHTML = 'Запущена';
                alert('Рассылка запущена!');
                start_letter(letter, banned, limit);
            }
        };        
    } else {
        console.log('хуй тебе');
    }
};

function send_message(id, text)
{
    //console.log(id);
    var url = 'https://find-bride.com/chat/set_mess';
    var request = new XMLHttpRequest();
    //request.timeout = 20000;
    var formData = new FormData();
    formData.append("w", "62");
    formData.append("correct_user", id);
    formData.append("text", text);
    formData.append("xsrf", "123");
    request.open( "POST", url, true );
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                console.log('message delivered');
            } else {
                console.log('message deivery failed');
            }
        }
    };
    request.send(formData);
    return console.log(request.status);

};

function send_letter(id, text)
{
    console.log(id);
    var url_template = 'https://find-bride.com/mess/send/all/{id}/1';
    var url = url_template.replace('{id}', id);
    var request = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("is_autosave", "1");
    formData.append("go", 'Send');
    formData.append("real", text);
    request.open( "POST", url, false );
    request.send(formData);
    return console.log(request.status);

};

function get_mans(url, limit)
{
    var request = new XMLHttpRequest();
    url = url + limit;
    request.open( "POST", url, false );
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                console.log('[Sender]: get mans success');
            } else {
                console.log('[Sender]: failed to get mans');
            }
        }
    };
    request.send();
    return request.responseText;
};

function get_mans_value(url)
{
    var request = new XMLHttpRequest();
    request.open( "POST", url, true );
    request.send();
    const page = document.createElement('div');
    page.innerHTML = request.responseText;
    var carusel = page.getElementsByClassName('girl-like');
    return carusel.length;
};

function start_message(invite, banned, limit)
{
    response = get_mans('https://find-bride.com/search/advanced?&ajax=1&offset=12&online=1&limit=', limit);
    const page = document.createElement('div');
    page.innerHTML = response;
    var carusel = page.getElementsByClassName('girl-like');
    var info_block = page.getElementsByClassName('info');
    console.log(info_block);
    /**
    for(var i = 0; i < carusel.length; i++){
        var id = carusel[i].dataset.id;
        var name = info_block[i].textContent.split(', ', 1);
        var age = info_block[i].textContent.split(', ')[1];
        var text_man = invite.replace('{name}', name);
        var text = text_man.replace('{age}', age);
        if (banned.includes(id) == false) {
            setTimeout(() => {
                send_message(id, text);  
            }, 20000);
        }
        else {
            console.log('banned man');
        }
    };
    */
    var timer = 0;
    for(var i = 0; i < carusel.length; i++){
        var id = carusel[i].dataset.id;
        var name = info_block[i].textContent.split(', ', 1);
        var age = info_block[i].textContent.split(', ')[1];
        var text_man = invite.replace('{name}', name);
        var text = text_man.replace('{age}', age);
        if (banned.includes(id) == false) {
            timer = timer + 1300;
            setTimeout(() => {
                send_message(id, text);  
            }, timer);
        }
        else {
            console.log('banned man');
        }
    };
    var snd = new Audio("https://freesound.org/data/previews/337/337049_3232293-lq.mp3");
    snd.play();
    document.getElementById('message_status').innerHTML = 'Завершена';
    //alert('Рассылка завершена!');
};

function start_letter(invite, banned, limit)
{
    response = get_mans('https://find-bride.com/search/advanced?&ajax=1&offset=12&online=1&limit=', limit);
    const page = document.createElement('div');
    page.innerHTML = response;
    var carusel = page.getElementsByClassName('girl-like');
    var info_block = page.getElementsByClassName('info');
    console.log(info_block);
    for(var i = 0; i < carusel.length; i++){
        var id = carusel[i].dataset.id;
        var name = info_block[i].textContent.split(', ', 1);
        var age = info_block[i].textContent.split(', ')[1];
        var text_man = invite.replace('{name}', name);
        var text = text_man.replace('{age}', age);
        //console.log(name, age);
        if (banned.includes(id) == false) {
            timer = timer + 3000;
            setTimeout(() => {
                send_letter(id, invite);
            }, timer);
        }
        else {
            console.log('banned man');
        }
    };
    var snd = new Audio("https://freesound.org/data/previews/337/337049_3232293-lq.mp3");
    snd.play();
    document.getElementById('letter_status').innerHTML = 'Завершена';
    //alert('Рассылка завершена!');
};
