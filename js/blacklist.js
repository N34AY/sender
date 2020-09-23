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
    var json = JSON.stringify(mans)
    const url = `https://n34ay.pp.ua/remove_from_blacklist?user_id=${user_id}`
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post(url, json, options)
        .then(response => console.log('[Sender] mans removed from backlist successfuly '))
        .catch(response => console.warn('[Sender] failed to remove mans from blacklist'))
}