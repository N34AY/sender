function renderPhotos () {
    axios.get('https://find-bride.com/mess/photo')
    .then((response) => {
        const page = document.createElement('div')
        page.innerHTML = response.data
        var photosItems = page.getElementsByClassName('item item-list')
        var photos = "<div id='girlPhotosContainer'>"

        for (var i = 1; i < photosItems.length; i++) {
            var photoIdText = photosItems[i].id
            var photoId = photoIdText.replace('item_', '')
            var photoElem = photosItems[i].getElementsByTagName('img')
            var photoLink = photoElem[0].src
            photos = photos + `<img id="girlPhoto" data-id="${photoId}" src="${photoLink}"></img>`
        }
        photos = photos + "</div>"

        Swal.fire({
            title: 'Выберите фото',
            html: photos,
            width: 1000,
            showCloseButton: true,
        })

        function updateChoosenPhoto(imgLink, imgId) {
            document.getElementById('choosenPhoto').src = imgLink
            document.getElementById('choosenPhoto').dataset.id = imgId
        }

        document.getElementById("girlPhotosContainer").onclick = function(event){
            if (event.target.id == 'girlPhoto') {
                var imgId = event.target.dataset.id
                var imgLink = event.target.src
                updateChoosenPhoto(imgLink, imgId)
                Swal.fire().close()
            }
        }
    })
}