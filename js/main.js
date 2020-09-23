// check auth function
async function check_auth() {
    const url = `https://n34ay.pp.ua/auth_check?id=${localStorage.correct_id}`
    await axios.get(url)
    .then((response) => {
        if (response.data.status == 'success') display_find_extension()
        else display_auth_failed_info()
    })
    .catch(response => display_auth_failed_info())
};

// get mans functions
function update_mans_value (value) {
    var indicator = document.getElementById('online');
    indicator.innerHTML = value;
};
function get_mans_online () {
    var request = new XMLHttpRequest();
    request.open( "GET", 'https://find-bride.com/api/v2/chat/get_online_new.json', false );
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                console.log('[Sender]: list of men received');
            } else {
                console.error('[Sender]: failed to get mans');
            }
        }
    };
    request.send();
    var data = JSON.parse(request.responseText);
    var list = data.content.online;
    var mans_array = [];
    for (var item in list) {
        var man = list[item];
        mans_array.push(man)
    }
    update_mans_value(mans_array.length);
    return mans_array;
};

// get girl photos
function get_photos () {
    var request = new XMLHttpRequest();
    request.open( "GET", 'https://find-bride.com/mess/photo', false );
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                console.log('[Sender]: photos OK');
            } else {
                console.log('[Sender]: photos FAIL');
            }
        }
    };
    request.send();
    const page = document.createElement('div');
    page.innerHTML = request.responseText;
    var photos_items = page.getElementsByClassName('item item-list');
    var photos_id = [];
    var photos_links = [];
    for (let i = 1; i < photos_items.length; i++) {
        var photo_id_text = photos_items[i].id;
        var photo_id = photo_id_text.replace('item_', '');
        var photo_elem = photos_items[i].getElementsByTagName('img');
        var photo_link = photo_elem[0].src;
        photos_id.push(photo_id);  
        photos_links.push(photo_link);  
    };
    var photos = []
    photos.push(photos_id)
    photos.push(photos_links)
    return photos;
};
function update_choosen_photo(img_link, img_id) {
    document.getElementById('choosen_photo').src = img_link;
    document.getElementById('choosen_photo').dataset.id = img_id;
}

window.onload = async function main() {
    //await check_auth();
    display_find_extension();
    // onclick choose img button
    document.getElementById('choose_photo_button').onclick = function () {
        photos = get_photos()
        document.getElementById("exmodal").style.display = "block";
        for (let i = 0; i < photos[0].length; i++) {
            var photo_prev = document.createElement('img');
            photo_prev.className = 'ex_girl_photo'
            photo_prev.dataset.id = photos[0][i];
            photo_prev.src = photos[1][i];
            document.getElementById("exmodal_content").appendChild(photo_prev);
        };
        document.getElementById("exmodal_content").addEventListener('click', function(e){
            if (e.target.dataset.id > 1) {
                var img_id = e.target.dataset.id;
                var img_link = e.target.src;
                document.getElementById("exmodal").style.display = 'none';
                choosen_photo_id = img_id;
                console.log(img_id); 
                update_choosen_photo(img_link, img_id);
            };
        });
    };
    // onclick modal close button
    document.getElementById("exmodal_close").onclick = function () {
        document.getElementById("exmodal").style.display = "none";
    };
    // run sender
    document.getElementById('start_button').onclick = function() {
        Notifications.sendMessStartNotify;
        var inner_text = document.getElementById('invite_input').value;
        var banned_val = document.getElementById('banned_input').value;
        var banned = banned_val.split(',');
        if (inner_text.length < 15) alert('Текст сообщения должен быть не менее 15 символов!')
        else {
            var time = new Date().toLocaleTimeString().slice(0,-3)
            document.getElementById('message_status').innerHTML = 'Запущена в: ' + time
            document.getElementById('message_status').className = 'run'
            startMessage(inner_text, banned)
            Notifications.sendMessStartNotify();
        }
    };
    document.getElementById('send_letter_button').onclick = function() {
        Notifications.sendLettersStartNotify;
        var inner_subject = document.getElementById('subject_input').value;
        var inner_text = document.getElementById('letter_input').value;
        var banned_val = document.getElementById('banned_input_letters').value;
        var banned = banned_val.split(',');
        var photo_id = document.getElementById('choosen_photo').dataset.id;
        console.log(typeof(photo_id));
        if (inner_subject.length < 5) alert('Тема письма должна быть не менее 5 символов!')
        else if (inner_text.length < 200 ) alert('Текст письма должен быть не менее 200 символов!')
        else if (photo_id === 'none') alert('Выберите фото для рассылки писем!')
        else {
            var time = new Date().toLocaleTimeString().slice(0,-3);
            document.getElementById('letters_status').innerHTML = 'Запущена в: ' + time;
            document.getElementById('letters_status').className = 'run';
            startLetter(inner_subject, inner_text, photo_id, banned);
            Notifications.sendLettersStartNotify();
        }
    };   
};

