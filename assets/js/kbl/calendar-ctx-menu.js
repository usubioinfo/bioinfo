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

	function toRegularHour(hour) {
	  if (hour === 0) {
	    return '12-am';
	  }

	  if (hour < 12 && hour !== 0) {
	    return `${hour}-am`;
	  }

	  if (hour === 12) {
	    return '12-pm';
	  }

	  if (hour > 12) {
	    return `${hour -12}-pm`;
	  }
	}

	function getMinuteString(minute) {
		let minuteString = minute.toString();

		if (minuteString.length === 1) {
			return `0${minuteString}`;
		}

		return minuteString;
	}

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
					const newHourMeridiem = toRegularHour(appt.hour).split('-');
					apptEl.innerHTML = `${newHourMeridiem[0]}:${getMinuteString(appt.minute)} ${newHourMeridiem[1]} - ${appt.author}`;
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
			newMinute -= 60;
		}

		if (newMinute < 0) {
			newMinute += 60;
		}

		return newMinute;
	}

	function absoluteHour(hour, meridiem) {
		if (meridiem === 'am') {
			if (hour === 12) {
				return 0;
			}

			return hour;
		} else if (meridiem === 'pm') {
			if (hour === 12) {
				return hour;
			}

			return 12 + hour;
		}
	}

	// Set APT Stuff
	const appointmentNameField = document.querySelector('#appointmentName');
	const appointmentDescField = document.querySelector('#appointmentDesc');
	const appointmentEmailField = document.querySelector('#appointmentEmail');

	const minuteForm = document.querySelector('#minuteForm');
	const hourForm = document.querySelector('#hourForm');

	const amLabel = document.querySelector('#amLabel');
	const pmLabel = document.querySelector('#pmLabel');

	let meridiem = 'am';

	amLabel.addEventListener('click', () => {
		pmLabel.classList.remove('selected');
		// Prevent duplicates classes being added
		amLabel.classList.remove('selected');
		amLabel.classList.add('selected');
		meridiem = 'am';
	});

	pmLabel.addEventListener('click', () => {
		amLabel.classList.remove('selected');
		// Prevent duplicates classes being added (again)
		pmLabel.classList.remove('selected');
		pmLabel.classList.add('selected');
		meridiem = 'pm';
	});

	const hourIncrement = document.querySelector('#hourIncrement').addEventListener('click', () => {
		hourValue = changeHour(1);
		hourForm.value = hourValueToField(hourValue);
	});
	const hourDecrement = document.querySelector('#hourDecrement').addEventListener('click', () => {
		hourValue = changeHour(-1);
		hourForm.value = hourValueToField(hourValue);
	});
	const minuteIncrement = document.querySelector('#minuteIncrement').addEventListener('click', () => {
		minuteValue = changeMinute(15);
		minuteForm.value = minuteValueToField(minuteValue);
	});
	const minuteDecrement = document.querySelector('#minuteDecrement').addEventListener('click', () => {
		minuteValue = changeMinute(-15);
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
			// year, month, date
			date: `${date[2]}-${date[1]}-${date[0]}`,
			time: `${hourValue}-${minuteValue}-${meridiem}`,
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

		const apiUrlProd = 'http://bioinfocore.usu.edu/api';
	  const apiUrlLocal = 'http://localhost:3100';

		axios.post(`${apiUrlProd}/appointments/create`, appointment)
			.then((res) => {
				appointmentNameField.value = '';
				appointmentDescField.value = '';
				appointmentEmailField.value = '';

				dateElements[appointment.date.split('-')[2] - 1].classList.add('appointment');
				const newAppt = appointment;
				newAppt['day'] = parseInt(appointment.date.split('-')[2]);
				newAppt['month'] = parseInt(appointment.date.split('-')[1]) + 1;
				newAppt['hour'] = absoluteHour(hourValue, meridiem);
				newAppt['minute'] = minuteValue;
				delete newAppt.email;

				hourValue = 12;
				minuteValue = 0;
				hourForm.value = hourValueToField(hourValue);
				minuteForm.value = minuteValueToField(minuteValue);

				appointments.push(newAppt);
			})
			.catch((err) => {
				console.log(err);
			});
  }
})();
