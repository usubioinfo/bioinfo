const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
								'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

(function() {

  "use strict";

  const dateItems = document.querySelectorAll('.calendar .date');
  const ctxMenu = document.querySelector('#ctx-menu');
  let ctxMenuHeader = document.querySelector('#ctx-heading');
  let headerText = '';

  let menuOn = false;
  const activeState = 'active';

  let menuPos;
  let menuX;
  let menuY;

  dateItems.forEach((item) => {

  });

  document.addEventListener('click', (e) => {
    if (clickInsideDate(e, 'date')) {
      e.preventDefault();
      activateMenu();
      positionMenu(e);
    } else {
      deactivateMenu();
    }
  });

  window.onkeyup = (e) => {
    if (e.keyCode === 27) {
      deactivateMenu();
    }
  };

  function positionMenu(e) {
    menuPos = getClickPos(e);
    console.log(menuPos);
    menuX = menuPos.x + 'px';
    menuY = menuPos.y + 'px';

    console.log(menuX);
    ctxMenu.style.left = menuX;
    console.log(ctxMenu.style.left);
    ctxMenu.style.top = menuY;
  }

  function clickInsideDate(e, className) {
    const el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
      const data = el.getAttribute('data-id').split('-');
      headerText = `${MONTHS_SHORT[data[1]]} ${data[0]}`;
      ctxMenuHeader.innerHTML = headerText;
      return el;
    } else {
      while (el === el.parentNode) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }

    return false;
  }

  function activateMenu() {
    if (!menuOn) {
      menuOn = true;
      ctxMenu.classList.add(activeState);
    }
  }

  function deactivateMenu() {
    if (menuOn) {
      menuOn = false;
      ctxMenu.classList.remove(activeState);
    }
  }

  function getClickPos(e) {
    let posX = 0;
    let posY = 0;

    if (!e) e = window.event;

    if (e.pageX || e.pageY) {
      posX = e.pageX;
      posY = e.pageY;
    } else if (e.clientX || e.clientY) {
      posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {x: posX, y: posY};
  }
})();
