import React from "react";
import {
  Cards,
  Chart,
  CountryPicker,
  USCards,
  USChart,
  StatePicker,
  Navbar,
} from "./components";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import { fetchData, fetchUSData, fetchDailyStateData } from "./api";
import { Typography } from "@material-ui/core";

class App extends React.Component {
  state = {
    data: {},
    country: "",
    USData: {},
    stateData: {},
    currentState: "",
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
    if (stateMetadata.stateCode.length === 0) {
      this.setState({ stateData: {}, currentStateMetadata: "" });
    } else {
      stateMetadata.stateCode = stateMetadata.stateCode.toLowerCase();
      const fetchedDailyStateData = await fetchDailyStateData(
        stateMetadata.stateCode
      );

      this.setState({
        stateData: fetchedDailyStateData,
        currentStateMetadata: stateMetadata,
      });
    }
  };

  render() {
    const {
      data,
      country,
      USData,
      currentStateMetadata,
      stateData,
    } = this.state;
    return (
      <div className={styles.container}>
        <Router>
          <Navbar USData={USData} />
          <Route path="/usa">
            <h1>
              {currentStateMetadata ? currentStateMetadata.stateName : "USA"}
            </h1>
            <USCards USData={USData} stateData={stateData} />
            <StatePicker handleStateChange={this.handleStateChange} />
            <USChart
              stateData={stateData}
              currentStateMetadata={currentStateMetadata}
            />
          </Route>
          <Route path="/" strict exact>
            <h1>{country ? `${country}` : "World"}</h1>
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country} />
          </Route>
          <a href="http://www.lukassaylor.com/">Lukas Saylor</a>
          <Typography>2020</Typography>
        </Router>
      </div>
    );
  }
}

export default App;
