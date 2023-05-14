<br />
<p align="center">
<div align="center">
<img height="150" src="./documentation/logo.png" alt="Jobhub" border="0"/>
</div>
  <h3 align="center">Backend Jobhub</h3>
  <p align="center">
    <a href="https://github.com/VerdyNordsten/jobhub_backend"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://jobhub.up.railway.app/">View Demo</a>
    ·
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Setup .env example](#setup-env-example)
- [Rest Api](#rest-api)
- [Contributing](#contributing)
- [Related Project](#related-project)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

JobHub is an application designed for the purpose of connecting job seekers with potential employers. The platform offers a wide range of job opportunities from various industries, allowing users to search and apply for their desired positions online.

One of the standout features of JobHub is its comprehensive job listings, which include detailed information about the job requirements, responsibilities, and company profiles. This helps job seekers make informed decisions and find the perfect match for their skills and interests.

To utilize the services of JobHub, users simply need to create an account and provide their relevant job preferences and qualifications. JobHub will then display a curated list of job openings that align with the user's profile, making it convenient for them to browse and apply for suitable positions.

With JobHub, the process of finding and securing employment becomes more efficient and user-friendly, empowering both job seekers and employers in the hiring process.

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- and other


<!-- GETTING STARTED -->


## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- [nodejs](https://nodejs.org/en/download/)

| Third Party   | npm install         |
| ------------- | ------------------- |
| [bcrypt]      | npm i bcrypt@5.1.0  |
| [cloudinary]  | npm i cloudinary@1.34.0 |
| [cors]        | npm i cors@2.8.5     |
| [dotenv]      | npm i dotenv@16.0.3  |
| [express]     | npm i express@4.18.2 |
| [googleapis]  | npm i googleapis@111.0.0 |
| [helmet]      | npm i helmet@6.0.1   |
| [http-errors] | npm i http-errors@2.0.0 |
| [jsonwebtoken] | npm i jsonwebtoken@9.0.0 |
| [moment]      | npm i moment@2.29.4  |
| [morgan]      | npm i morgan@1.10.0  |
| [multer]      | npm i multer@1.4.5-lts.1 |
| [multer-s3]   | npm i multer-s3@3.0.1 |
| [nodemon]     | npm i nodemon@2.0.20 |
| [pg]          | npm i pg@8.9.0       |
| [uuid]        | npm i uuid@9.0.0     |
| [xss-clean]   | npm i xss-clean@0.1.1 |

[bcrypt]: https://www.npmjs.com/package/bcrypt
[cloudinary]: https://www.npmjs.com/package/cloudinary
[cors]: https://www.npmjs.com/package/cors
[dotenv]: https://www.npmjs.com/package/dotenv
[express]: http://expressjs.com
[googleapis]: https://www.npmjs.com/package/googleapis
[helmet]: https://www.npmjs.com/package/helmet
[http-errors]: https://www.npmjs.com/package/http-errors
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[moment]: https://www.npmjs.com/package/moment
[morgan]: https://www.npmjs.com/package/morgan
[multer]: https://www.npmjs.com/package/multer
[multer-s3]: https://www.npmjs.com/package/multer-s3
[nodemon]: https://www.npmjs.com/package/nodemon
[pg]: https://node-postgres.com
[uuid]: https://www.npmjs.com/package/uuid
[xss-clean]: https://www.npmjs.com/package/xss-clean

### Requirements

Documentation files are provided in the [documentation](./documentation) folder

- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/26188678/2s93ecxB2h)

- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.getpostman.com/) for testing

### Installation

- Clone This Back End Repo

```
git clone https://github.com/VerdyNordsten/jobhub_backend.git
```

- Go To Folder Repo

```
cd jobhub_backend
```

- Install Module

```
npm install
```

- <a href="#setup-env-example">Setup .env</a>
- Starting application

```
  <!-- Run App -->
  npm run dev
```

```
  <!-- Run Linter -->
  npm run lint
```

### Setup .env example

Create .env file in your root project folder.

```
DB_HOST =
DB_USER =
DB_PASSWORD =
DB_NAME =
DB_PORT =

PORT =

SECRET_KEY_JWT =

CLOUDINARY_CLOUDNAME = 
CLOUDINARY_APIKEY =
CLOUDINARY_APISECRET =

GOOGLE_DRIVE_TYPE=
GOOGLE_DRIVE_PROJECT_ID=
GOOGLE_DRIVE_PRIVATE_KEY_ID=
GOOGLE_DRIVE_PRIVATE_KEY=
GOOGLE_DRIVE_CLIENT_EMAIL=
GOOGLE_DRIVE_CLIENT_ID=
GOOGLE_DRIVE_AUTH_URI=
GOOGLE_DRIVE_TOKEN_URI=
GOOGLE_DRIVE_AUTH_PROVIDER=
GOOGLE_DRIVE_CLIENT_URL=
GOOGLE_DRIVE_PARENT_FOLDER=
```

## Related Project

:rocket: [`Backend Jobhub`](https://github.com/VerdyNordsten/jobhub_backend)

:rocket: [`Frontend Jobhub`](https://github.com/VerdyNordsten/jobhub_frontend)

:rocket: [`Demo Jobhub`](https://jobhub.digty.co.id/)

Project Link: [https://github.com/VerdyNordsten/jobhub_backend](https://github.com/VerdyNordsten/jobhub_backend)
