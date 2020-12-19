async function getMans() {
  try {
    const response = await axios.get('https://find-bride.com/api/v2/chat/get_online_new.json')
    var mansObj = response.data.content.online
    var mans = Object.values(mansObj).map(v => v)
    return mans
  } catch (error) {
    alert(`Failed to get mans: ${error}`)
  }
}

function updateMansValue(value) {
  document.getElementById('online').innerHTML = value
}
