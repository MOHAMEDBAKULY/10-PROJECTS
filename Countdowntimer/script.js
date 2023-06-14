const eidAlAdhaDate = '29 june 2023';

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');

const iddEl = document.getElementById('iddDay');

const countDown = () =>{
    currentDate = new Date();

    timeRemaining = new Date(eidAlAdhaDate);

    const secondsTime = (timeRemaining - currentDate) / 1000;

    const days = Math.floor(secondsTime/ 3600 / 24);

    const hours = Math.floor(secondsTime / 3600) % 24;

    const minutes = Math.floor(secondsTime / 60) % 60;

    const seconds = Math.floor(secondsTime) % 60;

    const milliseconds =Math.floor(secondsTime % 1000)

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = format(minutes);
    secondsEl.innerHTML = format(seconds);
    millisecondsEl.innerHTML = format(milliseconds);

    if (timeRemaining <= 0) {
        clearInterval(final);
        iddEl.innerHTML = "Eid Day Has Arrived"
    }
}

const format = (time) => {
     return time < 10 ? `0${time}` : time;
}


const final = setInterval(countDown, 1000)

countDown();



























