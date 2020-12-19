function likeMan(id) {
  try {
    axios.get(`https://find-bride.com/profile/addfriends/addMan/${id}?api=1`)
  } catch (error) {
    alert(`failed to like man: ${error}`)
  }
}
