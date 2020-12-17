function getManId() {
  const windowUrl = window.location.href
  manId = windowUrl.replace('https://find-bride.com/search/man_profile/all/', '')
  return manId
}
function getAccountId() {
  const profileLink = document.querySelector('.avatar-round-visible a').href
  account = profileLink.replace('https://find-bride.com/search/profile/all/', '')
  return account
}


const bsPort = chrome.runtime.connect({ name: "blacklistService" })

bsPort.postMessage({ checkBan: true, userEmail: 'test@gmail.com', manId: getManId(), account: getAccountId() })
bsPort.onMessage.addListener(function (pm) {
  if (pm.banStatus == "banned") {
    const profileSidebar = document.getElementsByClassName('profile-sidebar')
    const addNoteButton = `<button type="button" id="banButton" class="ex_btn btn btn-primary">
                            Unban man &nbsp;
                            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                          </button>`
    profileSidebar[0].insertAdjacentHTML("beforeend", addNoteButton)
  }
  if (pm.banStatus == "unbanned") {
    const profileSidebar = document.getElementsByClassName('profile-sidebar')
    const addNoteButton = `<button type="button" id="banButton" class="ex_btn btn btn-danger">
                            Ban man &nbsp;
                            <i class="fa fa-lock" aria-hidden="true"></i>
                          </button>`
    profileSidebar[0].insertAdjacentHTML("beforeend", addNoteButton)
  }


  document.getElementById('banButton').onclick = async function (event) {
    if (event.target.classList.contains('btn-danger')) {
      event.target.classList = 'ex_btn btn btn-primary'
      event.target.innerHTML = `Unban man &nbsp;
                                <i class="fa fa-unlock-alt" aria-hidden="true"></i>`
      event.target.children[0].classList = 'fa fa-unlock-alt'
      await bsPort.postMessage({ addToBan: true, userEmail: 'test@gmail.com', manId: getManId(), account: getAccountId() })
    } else if (event.target.classList.contains('btn-primary')) {
      event.target.classList = 'ex_btn btn btn-danger'
      event.target.innerHTML = `Ban man &nbsp;
                                <i class="fa fa-lock" aria-hidden="true"></i>`
      event.target.children[0].classList = 'fa fa-lock'
      await bsPort.postMessage({ removeFromBan: true, userEmail: 'test@gmail.com', manId: getManId(), account: getAccountId() })
    }
  }
})
