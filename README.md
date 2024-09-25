# Document Converter API

This is a RESTful API for converting between various document formats, including:
- String to JSON
- JSON to String
- JSON to XML
- XML to JSON

The API also includes error handling for invalid formats.

## Features
- Convert between different formats (String, JSON, XML)
- Validates input and output formats
- RESTful API built using Express.js
- MongoDB for persistence (if needed)
- Includes comprehensive test suite using Jest and Supertest

## Table of Contents

- [Installation](#direct-installation)
- [Dockeriesed Installation](#docker-installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Direct Installation

1. Clone this repository:

    ```bash
    git clone git@github.com:fropsyboy/orderful.git
    ```

2. Navigate to the project directory:

    ```bash
    cd orderful
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Docker Installation

1. Docker build:
    ```bash
    docker-compose build
    ```
2. Docker up:
    ```bash
    docker-compose up
    ```
3. Docker down:
    ```bash
    docker-compose down
    ```



## Environment Variables

Create a `.env` file in the root of the project and set up the following environment variables:

```plaintext
PORT=3000
NODE_ENV=development
```

## Running the Application

1. Tests:
    ```bash
    npm test
    ```

2. Development:
    ```bash
    npm run dev
    ```

3. Production:
    ```bash
    npm start
    ```

## API Endpoints

    The postman documentation can be found - https://documenter.getpostman.com/view/3726387/2sAXqwZfVc with response examples



