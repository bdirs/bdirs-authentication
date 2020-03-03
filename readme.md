<h3 align="center">
  <a href="https://github.com/bdirs/bdirs-web-api">
    BDIRS <span>(BDIRS BACHELOR DEGREE INFORMATION AND RECOMMENDATION SYSTEM)</span>
  </a>
</h3>

<p align="center">
  <a href="https://github.com/facebook/react-native/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="React Native is released under the MIT license." />
  </a>
  <a href="https://www.npmjs.org/package/react-native">
    <img src="https://badge.fury.io/js/react-native.svg" alt="Current npm package version." />
  </a>
  <a href="https://facebook.github.io/react-native/docs/contributing">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
  <a href="https://codeclimate.com/github/bdirs/bdirs-web-api/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/dd505402cbc0e3afdcf9/maintainability" />
  </a>
  <a href="https://travis-ci.org/bdirs/bdirs-web-api">
  <img src="https://travis-ci.org/bdirs/bdirs-authentication.svg?branch=develop" />
  </a>
  <a href="https://codeclimate.com/github/bdirs/bdirs-authentication/test_coverage">
  <img src="https://api.codeclimate.com/v1/badges/9af4a0c887633041a684/test_coverage" /></a>
</p>

###### Background
This platform helps to address an issue with applying and getting the right degree program to to at
university more so public universities in Uganda.
Choosing the right program to do at university can help one get their dream job as well do something they love.

###### Project dependencies

- Javascript/Typescript Full Stack
- Node JS Backend
- Express Js Framework
- Jest  Testing Framework
- Postgres Database
- Sequelize


##### Setup

- clone repo using `git clone https://github.com/bdirs/bdirs-authentication.git`

- cd into project using `cd bdirs-authentication`.

- install dependencies using yarn `yarn or npm install`

- create a `.env` file and copy content from `env-example.txt`

- populate `.env` file with appropiate values

- Run migrations using `yarn db:migrate`

- Run seeders using `./node_modules/.bin/sequelize db:seed:all`

- start dev server using `yarn start:dev`

- Run tests using `yarn test`

##### Docker Setup

- Run `docker-compose up -d`

- Run migration using `docker-compose exec api yarn db:migrate`

- Run `docker-compose exec api export SUPER_ADMIN_EMAIL=anyemail ` to add super admin email

- Run `docker-compose exec api export SUPER_ADMIN_PASSWORD=password ` to add super admin password

- Run Seeders using `docker-compose exec api ./node_modules/.bin/sequelize db:seed:all`



###### NOTE
Please find the full project report attached to repo. Some diagrams got mixed up but will be fixed soon

