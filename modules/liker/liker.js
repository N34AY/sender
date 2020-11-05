function likeMan(id) {
    const url = `https://find-bride.com/profile/addfriends/addMan/${id}?api=1`
    axios.get(url)
        .then(response => console.log('[Sender] like successs: ' + id))
        .catch(error => console.warn('[Sender] like failed'))
}