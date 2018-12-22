import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";

class App extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      ...props
    }

  }

  render() {

    return (
        <div className="App">
            <Header/>
            <SideBar/>
        </div>
    );
  }
}

export default App;
