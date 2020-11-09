import React, { Component, useState } from 'react';
import axios from 'axios';
import './App.css';

function App(){
  const [url,setUrl] = useState("");
  const [alias,setAlias] = useState("");
  const [errorPresent,setErrorPresent] = useState(false);
  const [error,setError] = useState({});
  const [success,setSuccess] = useState(false);
  
  
  handleChange = (e) => {
    if (e.target.name === 'url') {
      setState(state.url = e.target.value);
    } else {
      this.setState({
        alias: e.target.value,
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/url', {
        url: e.target[0].value,
        alias: e.target[1].value,
      });
      if (res.status === 200) {
        console.log(res.data);
        this.setState({
          alias: res.data.alias,
          success: true,
        });
      } else {
        console.log(res.data);
        this.setState({
          errorPresent: true,
          error: {
            stack: res.data.stack,
          },
        });
      }
    } catch (error) {
      this.setState({
        errorPresent: true,
        error: {
          stack: error.stack,
        },
      });
    }
  };

  return (
      <div className={'myForm'}>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='url'
            value={this.state.url}
            onChange={this.handleChange}
            placeholder='ENTER URL'
          />
          <input
            type='text'
            name='alias'
            value={this.state.alias}
            onChange={this.handleChange}
            placeholder='Enter alias'
          />
          <button type='submit'>Generate URL</button>
        </form>
        {this.state.errorPresent && (
          <p>
            {' '}
            Error Occured:
            <br />
            {this.state.error.stack}
          </p>
        )}
        {this.state.success && (
          <p>
            Your shortened URL:{' '}
            {`http://localhost:5000/url/${this.state.alias}`}
          </p>
        )}
      </div>
    );
}

export default App;
