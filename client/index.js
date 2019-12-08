import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';

class MainPage extends Component {
  constructor(){
    super();
  this.state = {
    username: '',
    password: '',
    loggedIn: false,
  };
  this.handleOnChange = this.handleOnChange.bind(this);
  this.handleOnSubmit = this.handleOnSubmit.bind(this);
}

  handleOnChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleOnSubmit(e) {
    e.preventDefault();
    axios
      .post('/login', this.state)
      .then(() => {
        this.setState({ loggedIn: true });
      })
      .catch(err => {
        console.error(err)
        this.setState({ loggedIn: false });
      });
  }

  render() {
    return (
      <div>
        <h1> Hello World from React! </h1>
        <div>
          {this.state.loggedIn
            ? `You are logged in ${this.state.username}`
            : '401'}
        </div>
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="username" onChange={this.handleOnChange} />
          <input type="text" name="password" onChange={this.handleOnChange} />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<MainPage />, document.querySelector('#app'), () => {
  console.log('Application rendered!');
});
