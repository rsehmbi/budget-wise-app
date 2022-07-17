
import '../Css/App.css';
// @ts-ignore
import BudgetPlanner from './BudgetPlanner.tsx';
// @ts-ignore
import BudgetTable from './BudgetLog.tsx';
import {Menu, MenuProps} from 'antd'
import * as React from "react";

import {Route, Link, Routes} from "react-router-dom";
import {useState} from "react";

const items = [
  { label: <Link to="/">Budget Portfolio</Link>, key: 'budget' }, // remember to pass the key prop
  { label: <Link to="/BudgetLog">Budget Logs</Link>, key: 'logs' }, // which is required
];

function App() {

    const [current, setCurrent] = useState(window.location.href.includes("BudgetLog") ? 'logs' : 'budget' );
    const onClick: MenuProps['onClick'] = e => {
            setCurrent(e.key);
    };


  return (
    <div className="App" key="1">
      <Menu  mode="horizontal"
             defaultSelectedKeys={['budget']}
             onClick={onClick}
             selectedKeys={[current]}
             items={items} />
      <Routes>
            <Route path="/" element={<BudgetPlanner/>}/>
            <Route path="/BudgetLog" element={<BudgetTable/>}/>
        </Routes>
    </div>
  );
}

export default App;
