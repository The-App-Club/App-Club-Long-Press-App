function handleMenuClick(e) {
  const targetDom = e.target;
  const selectedTouchMenu = targetDom.dataset.touchMenu;
  const messageDom = document.querySelector('.message');
  messageDom.innerText = `You Selected Menu Is ${selectedTouchMenu}`;
  targetDom.classList.add('is-selected');
  setTimeout(() => {
    targetDom.classList.remove('is-selected');
  }, 300);
}

function setHandleMenuClick(e) {
  const touchMenuItemDomList = [
    ...document.querySelectorAll('.touch-menu-item'),
  ];

  for (let index = 0; index < touchMenuItemDomList.length; index++) {
    const touchMenuItemDom = touchMenuItemDomList[index];
    touchMenuItemDom.addEventListener('click', handleMenuClick);
  }
}

function toggleMenuItem() {
  const touchMenuItemDomList = [
    ...document.querySelectorAll('.touch-menu-item'),
  ];

  for (let index = 0; index < touchMenuItemDomList.length; index++) {
    const touchMenuItemDom = touchMenuItemDomList[index];
    touchMenuItemDom.classList.toggle('is-active');
  }
}

function handleClickPress(e) {
  toggleMenuItem();
}

let selectedMenuItem;

const coolMenuDom = document.querySelector('.cool-menu');
coolMenuDom.addEventListener('click', handleClickPress);
setHandleMenuClick();
