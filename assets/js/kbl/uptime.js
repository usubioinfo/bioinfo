(() => {
  axios.get('https://kaabil.net/api/uptime/uptimes')
    .then((response) => {
      console.log(response.data);

      response.data.forEach((tool) => {
        const toolEl = document.getElementById(tool.name);

        // Check if the element was found before trying to modify it
        if (toolEl) {
          if (tool.availability == 'running') {
            toolEl.classList.add('up');
          } else {
            toolEl.classList.add('down');
          }
        } else {
          // Log an error or handle the case where the element is not found
          console.error(`Element not found for tool: ${tool.name}`);
        }
      });
    })
    .catch((error) => {
      // Handle any errors that occurred during the API request
      console.error('Error fetching uptime data:', error);
    });
})();
