// backlist funcs
function add_to_blacklist(mans) {
    const user_id = localStorage.getItem('correct_id')
    const json = JSON.stringify(mans)
    const url = `https://n34ay.pp.ua/add_to_blacklist?user_id=${user_id}`
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post(url, json, options)
        .then(response => console.log('[Sender] mans was added to blacklist successfuly'))
        .catch(error => console.warn('[Sender] failed to add mans to blacklist'))
}
function remove_from_blacklist(mans) {
    var user_id = localStorage.getItem('correct_id')
    var json = JSON.stringify(mans);
    const url = `https://n34ay.pp.ua/remove_from_blacklist?user_id=${user_id}`
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post(url, json, options)
        .then(response => console.log('[Sender] mans removed from backlist successfuly '))
        .catch(response => console.warn('[Sender] failed to remove mans from blacklist'))
};

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
    axios.get('https://find-bride.com/mess/photo')
        .then((response) => {
            const page = document.createElement('div');
            page.innerHTML = response.responseText;
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
        })
        .catch(error => console.error('[Sender] failed to get photos'))
};
function update_choosen_photo(img_link, img_id) {
    document.getElementById('choosen_photo').src = img_link;
    document.getElementById('choosen_photo').dataset.id = img_id;
}

window.onload = async function main() {
    //await check_auth();
    console.log('11111111');
    display_find_extension();
    // onclick choose img button
    document.getElementById('choose_photo_button').onclick = function () {
        photos = get_photos();
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
            start_message(inner_text, banned)
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
            start_letter(inner_subject, inner_text, photo_id, banned);
            Notifications.sendLettersStartNotify();
        }
    };   
};

// like man
function like_man(id) {
    const url = `https://find-bride.com/profile/addfriends/addMan/${id}?api=1`
    axios.get(url)
        .then(response => console.log('[Sender] like successs: ' + id))
        .catch(error => console.warn('[Sender] like failed'))
}

// messages sender
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
function start_message(inner_text, banned){
    var mans_array = get_mans_online();
    function send_with_timer(i) {
        var id = mans_array[i].id;
        var name = mans_array[i].n;
        var age = mans_array[i].e;
        var text_name = inner_text.replace('{name}', name);
        var text = text_name.replace('{age}', age);
        if (banned.includes(id) == false) setTimeout(() => {
            send_message(id, text);
            like_man(id);
        }, timer)
        else console.log('[Sender] banned man: ' + id)
    };
    var timer = 0;
    for(var i = 0; i < mans_array.length; i++){
        send_with_timer(i);
        timer = timer + 1300;
    };
    time = (mans_array.length * 1.3) * 1000;
    setTimeout(() => {Notifications.sendMessFinishNotify(mans_array.length);}, time);
};

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
function send_letter(id, subject, text, photo_id) {
    console.log(id);
    var url_template = 'https://find-bride.com/mess/send/all/{id}/1';
    var url = url_template.replace('{id}', id);
    var request = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("is_autosave", "1");
    formData.append("go", 'Send');
    formData.append("form[value3]", subject);
    formData.append("form[value36]", photo_id);
    formData.append("real", text);
    request.open( "POST", url, false );
    request.send(formData);
};
function start_letter(inner_subject, inner_text, photo_id, banned) {
    var mans_array = get_mans_online();
    function send_with_timer(i) {
        var id = mans_array[i].id;
        var name = mans_array[i].n;
        var age = mans_array[i].e;
        var text_name = inner_text.replace('{name}', name);
        var text = text_name.replace('{age}', age);
        var subject_name = inner_subject.replace('{name}', name);
        var subject = subject_name.replace('{age}', age);
        text = use_synonyms(text);
        if (banned.includes(id) == false) setTimeout(() => {
            send_letter(id, subject, text, photo_id);
            like_man(id);
        }, timer)
        else console.log('[Sender] banned man: ' + id)
    };
    var timer = 0;
    for(var i = 0; i < mans_array.length; i++){
        send_with_timer(i);
        timer = timer + 3000;
    };
    time = (mans_array.length * 1.3) * 1000;
    setTimeout(() => {Notifications.sendLettersFinishNotify(mans_array.length)}, time);
};

function sendLogToServer(user_id, type, subject, message, photo_id) {
    var data = {
        user_id: user_id,
        type: type,
        subject: subject,
        message: message,
        photo_id: photo_id
    }
    let json = JSON.stringify(data);
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post('n34ay.pp.ua/loging/add.php', json, options)
        .catch(error => console.warn('[Sender] failed to send logs'))
}