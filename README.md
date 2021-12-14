# USU Bioinfo Website

## Dev Environment

After you `git clone` the repo, run `npm i` to install all relevant packages.

To start the project in dev mode, run `npm start`. This will start two processes and link the PIDs, one process for handling the SCSS, and another for the JS.

Anytime you edit a file, the correct process will do what it needs to do and then restart.

If the website isn't working, then you might not have created the .env file. You'll need to create a file called `.env` in the 
`src/views` folder, and then you'll want to copy `{% set baseUrl = "http://localhost:3000/" %}` into that file.
