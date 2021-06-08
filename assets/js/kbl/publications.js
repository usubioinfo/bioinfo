(() => {
  const pubDateButtons = [...document.getElementsByClassName('pub')];
  const pubGroups = [...document.getElementsByClassName('pub-group')];

  pubDateButtons[0].classList.add('active');

  for (let pubButton of pubDateButtons) {
    pubButton.addEventListener('click', (e) => {
      for (let button of pubDateButtons) {
        button.classList.remove('active');
      }

      for (let group of pubGroups) {
        group.classList.add('d-none');
      }

      pubButton.classList.add('active');
      document.getElementById(`pub-${pubButton.id}`).classList.remove('d-none');
    });
  }
})();
