function addToBlacklist(userEmail, accountId, manId) {
  const data = {
    userEmail: userEmail,
    account: accountId,
    manId: manId
  }
  const options = { headers: { 'Content-Type': 'application/json' } }

  try {
    axios.post(`${baseUrl}/api/blacklist/add`, data, options)
  } catch (error) {
    alert('Failed to add man to the blacklist!')
  }
}

function removeFromBlacklist(userEmail, accountId, manId) {
  const data = {
    userEmail: userEmail,
    account: accountId,
    manId: manId
  }
  const options = { headers: { 'Content-Type': 'application/json' } }

  try {
    axios.post(`${baseUrl}/api/blacklist/remove`, data, options)
  } catch (error) {
    alert('Failed to remove man from blacklist!')
  }
}

async function checkIsBanned(userEmail, accountId, manId) {
  const data = {
    userEmail: userEmail,
    account: accountId,
    manId: manId
  }
  const options = { headers: { 'Content-Type': 'application/json' } }

  try {
    const request = await axios.post(`${baseUrl}/api/blacklist/check`, data, options)
    if (request.data.isBanned) return { banStatus: "banned" }
    if (!request.data.isBanned) return { banStatus: "unbanned" }
  } catch (error) {
    alert('Failed to check man ban status!')
  }
}


chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == 'blacklistService') {
    port.onMessage.addListener(async function (pm) {
      if (pm.checkBan && pm.userEmail && pm.manId && pm.account) {
        const response = await checkIsBanned(pm.userEmail, pm.account, pm.manId)
        port.postMessage(response)
      }

      if (pm.addToBan && pm.userEmail && pm.manId && pm.account) {
        addToBlacklist(pm.userEmail, pm.account, pm.manId, pm.message)
      }

      if (pm.removeFromBan && pm.userEmail && pm.manId && pm.account) {
        removeFromBlacklist(pm.userEmail, pm.account, pm.manId, pm.message)
      }
    })
  }
})