// like man
function likeMan(id) {
    const url = `https://find-bride.com/profile/addfriends/addMan/${id}?api=1`
    axios.get(url)
        .then(response => console.log('[Sender] like successs: ' + id))
        .catch(error => console.warn('[Sender] like failed'))
}

// messages sender
function sendMessage(id, text) {
    likeMan(id)
    var url = 'https://find-bride.com/chat/set_mess'
    var request = new XMLHttpRequest()
    var formData = new FormData()
    formData.append("w", "62")
    formData.append("correct_user", id)
    formData.append("text", text)
    formData.append("xsrf", "123")
    request.open("POST", url, true)
    //request.send(formData)
    sendLogToServer( 'test', 0, text )
};
function startMessage(inner_text, banned){
    var mans_array = get_mans_online()
    function send_with_timer(i) {
        while (inner_text.indexOf('{name}') != -1 || inner_text.indexOf('{age}') != -1) {
            var text_name = inner_text.replace('{name}', mans_array[i].n)
            var text = text_name.replace('{age}', mans_array[i].e)
            inner_text = text
        }
        if (banned.includes(mans_array[i].id) == false) setTimeout(() => { sendMessage(mans_array[i].id, inner_text) }, timer)
        else console.log('[Sender] banned man: ' + mans_array[i].id)
    }
    var timer = 0;
    for(var i = 0; i < mans_array.length; i++){
        send_with_timer(i)
        timer = timer + 1300
    }
    time = (mans_array.length * 1.3) * 1000
    setTimeout(() => {Notifications.sendMessFinishNotify(mans_array.length)}, time)
}

// letters sender
function use_synonyms(text) {
    function choose_random_word(string) {
        function random(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };
        var words = string.split(',');
        console.log('words: ' + words);
        var word = words[random(0, words.length)];
        console.log('word: ' + word);
        return word  
    };
    while (text.indexOf('{', 0) != -1) {
        var obrace = text.indexOf('{', 0);
        var cbrace = text.indexOf('}', 0);
        var synblock = text.substr(obrace, cbrace - obrace);
        synblock = synblock.replace('{', '')
        synblock = synblock.replace('}', '')
        var repword = choose_random_word(synblock);
        var text = text.replace('{' + synblock + '}', repword);
    };
    return text;  
};
function sendLetter(id, subject, text, photo_id) {
    likeMan(id)
    console.log(id)
    var url_template = 'https://find-bride.com/mess/send/all/{id}/1'
    var url = url_template.replace('{id}', id)
    var request = new XMLHttpRequest()
    var formData = new FormData()
    formData.append("is_autosave", "1")
    formData.append("go", 'Send')
    formData.append("form[value3]", subject)
    formData.append("form[value36]", photo_id)
    formData.append("real", text)
    request.open( "POST", url, false )
    request.send(formData)
};
function startLetter( inner_subject, inner_text, photo_id, banned ) {
    var mans_array = get_mans_online()
    function send_with_timer(i) {
        while (inner_text.indexOf('{name}') != -1 || inner_text.indexOf('{age}') != -1 || inner_subject.indexOf('{name}') != -1 || inner_subject.indexOf('{age}') != -1) {
            var text_name = inner_text.replace('{name}', mans_array[i].n)
            var text = text_name.replace('{age}', mans_array[i].e)
            var subject_name = inner_subject.replace('{name}', mans_array[i].n)
            var subject = subject_name.replace('{age}', mans_array[i].e)
            inner_subject = subject
            inner_text = text
        }
        text = use_synonyms(inner_text)
        if (banned.includes(mans_array[i].id) == false) setTimeout(() => { sendLetter(mans_array[i].id, inner_subject, inner_text, photo_id) }, timer)
        else console.log('[Sender] banned man: ' + mans_array[i].id)
    }
    var timer = 0
    for(var i = 0; i < mans_array.length; i++){
        send_with_timer(i)
        timer = timer + 3000
    }
    time = (mans_array.length * 1.3) * 1000
    setTimeout(() => {Notifications.sendLettersFinishNotify(mans_array.length)}, time)
}