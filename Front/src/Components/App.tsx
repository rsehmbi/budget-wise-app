
import '../Css/App.css';
import BudgetPlanner from './BudgetPlanner.tsx';
import BudgetTable from './BudgetLog.tsx';
import React from 'react';


function App() {
  return (
    <div className="App">
      <BudgetPlanner></BudgetPlanner>
      <BudgetTable></BudgetTable>
    </div>
  );
}

export default App;
