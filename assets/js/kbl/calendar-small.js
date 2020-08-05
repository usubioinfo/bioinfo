function daysInMonth (month, year) {
    return new Date(year, month + 1, 0).getDate();
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
								'August', 'September', 'October', 'November', 'December'];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let calendar = document.getElementById('calendar');
let currentDate = new Date();
let firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

let weekOffset = firstOfMonth.getDay();
console.log()

let monthEl = document.getElementById('monthName');
monthEl.innerHTML = MONTHS[currentDate.getMonth()];

weekDaysEl = document.getElementById('weekDays');

weekDays.forEach((day) => {
	dayEl = document.createElement('DIV');
  dayEl.classList.add('col', 'weekday', 'text-center');
  dayEl.innerHTML = day;

  weekDaysEl.appendChild(dayEl);
});

let weekIndex = weekOffset;
let dateRow = document.createElement('DIV');
dateRow.classList.add('row', 'my-3');

for (let i=0; i < weekIndex; i++) {
	console.log(i)
	const newColEl = document.createElement('DIV');
  newColEl.classList.add('col', 'px-5', 'text-center');
  dateRow.appendChild(newColEl);
}

for (let i=1; i <= daysInMonth(currentDate.getMonth(), currentDate.getFullYear()); i++) {
  const dateColEl = document.createElement('DIV');
  dateColEl.classList.add('col', 'px-5', 'text-center');

  const newDateEl = document.createElement('DIV');
  newDateEl.classList.add('date');
  newDateEl.setAttribute('data-id', `${i}-${currentDate.getMonth()}-${currentDate.getFullYear()}`);
  newDateEl.innerHTML = i;
  dateColEl.appendChild(newDateEl);
  dateRow.appendChild(dateColEl);
  weekIndex += 1;

  if (weekIndex === 7) {
  	calendar.appendChild(dateRow);
    dateRow = document.createElement('DIV');
		dateRow.classList.add('row', 'my-3');
    weekIndex = 0;
    continue;
  }
}

for (let i=weekIndex; i < 7; i++) {
	console.log(i)
	const newColEl = document.createElement('DIV');
  newColEl.classList.add('col', 'px-5', 'text-center');
  dateRow.appendChild(newColEl);
}

calendar.appendChild(dateRow);
