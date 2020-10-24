const loginWindow = `
<div class='ex_login'>
    <hr>
    <h3>Авторизируйтесь<h3>
    <p class='exlabel'>Введите email</p>
    <input id='exemail' type='text' placeholder='email'>
    <p class='exlabel'>Введите пароль</p>
    <input id='expassword' type='password' placeholder='password'>
    <br>
    <input id='loginButton'value='Войти' type='button'>
    <hr>
</div>`
const auth_failed_window = `
<div class='auth_failed'>
    <hr>
    <h3>Ошибка авторизации<h3>
    <h4>Свяжитесь с Вашим<h4>
    <h4>Администратором<h4>
    <hr>
</div>`
const extension_window = `
<div id='extension'>
    <hr>
    <h3 class='exheader'>Онлайн: <span id='online'></span></h3>
    <hr>
    <h3 class='exheader'>Чаты:</h3>
    <input id='invite_input' type='text' placeholder='Ваш инвайт'>
    <p class='exlabel'>Введите инвайт</p>
    <input id='banned_input' type='text' placeholder='54635,3434,4344,54634...'>
    <p class='exlabel'>Черный список</p>
    <input id='start_button' value='Запуск' type='button'>
    <h5 id='messages_status'>Статус: <span id='message_status' class='sleep'>Не запущено</span></h5>
    <hr>
    <h3 class='exheader'>Письма:</h3>
    <input id='subject_input' type='text' placeholder='Тема письма'>
    <p class='exlabel'>Введите тему письма</p>
    <textarea id='letter_input' placeholder='Ваше сообщение'></textarea>
    <p class='exlabel'>Введите текст письма</p>
    <input id='banned_input_letters' type='text' placeholder='54635,3434,4344,54634...'>
    <p class='exlabel'>Черный список</p>
    <input id='choose_photo_button' value='Выбрать фото' type='button'>
    <input id='send_letter_button' value='Запуск' type='button'>
    <h5 id='letters_status'>Статус: <span id='letter_status'>Не запущено</span></h5>
    <img class='choosen_image' id='choosen_photo' data-id='none'>
</div>`
const extension_modal = `
<div id='exmodal'>
    <div id='exmodal_header'>
        <h2 id='exmodaltext'>Нажмите на фото</h2>
        <h2 id='exmodal_close'>X</h2>
    </div>
    <div id='exmodal_content'>
    </div>
</div>`
// display extension window function
function displayLoginWindow () {
    var menu_elems = document.getElementsByClassName('block-menu-container clearfix')
    var last_menu_elem = menu_elems[menu_elems.length - 1]
    last_menu_elem.insertAdjacentHTML('afterBegin', loginWindow)
}
function display_find_extension () {
    var menu_elems = document.getElementsByClassName('block-menu-container clearfix')
    var last_menu_elem = menu_elems[menu_elems.length - 1]
    last_menu_elem.insertAdjacentHTML('afterBegin', extension_window)
    get_mans_online()
    var place = document.getElementsByTagName('body')[0]
    place.insertAdjacentHTML('afterBegin', extension_modal)
}
function display_auth_failed_info () {
    var menu_elems = document.getElementsByClassName('block-menu-container clearfix')
    var last_menu_elem = menu_elems[menu_elems.length - 1]
    last_menu_elem.insertAdjacentHTML('afterBegin', auth_failed_window)
}