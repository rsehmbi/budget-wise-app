
import '../Css/App.css';
// @ts-ignore
import BudgetPlanner from './BudgetPlanner.tsx';
// @ts-ignore
import BudgetTable from './BudgetLog.tsx';
import {Menu} from 'antd'
import * as React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// const items = [
//   { label: 'Budget Portfolio', key: 'budget' }, // remember to pass the key prop
//   { label: 'Expense Logs', key: 'logs' }, // which is required
// ];

function App() {
//   function selectItem(menuItem) {
//       if(menuItem=='budget'){
        
//       }
//   };


  return (
    <div className="App" key="1">
      {/* <Menu style={{ width: 256 }}
             defaultSelectedKeys={['budget']} 
             onClick={selectItem} 
             items={items} /> */}
      <BudgetPlanner></BudgetPlanner>
      <BudgetTable></BudgetTable>
    </div>
  );
}

export default App;
