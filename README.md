FakeDate.co.uk is a full-stack app where users can find a fake date for a social occasion, such as a wedding, party, or family gathering.

It was built using PostgreSQL, Express, React, and Node.js.

Live URL: https://fakedate.co.uk

The back end is an Express API that supplies the front end (Github: https://github.com/johnnyfwk/fake-date-front-end) with user, post, reply, and message data stored in PostgreSQL (Hosted URL: https://fake-date.onrender.com/api).

To clone this repo:
- go to https://github.com/johnnyfwk/fake-date-back-end;
- near the top of the page, click on the 'Code' button;
- in the 'Local' tab, copy the HTTPS URL (https://github.com/johnnyfwk/fake-date-back-end.git);
- in Terminal, access the folder you want to hold the repo;
- type 'git clone https://github.com/johnnyfwk/fake-date-back-end.git' in the terminal (a repo named 'fake-date-back-end' will be created in the current folder);
- in Terminal, type 'cd fake-date-back-end' to go into that folder.
- This project uses packages that need to be installed in order for it to be run. To do this:

In Terminal, ensure you are in the 'fake-date-back-end' folder;
- type 'npm i'.

To connect to the development database and run the project, a development environment variable must be created:
- at repo root level, create a .env file named '.env.development';
- In this file, type in 'PGDATABASE=fakedate'.

To create and seed all tables:
- in Terminal, type 'npm run dev-drop-create-and-seed-all-tables'.

To run the project:
- in the front end api.js file located in the 'src' folder, change the baseUrl to 'http://localhost:9090/api';
- in Terminal, type 'npm run dev' to start listening to API requests.