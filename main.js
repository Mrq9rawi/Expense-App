// user input
const eName = document.querySelector("input[name='expense-name']");
const eLocation = document.querySelector("input[name='expense-location']");
const eAmount = document.querySelector("input[name='expense-amount']");
const eDate = document.querySelector("input[name='expense-date']");
const eOut = document.querySelector("input[name='expense-out']");
const eIn = document.querySelector("input[name='expense-in']");
const actionsTableBody = document.querySelector(".actions tbody");
const totalAmount = document.querySelector(".total-amount");


// create expenses array
let eArray = [];

if (window.localStorage.getItem("expense")) {
	eArray = JSON.parse(window.localStorage.getItem("expense"));
	eDocumentWriteIn(eArray);
}

// put total to 0
totalAmount.textContent = "0$";

// focus on Expense Name
window.onload = () => {
	eName.focus();
};

eIn.addEventListener("click", () => {
	// validate data
	if (eName.value.trim() !== "" && eLocation.value.trim() !== "" && eAmount.value.trim() !== "" && eDate.value.trim() !== "" && !isNaN(eAmount.value)) {
		// add data to an array
		addEToArray(eName.value, eLocation.value, eAmount.value, eDate.value);
		// clear inputs
		eName.value = "";
		eLocation.value = "";
		eAmount.value = "";
		eDate.value = "";
		// focus on Expense Name
		eName.focus();
	}
});

eOut.addEventListener("click", () => {
	// validate data
	if (eName.value.trim() !== "" && eLocation.value.trim() !== "" && eAmount.value.trim() !== "" && eDate.value.trim() !== "" && !isNaN(eAmount.value)) {
		// add data to an array
		addEToArray(eName.value, eLocation.value, -eAmount.value, eDate.value);
		// clear inputs
		eName.value = "";
		eLocation.value = "";
		eAmount.value = "";
		eDate.value = "";
		// focus on Expense Name
		eName.focus();
	}
});

function addEToArray(eN, eL, eA, eD) {
	// create expense object
	const expense = {
		eName: eN,
		eLocation: eL,
		eAmount: +eA,
		eDate: eD,
	};
	// add expense to an array
	eArray.push(expense);
	// write expense on document
	eDocumentWriteIn(eArray);
	// add expense to LS
	addEToLS(eArray);
}

function eDocumentWriteIn(eArray) {
	// clear table body
	actionsTableBody.innerHTML = "";
	// clear total
	totalAmount.textContent = "";
	eArray.forEach((e) => {
		// create table data
		let eTr = document.createElement("tr");
		let eNTd = document.createElement("td");
		let eLTd = document.createElement("td");
		let eATd = document.createElement("td");
		let eDTd = document.createElement("td");
		// get eTotoal
		actionsTableBody.prepend(eTr);
		eTr.append(eNTd);
		eNTd.textContent = e.eName;
		eTr.append(eLTd);
		eLTd.textContent = e.eLocation;
		eTr.append(eATd);
		eATd.textContent = `${e.eAmount}$`;
		// check in or out
		if (e.eAmount < 0) {
			eATd.className = "out";
		} else {
			eATd.className = "in";
		}
		totalAmount.textContent = +totalAmount.textContent + e.eAmount;
		// calculat total
		eTr.append(eDTd);
		eDTd.textContent = e.eDate;
	});
	// add $ to total
	totalAmount.textContent += "$";

}

function addEToLS(eArray) {
	window.localStorage.setItem("expense", JSON.stringify(eArray));
}

totalAmount.textContent = "";

eArray.forEach((e) => {
	totalAmount.textContent = +totalAmount.textContent + e.eAmount;
});

totalAmount.textContent += "$";

// window.localStorage.clear()