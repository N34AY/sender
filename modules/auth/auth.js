function getProfileId() {
	let profileLink = document.querySelector('.avatar-round-visible a').href
	profileId = profileLink.replace('https://find-bride.com/search/profile/all/', '')
	return profileId
}

async function displayLoginWindow() {
	Swal.fire({
		title: 'Авторизация',
		html: `<label for="email">Ваш email</label>
            <input type="text" id="email" class="swal2-input" placeholder="Email">   
            <label for="password">Ваш пароль</label>
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
		confirmButtonText: 'Войти',
		focusConfirm: false,
		preConfirm: () => {
			const email = Swal.getPopup().querySelector('#email').value
			const password = Swal.getPopup().querySelector('#password').value
			if (!email || !password) {
				Swal.showValidationMessage(`Пожалуйста введите email и пароль`)
			}
			return { email: email, password: password }
		}
	}).then((result) => {
		const account = getProfileId()
		checkAuth(result.value.email, result.value.password, account)
	})
}

async function checkAuth(email, password, account) {
	var data = {
		email: email,
		password: password,
		account: account
	}
	let json = JSON.stringify(data)

	const url = 'https://ancrush.com/auth/api'
	const options = { headers: { 'Content-Type': 'application/json' } }

	axios.post(url, json, options)
		.then((response) => {
			if (response.data.status == 'success') {
				Swal.fire({
					icon: 'success',
					title: 'Авторизация',
					text: 'Вы успешно авторизировались',
					timer: 3000
				})
					.then(() => {
						displayFindExtension()
						exAuth = {
							token: response.data.token,
							email: email,
							account: account
						}
						localStorage.setItem('exAuth', JSON.stringify(exAuth))
					})
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Авторизация',
					text: 'Неправильный логин или пароль',
					buttons: {
						cancel: "OK",
						retry: "Retry",
					},
				})
			}
		})
		.catch(response => {
			Swal.fire({
				icon: 'error',
				title: 'Авторизация',
				text: 'Неправильный логин или пароль',
				showCloseButton: true,
				showCancelButton: true,
				focusConfirm: true,
				confirmButtonText: 'Повторить',
				cancelButtonText: 'Ладно',
			}).then((result) => {
				if (result.isConfirmed) {
					displayLoginWindow()
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					Swal.fire().close()
				}
			})
		})
}