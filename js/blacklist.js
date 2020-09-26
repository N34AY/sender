window.onload = function () {
    if ( (window.location.href).indexOf("find-bride.com/chat", 0) != -1 ) {
        getUserBlacklist()
        var user_id = localStorage.getItem('correct_id')
        var manIdElem = document.getElementById('correct_user_profile').href
        var manId = manIdElem.replace("https://find-bride.com/search/man_profile/all/", "")
        if (condition) {
            
        } else {
            
        }
        var buttonWhenBanned = `<div><span class='bl_icon_ban'></div>`
        var buttonWhenUnBanned = `<div><span class='bl_icon_ban'></div>`
        e[0].insertAdjacentHTML('beforeend', button)
        var manIdElem = document.getElementById('correct_user_profile').href
        var manId = manIdElem.replace("https://find-bride.com/search/man_profile/all/", "")

    }
}
// backlist funcs
function add_to_blacklist(mans) {
    const data = {
        "user_id": user_id,
        "mans": mans
    }
    const json = JSON.stringify(data)
    const url = `http://agency-stats.pp.ua/api/blacklist/add`
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post(url, json, options)
        .then(response => console.log('[Sender] mans was added to blacklist successfuly'))
        .catch(error => console.warn('[Sender] failed to add mans to blacklist'))
}
function remove_from_blacklist(mans) {
    var json = JSON.stringify(mans)
    const url = `http://agency-stats.pp.ua/api/blacklist/del`
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post(url, json, options)
        .then((response) => {
            if (response.data.status == 'success') display_find_extension()
            else display_auth_failed_info()
        })
        .catch(response => console.warn('[Sender] failed to remove mans from blacklist'))
}

function getUserBlacklist() {
    const url = `https://agency-stats.pp.ua/api/blacklist/44533`
    axios.get(url)
        .then((response) => {
            if (response.data.status == 'success') {
                for (const man in response.data.mans) {
                    console.log(man)
                }
            }
            else console.log('fdfd')
        })
        .catch(response => console.warn('[Sender] failed to remove mans from blacklist'))
}
