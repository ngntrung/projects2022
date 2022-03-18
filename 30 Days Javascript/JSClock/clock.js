
const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');

const interval = setInterval(clockFunction, 1000)

function clockFunction () {
  const date = new Date();
  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour = date.getHours();
  secondHand.style.transform = `rotate(${second / 60 * 360 + 90}deg)`
  minuteHand.style.transform = `rotate(${minute / 60 * 360 + 90}deg)`
  hourHand.style.transform = `rotate(${hour / 12 * 360 + 90}deg)`
  console.log(`${hour}: ${minute}: ${second}`);
}
