import './App.css';
import React, { Component } from 'react';
import Form from './Form'
import Result from './Result' 

class App extends Component {

  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false,
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleCitySubmit = e => {
    e.preventDefault()
    const API = 
    `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=63ca3b5446d86b54159140ee9fb39e41&units=metric`;

    fetch(API)
    .then(response => {
      if(response.ok) {
        return response
      }
      throw Error("Nie udało sie")
    })
    .then(response => response.json())
    .then(data => {
      const time = new Date().toLocaleString()
      this.setState({
        err: false,
        date: time,
        city: this.state.value,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        temp: data.main.temp,
        pressure: data.main.pressure,
        wind: data.wind.speed,
        

    })
    })
    .catch(err => {
      console.log(err);
      this.setState(prevState => ({
        
      err: true,
      city: prevState.value
      }))
    
  })
}
    
render() {

  return (
    <div className="App">

        <Form text={this.state.value} change={this.handleInputChange} submit={this.handleCitySubmit} />
        <Result weather={this.state} />
       
      
    </div>
  );
}
}



  


export default App;
