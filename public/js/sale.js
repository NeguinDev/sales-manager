form.onsubmit = async (e) => {
	e.preventDefault();

	const formData = new FormData(form);
	const querys = new URLSearchParams(formData);

	const result = await fetch('/sale?'+querys.toString(), {
		method: 'POST',
		body: formData
	}).then((res) => res.json());

	if (result.status) {
		Alert(result.message);
		form.reset();
	}
}


function Alert(text) {
	const el = document.querySelector('.alert');
	const txt = document.querySelector('.alert-text');

	el.style.display = 'block';
	txt.innerText = text;

	setTimeout(() => el.style.display = 'none', 5000);
	return el;
}

