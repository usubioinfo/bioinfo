(() => {
  axios.get('http://bioinfocore.usu.edu/api/uptime/uptimes').then((response) => {
    console.log(response.data);

    response.data.forEach((tool) => {
      const toolEl = document.getElementById(tool.name);
      if (tool.availability == 'running') {
        toolEl.classList.add('up');
      } else {
        toolEl.classList.add('down');
      }
    })
  });
})()
