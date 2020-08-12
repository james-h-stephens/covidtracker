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
  handleStateChange = async (stateMetadata) => {
    if(stateMetadata.stateCode.length === 0){

      this.setState({ stateData: {}, currentStateMetadata: ""});
    }else {
    stateMetadata.stateCode = stateMetadata.stateCode.toLowerCase();
    const fetchedDailyStateData = await fetchDailyStateData(stateMetadata.stateCode);
     
    this.setState({ stateData: fetchedDailyStateData, currentStateMetadata: stateMetadata});
    }
  };
  
  render() {
    const { data, country, USData, currentStateMetadata, stateData } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={CovidHeader} alt="covid data"></img>
        <h1>USA</h1>
        <USCards USData={USData} />
        <StatePicker handleStateChange={this.handleStateChange} />
        <USChart stateData={stateData} currentStateMetadata={currentStateMetadata}/>
        <h1>World</h1>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <a href="http://www.lukassaylor.com/">Lukas Saylor</a>
        <Typography>2020</Typography>
      </div>
    );
  }
}

export default App;
