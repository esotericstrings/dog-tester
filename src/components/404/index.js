import React, { Component } from 'react';
import Header from '../Header';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class NotFound extends Component {
  constructor(props) {
    super(props);

    document.title = "Page Not Found | Would You Rather"
  }

  render() {
    
    return (
      <div>
        <Header/>

        <div className="center wrapper">
            <h1>Page Not Found</h1>
        </div>

      </div>
    );
  }
}

function mapStateToProps({ autheduser, questions }) {
  return {
    autheduser,
    questions
  };
}

export default withRouter(connect(mapStateToProps)(NotFound))