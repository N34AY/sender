async function getGirlPhotos() {
  try {
    const response = await axios.get('https://find-bride.com/mess/photo')

    const page = document.createElement('div')
    page.innerHTML = response.data
    var photosItems = page.getElementsByClassName('item item-list')
    var photos = "<div id='girlPhotosContainer'>"

    for (var i = 1; i < photosItems.length; i++) {
      var photoIdText = photosItems[i].id
      var photoId = photoIdText.replace('item_', '')
      var photoElem = photosItems[i].getElementsByTagName('img')
      var photoLink = photoElem[0].src
      photos = photos + `<img class="girlPhoto" id="girlPhoto" data-id="${photoId}" src="${photoLink}"></img>`
    }
    photos = photos + "</div>"
    return photos
  } catch (error) {
    alert(`Failed to get photos: ${error}`)
  }
}


chrome.runtime.onConnect.addListener(function (port) {
  if (port.name == 'photosService') {
    port.onMessage.addListener(async function (pm) {
      if (pm.getPhotos) {
        var photos = await getGirlPhotos()
        port.postMessage({ photos: photos })
      }
    })
  }
})
