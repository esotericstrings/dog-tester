import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Explore from './Explore/';
import Identify from './Identify/';
import NotFound from './404/';
import '../index.scss';
import '../App.css';

class App extends Component {
  
  componentDidMount() {
    document.title = "Pet Identifier"
  }
  
  render() {
    const { loggedIn } = this.props;
    return (
       <Router>
        <Switch>
          <Route exact path="/" component={Identify} loggedIn={loggedIn}/>
          <Route exact path="/explore" component={Explore} loggedIn={loggedIn}/>
          <Route component={NotFound} loggedIn={loggedIn}/>
        </Switch>
	   </Router>  
    );
  }
}

export default App;