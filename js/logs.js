function sendLogToServer(user_id, type, message, subject, photo_id) {
    var data = {
        user_id: user_id,
        type: type,
        message: message,
        subject: subject,
        photo_id: photo_id
    }
    let json = JSON.stringify(data);
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post('https://n34ay.pp.ua/loging/add.php', json, options)
        .catch(error => console.warn('[Sender] failed to send logs'))
}