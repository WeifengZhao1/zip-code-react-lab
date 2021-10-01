import React, { Component } from 'react';
import './App.css';

function City(props) {
  return (
    <div>
      <div className="CityLocation">{props.CityLocation}</div>
      <ul>
        <li> State: {props.State}</li>
        <li>Location: ({props.Lat},{props.Long})</li>
        <li>Population: (estimated) {props.Population}</li>
        <li>Total Wages: {props.TotalWages}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="zipcode">Zip Code:
      <input type="text" placeholder="  Try 10016" onChange={props.changeHandler} />
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

    if (this.state.cities.length === 0) {
      console.log("No Result");
    }
    if (event.target.value.length === 5) {
      fetch('http://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
        .then((res) => res.json())
        .then((data) => {
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
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged}/>
        <div>
          {
            this.state.cities.map((city) =>
              <City
                State={city.State}
                Population={city.EstimatedPopulation}
                TotalWages={city.TotalWages}
                Lat={city.Lat}
                Long={city.Long}
                CityLocation={city.LocationText}
              />
            )}
             
             <div className = "NoResult">
            {
              this.state.zipCode.length !== 5 && 
              <h1>No Result</h1>
            }
           </div>
        </div>
      </div>
    );
  }
}

export default App;