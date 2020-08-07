import React from 'react';
import { Cards, Chart, CountryPicker, USCards, USChart, StatePicker} from './components';
import styles from './App.module.css';
import { fetchData, fetchUSData, fetchDailyStateData} from './api';
import CovidHeader from './images/covidheader.png';
import { Typography } from '@material-ui/core';
 
class App extends React.Component {
  state = {
    data: {},
    country: '',
    USData: {},
    state: '',
    stateData: {}
    
  }
  
  async componentDidMount() {
    const fetchedData = await fetchData();   
    const fetchedUSData = await fetchUSData();
    const fetchedDailyStateData = await fetchDailyStateData();
     
    this.setState({data: fetchedData});
    this.setState({USData: fetchedUSData})
    this.setState({stateData: fetchedDailyStateData})
  }
    
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    
    this.setState({data: fetchedData, country: country});
  }
  handleStateChange = async (state) => {
    const fetchedDailyStateData = await fetchDailyStateData(state);
     
    this.setState({stateData: fetchedDailyStateData, state: state});
  }



  

  render() {
    const {data, country, USData} = this.state
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={CovidHeader} alt="covid data"></img>
        <h1>USA COVID Data</h1>
        <USCards USData={USData}/>
        <USChart/>
        <h1>World COVID Data</h1>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
        <StatePicker handleStateChange={this.handleStateChange}/>
        <a href="http://www.lukassaylor.com/">Lukas Saylor</a>
        <Typography>2020</Typography>
      </div>
    )
  }
}

 

export default App;
