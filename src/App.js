import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "e4dfdd2bf3e9071d5e39537c186b104c";

class Application extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (event) => {
    event.preventDefault();
    var city = event.target.elements.city.value;


    if(city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`);
      const data = await api_url.json();

      var sunrise = data.sys.sunrise;
      var dateSunrise = new Date();
      dateSunrise.setTime(sunrise);
      var sunrise_dateSunrise = dateSunrise.getHours() + ":" + dateSunrise.getMinutes() + ":" + dateSunrise.getSeconds();

      var sunset = data.sys.sunset;
      var dateSunset = new Date();
      dateSunset.setTime(sunset);
      var sunset_dateSunset = dateSunset.getHours() + ":" + dateSunset.getMinutes() + ":" + dateSunset.getSeconds();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunrise: sunrise_dateSunrise,
        sunset: sunset_dateSunset,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Введите название города"
      });
    }
  }

  render() {
    return (
      <div className="Application wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error} />
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default Application;