(() => {
  const pubButtons = [...document.getElementsByClassName('pub-legend-container')];
  const pubTextEl = document.getElementsByClassName('pub-text')[0];

  pubButtons[0].classList.add('selected');

  let textDict = {
    'none': '',
    'dollar': 'Denotes equal contributions',
    'asterisk': 'Corresponding author',
    'caret': 'Student of a collaborator mentored by Dr. Kaundal',
    'underline': 'Undergraduate student',
    'italic': 'Undergraduate student mentored by Dr. Kaundal'
  }

  let selectedText = 'dollar';
  pubTextEl.textContent = textDict[selectedText];

  for (let button of pubButtons) {
    button.addEventListener('click', (e) => {
      for (let button2 of pubButtons) {
        button2.classList.remove('selected');
      }

      button.classList.add('selected');
      selectedText = button.id;

      pubTextEl.textContent = textDict[selectedText];
    });
  }
})()
