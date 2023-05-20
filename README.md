# WebN3

The app for polkadot accounts to obtain their secrets


https://github.com/Traf333/WebN3/assets/2113554/553f7535-7b20-4c30-946f-ce2782c95d00



## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Backend Endpoints](#backend-endpoints)

## Prerequisites

Before running this application, you will need to have the following installed on your machine:

- Node.js (version ^16)
- NPM or Yarn
- Polkadot JS browser extension

## Installation

To install the project dependencies, follow these steps:

1. Clone the repository: `git clone https://github.com/Traf333/WebN3.git`
2. Change to the project directory: `cd WebN3`
3. Install dependencies using NPM: `npm install` or using Yarn: `yarn install`

## Configuration

For the configuration the app uses `.env` file so don't forget to add it `cp .env.example .env.local`

## Usage

To run the application, use the following command:

```shell
npm run dev
```

Or if you're using Yarn:

```shell
yarn dev
```

This will start the development server, and you can access the app in your browser at `http://localhost:3000`.

## Backend Endpoints

### Show Secret

- **URL:** `GET /api/v1/secret`
- **Description:** Returns a secret message from the database for specific address

### Signin

- **URL:** `POST /api/v1/signin`
- **Description:** The endpoint for obtaining session token or store session within cookies
- **Parameters:**
    - address: `string`. The user’s address. Alphanumeric. No spaces or symbols.
    - message: `Sign-in request for address <address>.`. `<address>` must be the same as `address`.
    - signature: `string`. The signature of the message using the user’s address.List any parameters required by this
      endpoint, if applicable.
- **Example:**

 ```
POST /api/v1/signin
Payload {
	"address": "14GgSVJ1unwjVw4CuMGXYz4P4yT1HzVqEDEiExhiCS84EGQo",
	"message": "Sign-in request for address 14GgSVJ1unwjVw4CuMGXYz4P4yT1HzVqEDEiExhiCS84EGQo.",
	"signature": "0xfc03197bd2110f613677913e3d52afbc1ecda9099109f01300a97acde7122d305d87d115cf173632319c6666d829a4585a45462cb3d2df5513f7d5a68c9f1785",
}
```

### Sing out

- **URL:** `DELETE /api/v1/signout`
- **Description:** Drops session


_PS: Readme content was created with help of ChatGPT_
