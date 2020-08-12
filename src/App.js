import React from "react";
import {
  Cards,
  Chart,
  CountryPicker,
  USCards,
  USChart,
  StatePicker,
  StateChart,
} from "./components";
import styles from "./App.module.css";
import { fetchData, fetchUSData, fetchDailyStateData } from "./api";
import CovidHeader from "./images/covidheader.png";
import { Typography } from "@material-ui/core";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    USData: {},
    stateData: {},
    currentState: ""
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchedUSData = await fetchUSData();
     

    this.setState({ data: fetchedData });
    this.setState({ USData: fetchedUSData });
     
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
 
    this.setState({ data: fetchedData, country: country });
  };
  handleStateChange = async (state) => {
    if(state.length === 0){

      this.setState({ stateData: {}, currentState: ""});
    }else {
    const normalizedState = state.toLowerCase();
    const fetchedDailyStateData = await fetchDailyStateData(normalizedState);
     
    this.setState({ stateData: fetchedDailyStateData, currentState: normalizedState});
    }
  };
  
  render() {
    const { data, country, USData, currentState, stateData } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={CovidHeader} alt="covid data"></img>
        <h1>USA</h1>
        <USCards USData={USData} />
        <StatePicker handleStateChange={this.handleStateChange} />
        <USChart stateData={stateData} currentState={currentState}/>
        <h1>World</h1>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <StateChart stateData={stateData} currentState={currentState}   />
        <a href="http://www.lukassaylor.com/">Lukas Saylor</a>
        <Typography>2020</Typography>
      </div>
    );
  }
}

export default App;
