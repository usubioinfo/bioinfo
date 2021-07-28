(() => {
  const tabSelectButtons = [...document.getElementsByClassName('tab-select-option')];
  const subColumns = [...document.getElementsByClassName('sub-column')];

  const pubDateButtons = [...document.getElementsByClassName('pub')];
  const confDateButtons = [...document.getElementsByClassName('conf')];

  const pubGroups = [...document.getElementsByClassName('pub-group')];
  const confGroups = [...document.getElementsByClassName('conf-group')];

  pubDateButtons[0].classList.add('active');
  confDateButtons[0].classList.add('active');

  confGroups[0].classList.remove('d-none');

  // document.body.classList.add('overflow-hidden');

  for (let pubButton of pubDateButtons) {
    pubButton.addEventListener('click', (e) => {
      for (let button of pubDateButtons) {
        button.classList.remove('active');
      }

      for (let group of pubGroups) {
        group.classList.add('d-none');
      }

      pubButton.classList.add('active');
      document.getElementById(`pub-${pubButton.id.split('-')[2]}`).classList.remove('d-none');
    });
  }

  for (let confButton of confDateButtons) {
    confButton.addEventListener('click', (e) => {
      for (let button of confDateButtons) {
        button.classList.remove('active');
      }

      for (let group of confGroups) {
        group.classList.add('d-none');
      }

      confButton.classList.add('active');
      document.getElementById(`conf-${confButton.id.split('-')[2]}`).classList.remove('d-none');
    });
  }

  for (let tabButton of tabSelectButtons) {
    tabButton.addEventListener('click', (e) => {
      for (let button of tabSelectButtons) {
        button.classList.remove('selected');
      }

      for (let column of subColumns) {
        column.classList.add('off');
      }

      const col = document.getElementById(`${tabButton.id}-column`);
      col.classList.remove('off');

      tabButton.classList.add('selected');
    });
  }
})();
