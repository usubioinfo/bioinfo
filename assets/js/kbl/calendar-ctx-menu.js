const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
								'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

(function() {

  'use strict';

  const dateItems = document.querySelectorAll('.calendar .date');
  const ctxMenu = document.querySelector('#ctx-menu');
  let ctxMenuHeader = document.querySelector('#ctx-heading');
	let apptHeader = document.querySelector('#appt-header');
	let apptContainer = document.querySelector('#appt-container');
	let modalTitleEl = document.querySelector('#appointmentModalTitle');

  let headerText = '';
	let currentSelectedDate = [];

  let menuOn = false;
  const activeState = 'active';

  let menuPos;
  let menuX;
  let menuY;

	let apptsForDay = [];

  document.addEventListener('click', (e) => {
		const allDates = document.querySelectorAll('.calendar .date');
		allDates.forEach((el) => {
			el.classList.remove('selected');
		});
    if (clickInsideDate(e, 'date')) {
      e.preventDefault();
      activateMenu();
			apptContainer.innerHTML = '';
			if (apptsForDay.length) {
				apptHeader.classList.remove('d-none');
				apptContainer.classList.remove('d-none');
				apptsForDay.forEach((appt) => {
					let apptEl = document.createElement('DIV');
					apptEl.innerHTML = appt.author;
					apptContainer.appendChild(apptEl);
				});
			} else {
				apptHeader.classList.add('d-none');
				apptContainer.classList.add('d-none');
			}
      positionMenu(e);
    } else {
      deactivateMenu();
    }
  });

  window.onkeyup = (e) => {
    if (e.keyCode === 27) {
			allDates.forEach((el) => {
				el.classList.remove('selected');
			});
      deactivateMenu();
    }
  };

  function positionMenu(e) {
    menuPos = getClickPos(e);
    menuX = menuPos.x + 'px';
    menuY = menuPos.y + 'px';

    ctxMenu.style.left = menuX;
    ctxMenu.style.top = menuY;
  }

  function clickInsideDate(e, className) {
    const el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
			el.classList.add('selected');
      const data = el.getAttribute('data-id').split('-');
			currentSelectedDate = data;
      headerText = `${MONTHS_SHORT[data[1]]} ${data[0]}`;
      ctxMenuHeader.innerHTML = headerText;
			modalTitleEl.innerHTML = `${headerText}, ${data[2]}`;

			apptsForDay = appointments.filter((appt) => {
				return appt.day === parseInt(data[0]) && appt.month - 1 === parseInt(data[1]);
			});
			console.log(apptsForDay);
      return el;
    } else {
      while (el === el.parentNode) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }

    return false;
  }

  function activateMenu() {
    if (!menuOn) {
      menuOn = true;
      ctxMenu.classList.add(activeState);
    }
  }

  function deactivateMenu() {
    if (menuOn) {
      menuOn = false;
      ctxMenu.classList.remove(activeState);
    }
  }

  function getClickPos(e) {
    let posX = 0;
    let posY = 0;

    if (!e) e = window.event;

    if (e.pageX || e.pageY) {
      posX = e.pageX;
      posY = e.pageY;
    } else if (e.clientX || e.clientY) {
      posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {x: posX, y: posY};
  }

	function minuteValueToField(value) {
		if (value.toString().length === 1) {
			return `0${value}`;
		} else {
			return value.toString();
		}
	}

	function hourValueToField(value) {
		if (value.toString().length === 1) {
			return `0${value}`;
		} else {
			return value.toString();
		}
	}

	function changeHour(hourChange) {
		let newHour = hourValue;
		newHour += hourChange;
		if (newHour > 12) {
			newHour = 1;
		}

		if (newHour < 1) {
			newHour = 12;
		}

		return newHour;
	}

	function changeMinute(minuteChange) {
		let newMinute = minuteValue;
		newMinute += minuteChange;
		if (newMinute > 59) {
			newMinute = 0;
		}

		if (newMinute < 0) {
			newMinute = 59;
		}

		return newMinute;
	}

	// Set APT Stuff
	const appointmentNameField = document.querySelector('#appointmentName');
	const appointmentDescField = document.querySelector('#appointmentDesc');
	const appointmentEmailField = document.querySelector('#appointmentEmail');

	const minuteForm = document.querySelector('#minuteForm');
	const hourForm = document.querySelector('#hourForm');

	const hourIncrement = document.querySelector('#hourIncrement').addEventListener('click', () => {
		hourValue = changeHour(1);
		hourForm.value = hourValueToField(hourValue);
	});
	const hourDecrement = document.querySelector('#hourDecrement').addEventListener('click', () => {
		hourValue = changeHour(-1);
		hourForm.value = hourValueToField(hourValue);
	});
	const minuteIncrement = document.querySelector('#minuteIncrement').addEventListener('click', () => {
		minuteValue = changeMinute(1);
		minuteForm.value = minuteValueToField(minuteValue);
	});
	const minuteDecrement = document.querySelector('#minuteDecrement').addEventListener('click', () => {
		minuteValue = changeMinute(-1);
		minuteForm.value = minuteValueToField(minuteValue);
	});

	let hourValue = 12;
	let minuteValue = 0;

	hourForm.value = hourValueToField(hourValue);
	minuteForm.value = minuteValueToField(minuteValue);


	const setAppointmentBtn = document.querySelector('#createAppointmentButton');
  setAppointmentBtn.addEventListener('click', (e) => {
		const date = currentSelectedDate;
		const appointment = {
			date: `${date[2]}-${date[1]}-${date[0]}`,
			author: appointmentNameField.value,
			email: appointmentEmailField.value,
			description: appointmentDescField.value
		};
    sendNewAppointment(appointment);
  });

  function sendNewAppointment(appointment) {
    if (!appointment.author || !appointment.date || !appointment.description) {
      return;
    }

		axios.post('http://bioinfocore.usu.edu/api/appointments/create', appointment)
			.then((res) => {
				console.log(res);
				appointmentNameField.value = '';
				appointmentDescField.value = '';
				appointmentEmailField.value = '';
			})
			.catch((err) => {
				console.log(err);
			});
  }
})();
