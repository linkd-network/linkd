import React from 'react';
import './App.css';

class App extends React.Component {
  componentDidMount(){
    fetch('/mgmt/v1/getNote')
    .then(res => res.json())
    .then((res)=>{
      console.log(res);
    })
  }
  render() {
    return <div>
      <h1>Hello</h1>;

    <div id='linkyd'></div>
    </div>
  }
}

export default App;
