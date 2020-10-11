function sendLogToServer(account_id, type, message, subject, photo_id) {
    var data = {
        account_id: account_id,
        type: type,
        message: message,
        subject: subject,
        photo_id: photo_id
    }
    let json = JSON.stringify(data);
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post('https://ancrush.com/api/logging/add', json, options)
        .catch(error => console.warn('[Sender] failed to send logs'))
}