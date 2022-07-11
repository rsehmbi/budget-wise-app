
import '../Css/App.css';
// @ts-ignore
import BudgetPlanner from './BudgetPlanner.tsx';
// @ts-ignore
import BudgetTable from './BudgetLog.tsx';
import * as React from "react";


function App() {
  return (
    <div className="App">
      <BudgetPlanner></BudgetPlanner>
      <BudgetTable></BudgetTable>
    </div>
  );
}

export default App;
