
const refs = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
    timer: document.getElementById('#timer-1')
}
class CountdownTimer {
  constructor({ targetDate, selector }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.selector = selector;
    this.onTick = this.updateClockFace;

    this.start()

    
  }

   start() {
    this.intervalId = setInterval(() => {
      const targetDate = this.targetDate.getTime();
      const currentTime = Date.now();
      const deltaTime = targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return {days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

 updateClockFace(time = {days, hours, mins, secs }) {
  const timerEl = document.querySelector(this.selector);
    for (const key in time) {
      const valueEl = timerEl.querySelector(`[data-value="${key}"]`);
      valueEl.innerHTML = `<span>${time[key]}</span>`;
    }
  
}
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 27, 2022'),
});


