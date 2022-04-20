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
    return <h1>Hello</h1>;
  }
}

export default App;
