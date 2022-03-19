// Initialize the objects
const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');
const digitalClock = document.querySelector('.digital-clock');

// Internal to update the clock according to current time
const interval = setInterval(clockFunction, 1000)

// Time Function
function clockFunction () {
  const date = new Date();
  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour = date.getHours();
  secondHand.style.transform = `rotate(${second / 60 * 360 + 90}deg)`
  minuteHand.style.transform = `rotate(${minute / 60 * 360 + 90}deg)`
  hourHand.style.transform = `rotate(${hour / 12 * 360 + 90}deg)`
  digitalClock.innerHTML=`${date.toLocaleString("en-us",{hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false})}`;
}

