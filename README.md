## Projektbeskrivning

Detta är en fullstackapplikation som efterliknar grundläggande funktionalitet från Twitter. Applikationen gör det möjligt för användare att skapa profiler, skriva inlägg (tweets) och interagera med andra användares inlägg genom likes. Projektet fungerar som en social plattform där användare kan dela sina tankar i korta textform och följa andras uppdateringar i ett flöde.

## Funktioner

- Skapa en personlig användarprofil (inkluderar användarnamn, profilbild och beskrivning).
- Publicera tweets (korta textinlägg).
- Söka på användare och #hashtags
- Kommentera andras tweets för att visa på engagemang/dela åsikter.
- Se ett flöde av alla tweets av de man följer, med de nyaste överst.
- Möjlighet att byta profilbild samt bakgrundsbild.

## Hur fungerar det?

När appen startas möts användaren av en Home-sida där alla (de man aktivt följer) publicerade tweets visas i ett kronologiskt flöde. Här ser man användarnamn, tweetens innehåll och antal kommentarer. Användaren kan klicka på en pratbubbla för att kommentera ett inlägg eller läsa kommentarer.

Via knappen "Tweeta" kan man skriva ett nytt inlägg. Inlägget sparas direkt till databasen och visas omedelbart i flödet.

Till höger i applikationen finns - Populärt för dig - där finns de #hashtags som använts mest, de mest populära #hashtagsen. Antalet användningar står under

Genom att klicka på ett användarnamn i flödet kommer man till den personens profil, där man kan se en sammanställning av deras tweets samt deras användarinformation. På sin egen profil kan man även redigera sina bilder, profilbild samt bakgrundsbild.

Vill man komma tillbaka till flödet klickar man på tillbaka-pilen längst upp i vänstra hörnet.

## Instructions to Run and Test the Application

### Backend

#### Installation and Start

1. Go to the Backend folder:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run dev
   ```
   The server will run at http://localhost:3000

#### Test the Backend

Run tests with:

```sh
npm test
```

### Frontend

#### Installation and Start

1. Go to the Frontend folder:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The frontend will run at http://localhost:5173 (or the port shown in the terminal).

#### Test the Frontend

Run tests with:

```sh
npm test
```

#### Run E2E (End-to-End) Tests

To run Playwright E2E tests for the Frontend:

1. Make sure your Frontend server is running (for example, on http://localhost:5173 or the port you use):
   ```sh
   npm run dev
   ```
2. In another terminal, run the E2E tests:
   ```sh
   npx playwright test
   ```
   To see a detailed HTML report after running tests:
   ```sh
   npx playwright show-report
   ```

### Important E2E Dependencies and Their Purpose

- **@playwright/test**: Main library for running E2E browser tests. Simulates user actions and checks UI behavior.
- **playwright**: Provides browser automation for Chromium, Firefox, and WebKit. Required for running tests in real browsers.

#### Other Useful Playwright Features

- **playwright.config.ts**: Configuration file where you set the base URL, test directory, and other options for Playwright.
- **playwright-report/**: Folder where Playwright saves HTML reports of test runs.

### Main Project Dependencies and Their Purpose

#### Backend

- **express**: Framework to create the server and API routes.
- **cors**: Enables requests between frontend and backend (CORS).
- **mongoose**: Data modeling and connection with MongoDB.
- **dotenv**: Loads environment variables from a `.env` file.
- **bcryptjs**: Password encryption and verification.
- **jsonwebtoken**: Creation and verification of JWT tokens for authentication.
- **multer**: Handles file uploads (profile images, etc).
- **nodemon** (dev): Automatically restarts the server during development.
- **jest** (dev): Testing framework for the backend.
- **supertest** (dev): Allows HTTP endpoint testing.
- **mongodb-memory-server** (dev): In-memory MongoDB for automated tests.

#### Frontend

- **react**: Main library for building the user interface.
- **react-dom**: Renders React components in the DOM.
- **react-router-dom**: Navigation and routing in the SPA.
- **axios**: HTTP client to consume the backend API.
- **vite**: Fast development and build tool for React.
- **@vitejs/plugin-react**: Plugin for React support in Vite.
- **@testing-library/react** (dev): Utilities for testing React components.
- **@testing-library/jest-dom** (dev): Custom matchers for DOM tests.
- **jest** (dev): Testing framework for the frontend.
- **babel-jest** (dev): Allows using Babel with Jest to support JSX and ES6+ in tests.
- **eslint** (dev): Linter to maintain code quality.
- **@babel/preset-env** (dev): Babel preset for modern JS.
- **@babel/preset-react** (dev): Babel preset for JSX.
- **@eslint/js** (dev): ESLint configuration for JS.
- **eslint-plugin-react-hooks** (dev): ESLint rules for React hooks.
- **eslint-plugin-react-refresh** (dev): ESLint rules for React Fast Refresh.
- **globals** (dev): Global variables for ESLint.
- **jest-environment-jsdom** (dev): Jest environment that simulates the browser.
- **jest-transform-stub** (dev): Transforms static assets in tests.
- **@types/react** (dev): Types for React (useful for autocompletion and editors).
- **@types/react-dom** (dev): Types for ReactDOM.

---

**MyTweet**
Contributors:

- Andre
- Karolina
- Fredrica
