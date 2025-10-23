import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const fields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let userSelectedDate = null;
startButton.disabled = true;
dateInput.disabled = false;
let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate.getTime() <= now.getTime()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: '#ffe88eff',
        messageColor: 'red',
        position: 'topRight',
      });
      startButton.disabled = true;
      userSelectedDate = null;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);
//

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(time) {
  fields.days.textContent = time.days;

  fields.hours.textContent = addLeadingZero(time.hours);
  fields.minutes.textContent = addLeadingZero(time.minutes);
  fields.seconds.textContent = addLeadingZero(time.seconds);
}

startButton.addEventListener('click', event => {
  if (!userSelectedDate) {
    return;
  }
  startButton.disabled = true;
  dateInput.disabled = true;
  timer = setInterval(() => {
    const now = new Date();
    const remaining = userSelectedDate.getTime() - now.getTime();

    if (remaining <= 0) {
      clearInterval(timer);
      updateTimerDisplay(convertMs(0));
      dateInput.disabled = false;
      return;
    }
    const time = convertMs(remaining);
    updateTimerDisplay(time);
  }, 1000);
});
