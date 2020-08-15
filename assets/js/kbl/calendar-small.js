function daysInMonth (month, year) {
    return new Date(year, month + 1, 0).getDate();
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
								'August', 'September', 'October', 'November', 'December'];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let dateElements = [];

let calendar = document.getElementById('calendar');
let currentDate = new Date();
let firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

function getAppointments(month) {
  axios.get(`http://bioinfocore.usu.edu/api/appointments/month/${month}`)
    .then((res) => {
      console.log(res.data);
      res.data.payload.forEach((appointment) => {
        console.log(appointment)
        dateElements[appointment.day - 1].classList.add('appointment');
      });
    });
}

function generateCalendar() {
  weekDaysEl = document.getElementById('weekDays');

  weekDays.forEach((day) => {
  	dayEl = document.createElement('DIV');
    dayEl.classList.add('col', 'weekday', 'text-center');
    dayEl.innerHTML = day;

    weekDaysEl.appendChild(dayEl);
  });

  generateDates();
}

function generateDates() {
  dateElements = [];
  let monthEl = document.getElementById('monthName');
  monthEl.innerHTML = MONTHS[currentDate.getMonth()];

  let oldDateRows = document.querySelectorAll('#dateRow');
  if (oldDateRows.length) {
    oldDateRows.forEach((row) => {
      row.parentNode.removeChild(row);
    });
  }

  let weekOffset = firstOfMonth.getDay();
  let weekIndex = weekOffset;

  let dateRow = document.createElement('DIV');
  dateRow.classList.add('row', 'my-3');
  dateRow.setAttribute('id', 'dateRow');

  for (let i=0; i < weekIndex; i++) {
  	const newColEl = document.createElement('DIV');
    newColEl.classList.add('col', 'px-2', 'text-center');
    dateRow.appendChild(newColEl);
  }

  for (let i=1; i <= daysInMonth(currentDate.getMonth(), currentDate.getFullYear()); i++) {
    const dateColEl = document.createElement('DIV');
    dateColEl.classList.add('col', 'px-2', 'text-center');

    const newDateEl = document.createElement('DIV');
    newDateEl.classList.add('date');
    newDateEl.setAttribute('data-id', `${i}-${currentDate.getMonth()}-${currentDate.getFullYear()}`);
    newDateEl.innerHTML = i;
    dateColEl.appendChild(newDateEl);
    dateElements.push(newDateEl);
    dateRow.appendChild(dateColEl);
    weekIndex += 1;

    if (weekIndex === 7) {
    	calendar.appendChild(dateRow);
      dateRow = document.createElement('DIV');
  		dateRow.classList.add('row', 'my-3');
      dateRow.setAttribute('id', 'dateRow');
      weekIndex = 0;
      continue;
    }
  }

  for (let i=weekIndex; i < 7; i++) {
  	const newColEl = document.createElement('DIV');
    newColEl.classList.add('col', 'px-2', 'text-center');
    dateRow.appendChild(newColEl);
  }

  calendar.appendChild(dateRow);
}

generateCalendar();

getAppointments(currentDate.getMonth() + 1);

const leftArrow = document.querySelector('#calArrowLeft');
const rightArrow = document.querySelector('#calArrowRight');

leftArrow.addEventListener('click', (e) => {
  if (currentDate.getMonth() <= 0) {
    const year = currentDate.getFullYear();
    currentDate = new Date(year - 1, 11, 15); // date doesn't really matter
  } else {
    let month = currentDate.getMonth() - 1;
    let year = currentDate.getFullYear();
    currentDate = new Date(year, month, 15);
  }

  firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  generateDates();
  getAppointments(currentDate.getMonth() + 1);
});

rightArrow.addEventListener('click', (e) => {
  if (currentDate.getMonth() >= 11) {
    const year = currentDate.getFullYear();
    currentDate = new Date(year + 1, 0, 15);
  } else {
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    currentDate = new Date(year, month, 15);
  }

  firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  generateDates();
  getAppointments(currentDate.getMonth() + 1);
});
