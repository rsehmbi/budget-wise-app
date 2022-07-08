
import '../Css/App.css';
import {Button} from "antd";
import BudgetCard from './BudgetCard.tsx';
import BudgetPlanner from './BudgetPlanner.tsx';
import React from 'react';

function App() {

    const test = async () => {
        await fetch('/test', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            response.json().then((response) => {
                if (response) {
                    alert(response.message)
                }
            })
        })
    }

  return (
    <div className="App">
      <Button onClick={() => {test()}}>test</Button>
      <BudgetPlanner></BudgetPlanner>
    </div>
  );
}

export default App;
