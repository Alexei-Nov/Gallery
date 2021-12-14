let upload = document.querySelector('#file');
newDiv = document.createElement('div');
upload.addEventListener('change', function () {
	newDiv.innerHTML = `<p>Выбранно ${upload.files.length} файла(ов)</p>`;
	newDiv.className = 'gallery__itemsCount';
	galUpload = document.querySelector('.gallery__upload');
	galUpload.appendChild(newDiv);
});

function op_click() {
	let input = document.querySelector('#file');
	input.click();
	newDiv.innerHTML = '';
}

function up_click() {
	newDiv.innerHTML = '';
	let upload = document.querySelector('#file');
	if (upload.files.length == 0) return;
	document.body.style.overflowY = ('auto');
	for (let i = 0; i < upload.files.length; i++) {
		let contItem = document.createElement('div');
		contItem.className = 'gallery__itemContainer';
		let wrap = document.createElement('img');
		let gal = document.querySelector('.gallery__body');
		contItem.appendChild(wrap);
		wrap.className = 'gallery__item';
		deleteItem = document.createElement('div');
		deleteItem.innerHTML = 'X';
		deleteItem.className = 'gallery__itemDelete';
		contItem.appendChild(deleteItem);
		gal.appendChild(contItem);
		const reader = new FileReader();
		reader.onload = ev => {
			wrap.src = ev.target.result
		}
		reader.readAsDataURL(upload.files[i]);
	}
	upload.value = '';
}

let curImg = document.querySelector('.gallery__body');
curImg.addEventListener('click', function (event) {
	if (event.target.closest('.gallery__item')) {
		let popOp = document.querySelector('.popup');
		popOp.style.visibility = ('visible');
		document.body.style.overflowY = ('hidden');
		let popImg = document.querySelector('.popup__img');
		popImg.src = (event.target.src);
	};
});

let closePop = document.querySelector('.popup');
closePop.addEventListener('click', function (event) {
	let popOp = document.querySelector('.popup');
	if (popOp.style.visibility == ('visible')) {
		if (event.target.closest('.popup__img')) {
			return
		};
		let popCls = document.querySelector('.popup');
		popCls.style.visibility = ('hidden');
		document.body.style.overflowY = ('auto');
	};
});

let hoverPop = document.querySelector('.gallery__body');
hoverPop.addEventListener('mouseover', function (event) {
	let target = event.target.closest('.gallery__item');
	if (!target) return;
	target.style.filter = 'brightness(50%)';
});
hoverPop.addEventListener('mouseout', function (event) {
	let target = event.target.closest('.gallery__item');
	if (!target) return;
	target.style.filter = 'brightness(100%)';
});

hoverPop.addEventListener('click', function (event) {
	let target = event.target.closest('.gallery__itemDelete');
	if (!target) return;
	let item = event.target.closest('.gallery__itemContainer');
	item.remove();
});