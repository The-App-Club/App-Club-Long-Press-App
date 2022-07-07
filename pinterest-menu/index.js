function activateMenuItem() {
  const touchMenuItemDomList = [
    ...document.querySelectorAll('.touch-menu-item'),
  ];

  for (let index = 0; index < touchMenuItemDomList.length; index++) {
    const touchMenuItemDom = touchMenuItemDomList[index];
    touchMenuItemDom.classList.add('is-active');
  }
}

function inactivateMenuItem() {
  const touchMenuItemDomList = [
    ...document.querySelectorAll('.touch-menu-item'),
  ];

  for (let index = 0; index < touchMenuItemDomList.length; index++) {
    const touchMenuItemDom = touchMenuItemDomList[index];
    touchMenuItemDom.classList.remove('is-active');
  }
}

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
      if (elapsedTimeSeconds > 0.75) {
        activateMenuItem();
      }
      count++;
      elapsedTimeSeconds = count / 100;
      selectedMenuItem = e.target.dataset.touchMenu;
      // console.log(elapsedTimeSeconds, e.target);
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
      inactivateMenuItem();
      console.log(selectedMenuItem);
      window.alert(`You Touched Menu ${selectedMenuItem}`);
    }
  }
}

let selectedMenuItem;

const coolMenuDom = document.querySelector('.cool-menu');
handleLongPress(coolMenuDom);
