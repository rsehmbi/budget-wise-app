## Budget Wise App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Budget Table

```

CREATE TABLE budgettable (
    userid int,
    budgetname varchar(255),
    amount int,
    maximumamount int
);

// Same user id because one user will have multiple budgets
INSERT INTO budgettable VALUES (1, 'Car Payment', 100, 500)
INSERT INTO budgettable VALUES (1, 'Groceries', 400, 800)
INSERT INTO budgettable VALUES (1, 'Rentals', 400, 1000)

```
