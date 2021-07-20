(() => {
  document.getElementById('send').addEventListener('click', e => {
    axios.post('http://bioinfocore.usu.edu/api/email/send')
      .then(res => {

      })
  })
})();