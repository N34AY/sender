function displayNotesButton() {
  const profileSidebar = document.getElementsByClassName('profile-sidebar')
  const notesButton = `<button type="button" id="allNotesBtn" class="ex_btn btn btn-primary">
                          All notes &nbsp;
                          <i class="fa fa-book" aria-hidden="true"></i>
                        </button>`
  profileSidebar[0].insertAdjacentHTML("beforeend", notesButton)
}
function displayAddNoteButton() {
  const profileSidebar = document.getElementsByClassName('profile-sidebar')
  const addNoteButton = `<button type="button" id="addNoteBtn" class="ex_btn btn btn-success">
                          New note &nbsp;
                          <i class="fa fa-comment" aria-hidden="true"></i>
                        </button>`
  profileSidebar[0].insertAdjacentHTML("beforeend", addNoteButton)
}


displayNotesButton()
displayAddNoteButton()
const notesPort = chrome.runtime.connect({ name: "notesService" })


document.getElementById('addNoteBtn').onclick = function() {
  const html = `<div class="container text-left">
                  <div class="form-outline mb-4">
                    <textarea class="form-control" id="noteInput" rows="4"></textarea>
                    <label class="form-label" for="noteInput">Enter your note msg</label>
                  </div>
                </div>`
  Swal.fire({
    title: 'Add note',
    html: html,
    width: "40%",
    showCloseButton: true,
    confirmButtonText: 'Add',
    preConfirm: () => {
      const noteText = Swal.getPopup().querySelector('#noteInput').value
      if (!noteText) Swal.showValidationMessage(`Пожалуйста введите noteText`)
      notesPort.postMessage({ addNote: true, userEmail: 'test@gmail.com', manId: getManId(), account: getAccountId(), message: noteText })
    }
  })
}

document.getElementById('allNotesBtn').onclick = function() {
  notesPort.postMessage({ getNotes: true, manId: getManId(), account: getAccountId() })
  notesPort.onMessage.addListener(function (pm) {
    if (!pm.notes) alert('get notes fail')

    let noteCards = ''
    pm.notes.forEach(note => {
      let date = new Date(note.createdAt)   
      let noteCard = `<div class="note_card">
                        <p>User: ${note.userEmail}</p>
                        <p>Created: ${date.toLocaleString()}</p>
                        <p>Message: ${note.message}</p>
                        <button type="button" data-id="${note.id}" class="note_del_btn btn btn-danger">
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>`
      noteCards = noteCards + noteCard
    })
    Swal.fire({
      title: 'All notes',
      html: noteCards,
      width: "40%",
      showCloseButton: true,
    })

    document.onclick = function(event) {
      if (event.target.classList == "note_del_btn btn btn-danger") {
        const noteId = event.target.dataset.id
        event.target.parentElement.style.display = 'none'
        notesPort.postMessage({ removeNote: true, noteId: noteId })
      }
    }
  })
}
