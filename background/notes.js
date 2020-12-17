async function getAllNotes(account, manId) {
  const data = {
    "manId": manId,
    "account": account
  }
  const options = { headers: { 'Content-Type': 'application/json' } }

  try {
    const response = await axios.post(`${baseUrl}/api/notes/get`, data, options)
    return response.data.notes
  } catch (error) {
    console.log(error)
  }
}

function addNote(userEmail, account, manId, message) {
  const data = {
    userEmail: userEmail,
    manId: manId,
    account: account,
    message: message
  }
  const options = { headers: { 'Content-Type': 'application/json' } }

  try {
    axios.post(`${baseUrl}/api/notes/add`, data, options)
  } catch (error) {
    console.log(error)
  }
}

function removeNote(id) {
  try {
    axios.delete(`${baseUrl}/api/notes/remove/${id}`)
  } catch (error) {
    console.log(error)
  }
}


chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == 'notesService') {
    port.onMessage.addListener(async function (pm) {
      if (pm.getNotes && pm.manId && pm.account ) {
        const notes = await getAllNotes(pm.account, pm.manId)
        port.postMessage({ notes: notes })
      }

      if (pm.addNote && pm.manId && pm.account && pm.message && pm.userEmail) {
        addNote(pm.userEmail, pm.account, pm.manId, pm.message)
      }

      if (pm.removeNote && pm.noteId) {
        removeNote(pm.noteId)
      }
    })
  }
})
