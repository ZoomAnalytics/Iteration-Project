// List meeting templates (get UUID)
// List meeting participants (lecture info)
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    // this.importMeetingID = '323';
    this.addClass = this.addClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.addRoster = this.addRoster.bind(this);
    this.loginPage = this.loginPage.bind(this);
  }

  render() {
    return (
      <div className="App">
        <Login loginPage={this.loginPage} />
        <Sidebar
          addClass={this.addClass}
          deleteClass={this.deleteClass}
          addRoster={this.addRoster}
          // importMeetingID = {this.importMeetingID}
        />
        <Main />
      </div>
    );
  }

  addClass() {
    console.log('Add Class');
  }

  deleteClass() {
    console.log('Delete Class');
  }

  addRoster() {
    console.log('Add Roster');
  }

  loginPage() {
    console.log('Log in');
    fetch('/api/oauth-login');
  }
}

export default App;
