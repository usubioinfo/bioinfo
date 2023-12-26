# USU Bioinfo Website (kaabil.net)

## Dev Environment

After you `git clone` the repo, run `npm install` to install all relevant packages.

To start the project in dev mode, run `npm start`. This will start two processes and link the PIDs, one process for handling the SCSS, and another for the JS.

## First Time Local Setup

### Modify env.njk

If the website isn't working, then you might not have created the env.njk file. You'll need to create a file called `env.njk` in the 
`src/views` folder, and then you'll want to copy `{% set baseUrl = "http://localhost:3000/" %}` into that file. You can create this file by copying and modifying env.default.njk
