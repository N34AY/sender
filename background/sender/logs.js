function sendLogToServer(type, message, accountId, manId, subject, photoId) {
  var data = {
    type: type,
    userEmail: 'test@gmail.com',
    message: message,
    account: accountId,
    manId: manId,
    subject: subject,
    photo: photoId
  }
  const options = { headers: { 'Content-Type': 'application/json' } }

  try {
    axios.post(`${baseUrl}/api/logging/add`, data, options)
  } catch (error) {
    alert(`Failed to send log to the server: ${error}`)
  }
}
