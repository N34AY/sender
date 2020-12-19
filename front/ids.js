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
