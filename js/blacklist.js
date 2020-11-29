function getAccountId () {
    var profileLink = document.querySelector('.avatar-round-visible a').href
    profileId = profileLink.replace('https://find-bride.com/search/profile/all/', '')
    return profileId
}

const currentUrl = window.location.href
const baseUrl = "https://ancrush.com"
const userEmail = 'dfdfdfdfd@gmail.com'
const accountId = getAccountId()


async function displayBanButtonOnManProfile (manId) {
    const profileSidebar = document.getElementsByClassName('profile-sidebar')
    const isBanned = await checkIsManInBlacklist (userEmail, accountId, manId)

    var banButton = document.createElement('button')
    if (isBanned) {
        banButton.classList = 'ban_btn btn btn-primary'
        banButton.innerHTML = 'UNBAN'
    }
    if (!isBanned) {
        banButton.classList = 'ban_btn btn btn-danger'
        banButton.innerHTML = 'BAN'
    }
    profileSidebar[0].appendChild(banButton)
}
async function displayBanButtonInChat (manId) {
    const chatSidebar = document.getElementsByClassName('main_top_in')
    const isBanned = await checkIsManInBlacklist (userEmail, accountId, manId)

    var banButton = document.createElement('button')
    if (isBanned) {
        banButton.classList = 'ban_btn btn btn-primary'
        banButton.innerHTML = 'UNBAN'
    }
    if (!isBanned) {
        banButton.classList = 'ban_btn btn btn-danger'
        banButton.innerHTML = 'BAN'
    }
    chatSidebar[1].appendChild(banButton)
}

if (currentUrl.indexOf('search/man_profile', 0) != -1) {
    const manId = currentUrl.replace('https://find-bride.com/search/man_profile/all/', '')
    displayBanButtonOnManProfile(manId)
    document.onclick = function(event) {
        var banButton = document.getElementsByClassName('ban_btn')[0]

        if (event.target.classList.contains('btn-danger')) {
            addManToBlacklist(userEmail, accountId, manId)
            banButton.classList = 'ban_btn btn btn-primary'
            banButton.innerHTML = 'UNBAN'
        }
        if (event.target.classList.contains('btn-primary')) {
            removeManFromBlacklist (userEmail, accountId, manId)
            banButton.classList = 'ban_btn btn btn-danger'
            banButton.innerHTML = 'BAN'
        }
    }
}
if (currentUrl.indexOf('find-bride.com/chat', 0) != -1) {
    let manLink = document.getElementById('correct_user_profile').href
    let manId = ''
    if (manLink) manId = manLink.replace('/search/man_profile/all/', '')
    displayBanButtonInChat(manId)
}





async function addManToBlacklist (userEmail, accountId, manId) {
    const requestUrl = `${baseUrl}/api/blacklist/add`
    const data = {
        userEmail: userEmail,
        account: accountId,
        manId: manId
    }
    let json = JSON.stringify(data)
    const options = { headers: { 'Content-Type': 'application/json' } }
    
    try {
        const request = await axios.post(requestUrl, json, options)
	} catch (error) {
		console.log('can`t like man')
	}   
}

async function removeManFromBlacklist (userEmail, accountId, manId) {
    const requestUrl = `${baseUrl}/api/blacklist/remove`
    const data = {
        userEmail: userEmail,
        account: accountId,
        manId: manId
    }
    let json = JSON.stringify(data)
    const options = { headers: { 'Content-Type': 'application/json' } }
    
    try {
		const request = await axios.post(requestUrl, json, options)
	} catch (error) {
		console.log('can`t like man')
	}   
}

async function checkIsManInBlacklist (userEmail, accountId, manId) {
    const requestUrl = `${baseUrl}/api/blacklist/check`
    const data = {
        userEmail: userEmail,
        account: accountId,
        manId: manId
    }
    let json = JSON.stringify(data)
    const options = { headers: { 'Content-Type': 'application/json' } }
    
    try {
        const request = await axios.post(requestUrl, json, options)
        if (request.data.isBanned) return true
        if (!request.data.isBanned) return false
	} catch (error) {
        console.log('can`t like man')
        return {failed: true}
	}   
}