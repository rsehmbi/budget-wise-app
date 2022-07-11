
import '../Css/App.css';
// @ts-ignore
import BudgetPlanner from './BudgetPlanner.tsx';
// @ts-ignore
import BudgetTable from './BudgetLog.tsx';
import * as React from "react";
// @ts-ignore
import Login from "./Login.tsx";


function Main() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default Main;
