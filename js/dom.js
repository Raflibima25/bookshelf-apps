const INCOMPLETE_BOOKSHELFLIST = "incompleteBookshelfList";
const COMPLETE_BOOKSHELFLIST = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function addBook() {
	const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
	const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELFLIST);

	const inputBookTitle = document.getElementById("inputBookTitle").value;
	const inputBookAuthor = document.getElementById("inputBookAuthor").value;
	const inputBookYear = document.getElementById("inputBookYear").value;
	const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

	const book = makeBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
	const bookObject = composebookObject(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

	book[BOOK_ITEMID] = bookObject.id;
	books.push(bookObject);

	if (inputBookIsComplete == false) {
		incompleteBookshelfList.append(book);
	} else {
		completeBookshelfList.append(book);
	}

	updateDataToStorage();
}

function makeBook(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
	const bookTitle = document.createElement("h3");
	bookTitle.innerText = inputBookTitle;
	bookTitle.classList.add("move");

	const bookAuthor = document.createElement("p");
	bookAuthor.innerText = "Penulis: " + inputBookAuthor;

	const bookYears = document.createElement("p");
	bookYears.innerText = "Tahun: " + inputBookYear;
	bookYears.classList.add("year");

	const bookIsComplete = createCompleteButton();

	const bookRemove = createRemoveButton();
	bookRemove.innerText = "Hapus";

	const bookAction = document.createElement("div");
	bookAction.classList.add("action");
	if (inputBookIsComplete == true) {
		bookIsComplete.innerText = "Belum selesai";
	} else {
		bookIsComplete.innerText = "Sudah selesai";
	}

	bookAction.append(bookIsComplete, bookRemove);
	const bookItem = document.createElement("article");
	bookItem.classList.add("book_item");
	bookItem.append(bookTitle, bookAuthor, bookYears, bookAction);

	return bookItem;
}

function createButton(buttonTypeClass, eventListener) {
	const button = document.createElement("button");
	button.classList.add(buttonTypeClass);
	button.addEventListener("click", function (event) {
		eventListener(event);
	});
	return button;
}

function createCompleteButton() {
	return createButton("green", function (event) {
		const parent = event.target.parentElement;
		addBookToCompleted(parent.parentElement);
	});
}

function removeBook(bookElement) {
	const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
	if (window.confirm("Apakah anda ingin menghapus buku ini dari rak?")) {
		books.splice(bookPosition, 1);
		bookElement.remove();
	}
	updateDataToStorage();
}

function createRemoveButton() {
	return createButton("red", function (event) {
		const parent = event.target.parentElement;
		removeBook(parent.parentElement);
	});
}

function addBookToCompleted(bookElement) {
	const bookTitled = bookElement.querySelector(".book_item > h3").innerText;
	const bookAuthored = bookElement.querySelector(".book_item > p").innerText;
	const bookYeared = bookElement.querySelector(".year").innerText;
	const bookIsComplete = bookElement.querySelector(".green").innerText;

	if (bookIsComplete == "Sudah selesai") {
		const newBook = makeBook(bookTitled, bookAuthored, bookYeared, true);

		const book = findBook(bookElement[BOOK_ITEMID]);
		book.isCompleted = true;
		newBook[BOOK_ITEMID] = book.id;

		const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELFLIST);
		completeBookshelfList.append(newBook);
	} else {
		const newBook = makeBook(bookTitled, bookAuthored, bookYeared, false);

		const book = findBook(bookElement[BOOK_ITEMID]);
		book.isCompleted = false;
		newBook[BOOK_ITEMID] = book.id;

		const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
		incompleteBookshelfList.append(newBook);
	}

	bookElement.remove();

	updateDataToStorage();
}

function refreshDataFromBooks() {
	const listUncomplete = document.getElementById(INCOMPLETE_BOOKSHELFLIST);
	const listComplete = document.getElementById(COMPLETE_BOOKSHELFLIST);

	for (book of books) {
		const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
		newBook[BOOK_ITEMID] = book.id;

		if (book.isCompleted == false) {
			listUncomplete.append(newBook);
		} else {
			listComplete.append(newBook);
		}
	}
}

const inputSearch = document.getElementById("searchBookTitle");
function searchBook() {
	const searchList = inputSearch.value.toLowerCase();
	const moveBook = document.querySelectorAll(".book_item");

	moveBook.forEach((item) => {
		const listItem = item.firstChild.textContent.toLowerCase();

		if (listItem.indexOf(searchList) != -1) {
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	});
}
