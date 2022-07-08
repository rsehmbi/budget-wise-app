
import '../Css/App.css';
import {Button} from "antd";

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
      <Button onClick={() => {test()}}>
          test
      </Button>
    </div>
  );
}

export default App;
