// https://iwb.jp/s/javascript-event-long-push-mouse-button-and-tap/
// https://www.npmjs.com/package/long-press-event
// https://stackoverflow.com/questions/2625210/long-press-in-javascript

// Pinterestのメニューに生かせそう

let count = 0;
let timer;
const ua = navigator.userAgent.toLowerCase();
const isSP = /iphone|ipod|ipad|android/.test(ua);
const b = document.getElementById('button');
const r = document.getElementById('r');
const eventStart = isSP ? 'touchstart' : 'mousedown';
const eventEnd = isSP ? 'touchend' : 'mouseup';
const eventLeave = isSP ? 'touchmove' : 'mouseleave';

b.addEventListener(eventStart, (e) => {
  e.preventDefault();
  b.classList.add('active');
  timer = setInterval(() => {
    count++;
    r.textContent = count / 100 + '秒';
  }, 10);
});

b.addEventListener(eventEnd, (e) => {
  e.preventDefault();
  if (count) {
    b.classList.remove('active');
    clearInterval(timer);
    r.textContent = count / 100 + '秒長押しされました';
    count = 0;
  }
});

b.addEventListener(eventLeave, (e) => {
  e.preventDefault();
  let el;
  el = isSP
    ? document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
    : b;
  if (!isSP || el !== b) {
    b.classList.remove('active');
    clearInterval(timer);
    r.textContent = '処理を中断';
    count = 0;
  }
});
