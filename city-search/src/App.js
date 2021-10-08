import React, { Component } from 'react';
import './App.css';

function City(props) {
  return (
    <div>
      <div className="CityLocation">{props.CityLocation}</div>
      <ul>
        <li> {props.data}</li>
      </ul>
      
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="zipcode">Enter a City Name:
      <input type="text" placeholder="enter a city name" onChange={props.changeHandler} />
    </div>);
}


class App extends Component {
  state = {
    zipCode: '',
    cities: [],
  }

  zipChanged = (event) => { 
    console.log(event.target.value);
    this.setState({ zipCode: event.target.value }) 

    if (event.target.value.length > 0) {
      fetch('https://ctp-zip-api.herokuapp.com/city/' + event.target.value.toUpperCase())
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.setState({ cities: data })
        })
        .catch(error => {
          this.setState({ cities: [] })
        })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City ZipCode Search</h2>
        </div>
        <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged}/>
        <div>
          {
            this.state.cities.map((city) =>
              <City data={city}/>
            )}
        </div>
      </div>
    );
  }
}

export default App;