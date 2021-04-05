// Events Slideshow Script
// this script exists to replace Lightbox becuase we really don't use it

(() => {

  let selectedIndex = 0;

  const slideButtons = [...document.getElementsByClassName('modal-btn')];
  const modalImg = document.getElementById('modal-img');

  const leftBtn = slideButtons[0];
  const rightBtn = slideButtons[1];

  const modalImgs = [...document.getElementsByClassName('event-thumbnail')].map((el, index) => {
    el.addEventListener('click', () => {
      selectedIndex = index;
      console.log(selectedIndex);
      modalImg.setAttribute('src', modalImgs[selectedIndex]);
    });

    return el.getAttribute('src');
  });

  leftBtn.addEventListener('click', () => {
    selectedIndex -= 1;

    if (selectedIndex < 0) {
      selectedIndex = modalImgs.length - 1;
    }

    modalImg.setAttribute('src', modalImgs[selectedIndex]);
  });

  rightBtn.addEventListener('click', () => {
    selectedIndex += 1;

    if (selectedIndex > modalImgs.length - 1) {
      selectedIndex = 0;
    }
    console.log(selectedIndex);

    modalImg.setAttribute('src', modalImgs[selectedIndex]);
  });




  console.log(modalImgs);
  console.log('test')
})();
