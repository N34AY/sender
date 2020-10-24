function sendLogToServer(account_id, type, message, subject, photo_id) {
    var data = {
        type: type,
        user_email: localStorage.getItem('exemail'),
        message: message,
        subject: subject,
        photo: photo_id,
        account: account_id,
    }
    let json = JSON.stringify(data);
    const options = { headers: { 'Content-Type': 'application/json' } }
    axios.post('https://ancrush.com/api/logging/add', json, options)
        .catch(error => console.warn('[Sender] failed to send logs'))
}