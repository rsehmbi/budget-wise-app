
import '../Css/App.css';
import {Button} from "antd";
import BudgetCard from './BudgetCard.tsx';
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
      <BudgetCard cardTitle="Grocery" amount={200} maxAmount={ 1000}></BudgetCard>
    </div>
  );
}

export default App;
