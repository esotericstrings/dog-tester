import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './index.scss';

class Header extends Component {
    render () {
    return (
        <header className="App-header">
          <Link className="App-link" to='/'>Identify</Link>
          <Link className="App-link" to='/explore'>Explore</Link>
        </header>
    );
  }
}

export default withRouter(Header);