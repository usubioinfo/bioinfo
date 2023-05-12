(() => {
  document.getElementById('send').addEventListener('click', e => {

    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const phone = document.getElementById('formPhone').value;
    const message = document.getElementById('formMessage').value;

    const messageBody = message + '\n\n' + 'Contact me back at ' + email + ' or ' + phone;

    const body = {
      password: 'rkU56a%e$',
      subjectLine: `Bioinfo Contact Request from ${name}`,
      recipient: 'rkaundal@usu.edu',
      messageBody: messageBody
    }

    axios.post('https://bioinfocore.usu.edu/api/email/send', body)
      .then(res => {
        console.log(res);
        document.getElementById('formName').value = '';
        document.getElementById('formEmail').value = '';
        document.getElementById('formPhone').value = '';
        document.getElementById('formMessage').value = '';
      })
  })
})();