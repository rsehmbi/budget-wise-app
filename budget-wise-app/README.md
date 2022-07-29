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
    userid varchar(255) REFERENCES users (id) ON DELETE CASCADE,
    budgetname varchar(255),
    amount int,
    maximumamount int,
    primary key (userid, budgetname)
);

CREATE TABLE expensetable (
    userid varchar(255) REFERENCES users (id) ON DELETE CASCADE,
    budgetcategory varchar(255) REFERENCES budgettable (budgetname) ON DELETE CASCADE,
    amount int NOT NULL,
    description varchar(255),
    date DATE NOT NULL,
);

CREATE TABLE expensetable (
    id SERIAL PRIMARY KEY,
    userid varchar(255) REFERENCES users (id) ON DELETE CASCADE,
    budgetcategory varchar(255),
    amount int NOT NULL,
    description varchar(255),
    date DATE NOT NULL,
    FOREIGN KEY (userid, budgetcategory) REFERENCES budgettable(userid, budgetname) ON DELETE CASCADE
);

CREATE TABLE owings (
    id SERIAL PRIMARY KEY,
    sender varchar(55),
    receiver varchar(55),
    amount int,
    description varchar(255),
    date DATE
);

```
