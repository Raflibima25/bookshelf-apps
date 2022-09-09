document.addEventListener("DOMContentLoaded", function () {
	const submitBook = document.getElementById("inputBook");
	submitBook.addEventListener("submit", function (event) {
		event.preventDefault();
		addBook();
		submitBook.reset();
	});

	const searchBooks = document.getElementById("searchBook");
	searchBooks.addEventListener("keyup", function (event) {
		event.preventDefault();
		searchBook();
	});

	const inputMaxLengthOnLoad = document.getElementById("inputBookTitle").maxLength;
	document.getElementById("sisaKarakter").innerText = inputMaxLengthOnLoad;

	if (isStorageExist()) {
		loadDataFromStorage();
	}
});

const inputTitle = document.getElementById("inputBookTitle");
const inputYear = document.getElementById("inputBookYear");

inputTitle.addEventListener("input", function () {
	const jumlahKarakterDiketik = document.getElementById("inputBookTitle").value.length;
	const jumlahKarakterMaksimal = document.getElementById("inputBookTitle").maxLength;

	const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
	document.getElementById("sisaKarakter").innerText = sisaKarakterUpdate.toString();

	if (sisaKarakterUpdate === 0) {
		document.getElementById("sisaKarakter").innerText = "Batas maksimal tercapai!";
	} else if (sisaKarakterUpdate <= 5) {
		document.getElementById("notifikasiSisaKarakter").style.color = "red";
	} else if (sisaKarakterUpdate === 15) {
		document.getElementById("notifikasiSisaKarakter").style.visibility = "hidden";
	} else {
		document.getElementById("notifikasiSisaKarakter").style.color = "grey";
		document.getElementById("notifikasiSisaKarakter").style.visibility = "visible";
	}
});

inputTitle.addEventListener("focus", function () {
	document.getElementById("notifikasiSisaKarakter").style.visibility = "visible";
});

inputTitle.addEventListener("blur", function () {
	document.getElementById("notifikasiSisaKarakter").style.visibility = "hidden";
});

inputYear.addEventListener("focus", function () {
	document.getElementById("labelYear").style.visibility = "visible";
});

inputYear.addEventListener("blur", function () {
	document.getElementById("labelYear").style.visibility = "hidden";
});

document.addEventListener("ondatasaved", () => {
	console.log("Data berhasil disimpan");
});
document.addEventListener("DATA_LOADED", () => {
	refreshDataFromBooks();
});

const changeTexts = document.getElementById("inputBookIsComplete");
changeTexts.addEventListener("click", function () {
	changeText();
});

function changeText() {
	const checkbox = document.getElementById("inputBookIsComplete");
	const textSubmit = document.getElementById("textSubmit");

	if (checkbox.checked == true) {
		textSubmit.innerText = "Sudah selesai dibaca";
	} else {
		textSubmit.innerText = "Belum selesai dibaca";
	}
}
