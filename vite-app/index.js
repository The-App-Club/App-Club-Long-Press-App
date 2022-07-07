// https://iwb.jp/s/javascript-event-long-push-mouse-button-and-tap/
// https://www.npmjs.com/package/long-press-event
// https://stackoverflow.com/questions/2625210/long-press-in-javascript

// Pinterestのメニューに生かせそう

function handleLongPress(targetDom) {
  const ua = navigator.userAgent.toLowerCase();
  const isSP = /iphone|ipod|ipad|android/.test(ua);
  const eventStart = isSP ? 'touchstart' : 'mousedown';
  const eventEnd = isSP ? 'touchend' : 'mouseup';
  const eventLeave = isSP ? 'touchmove' : 'mouseleave';

  let count = 0;
  let elapsedTimeSeconds = 0;
  let timer;

  targetDom.addEventListener(eventStart, handleStartPress);
  targetDom.addEventListener(eventEnd, handleEndPress);
  targetDom.addEventListener(eventLeave, handleLeavePress);

  function handleStartPress(e) {
    e.preventDefault();
    timer = setInterval(() => {
      count++;
      elapsedTimeSeconds = count / 100;
      console.log(elapsedTimeSeconds);
    }, 10);
  }

  function handleLeavePress(e) {
    e.preventDefault();
    let dom = isSP
      ? document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      : targetDom;
    if (!isSP || dom !== targetDom) {
      clearInterval(timer);
      count = 0;
    }
  }

  function handleEndPress(e) {
    e.preventDefault();
    if (count) {
      clearInterval(timer);
      elapsedTimeSeconds = count / 100;
      count = 0;
    }
  }
}

const workspaceDom = document.querySelector('.workspace');

handleLongPress(workspaceDom);
