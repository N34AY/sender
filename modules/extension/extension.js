const extension_window = `
<div id='extension'>
    <hr>
    <h3 class='exheader'>Онлайн: <span id='online'></span></h3>
    <hr>
    <h3 class='exheader'>Чаты:</h3>
    <input id='inviteInput' type='text' placeholder='Ваш инвайт'>
    <p class='exlabel'>Введите инвайт</p>
    <input id='bannedInput' type='text' placeholder='54635,3434,4344,54634...'>
    <p class='exlabel'>Черный список</p>
    <input id='startButton' value='Запуск' type='button'>
    <h5 id='messages_status'>Статус: <span id='messageStatus' class='sleep'>Не запущено</span></h5>
    <hr>
    <h3 class='exheader'>Письма:</h3>
    <input id='subjectInput' type='text' placeholder='Тема письма'>
    <p class='exlabel'>Введите тему письма</p>
    <textarea id='letterInput' placeholder='Ваше сообщение'></textarea>
    <p class='exlabel'>Введите текст письма</p>
    <input id='bannedInputLetters' type='text' placeholder='54635,3434,4344,54634...'>
    <p class='exlabel'>Черный список</p>
    <input id='sendLetterButton' value='Запуск' type='button'>
    <h5 id='lettersStatus'>Статус: <span id='letterStatus'>Не запущено</span></h5>
    <img class='choosen_image' id='choosenPhoto' data-id='none'>
    <input id='apppp' value='strat' type='button'>
</div>`

function displayFindExtension () {
    var menu_elems = document.getElementsByClassName('block-menu-container clearfix')
    var last_menu_elem = menu_elems[menu_elems.length - 1]
    last_menu_elem.insertAdjacentHTML('afterBegin', extension_window)
    getMansOnline()


    document.getElementById("apppp").onclick = function(){
        Swal.fire({
            title: 'Рассылка писем',
            html: `<label for="subjectInput">Введите тему письма</label>
                <input type="text" id="subjectInput" class="swal2-input" placeholder="Тема письма">   
                <label for="letterInput">Ведите текст письма</label>
                <textarea type="text" id="letterInput" class="swal2-textarea" placeholder="Ваше сообщение"></textarea>`,
            width: 1000,
            confirmButtonText: 'Войти',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Выбрать фото',
            cancelButtonText: 'Отмена',
            focusConfirm: false,
            preConfirm: () => {
              const subject = Swal.getPopup().querySelector('#subjectInput').value
              const message = Swal.getPopup().querySelector('#letterInput').value
              if (!subject || !message) {
                Swal.showValidationMessage(`Пожалуйста введите email и пароль`)
              }
              return { subject: subject, message: message }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                renderPhotos()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire().close()
            }
        })
    }
}