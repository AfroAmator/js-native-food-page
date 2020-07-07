function timer(timerSelector, dateEnd) {

    function setTimer(dat) {
        const timerWorkTime = Date.parse(dat) - new Date(),
              days = Math.floor(timerWorkTime / (1000 * 60 * 60 * 24)),
              hours = Math.floor((timerWorkTime / (1000 * 60 * 60)) % 24),
              minutes = Math.floor(timerWorkTime / (1000 * 60) % 60),
              seconds = Math.floor((timerWorkTime / 1000) % 60);

        return {
            timerWorkTime,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function zeroAdding(number) {
        if (number >= 0 && number <= 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const timeUpdate = setTimer(endtime);

            days.innerHTML = zeroAdding(timeUpdate.days);
            hours.innerHTML = zeroAdding(timeUpdate.hours);
            minutes.innerHTML = zeroAdding(timeUpdate.minutes);
            seconds.innerHTML = zeroAdding(timeUpdate.seconds);

            if (timer.timerWorkTime <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock(timerSelector, dateEnd);
}

export default timer;