import axios from "axios";

const url = "https://covid19.mathdro.id/api";

const sUrl = "https://api.covidtracking.com";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUSData = async () => {
  try {
    const initialUSData = await axios.get(`${sUrl}/v1/us/current.json`);

    const USData = initialUSData.data[0];
     
    return USData;
  } catch (error) {}
};

export const fetchDailyUSData = async () => {
  try {
    const {data} = await axios.get(`${sUrl}/v1/us/daily.json`)
     
    const reverseData = data.map((dailyUSData) => ({
      confirmed: dailyUSData.positive,
      deaths: dailyUSData.death,
      date: dailyUSData.dateChecked,
      recovered: dailyUSData.recovered,
      dailyCases: dailyUSData.positiveIncrease
    }));
    const modifiedData= reverseData.reverse()
    return modifiedData;
  } catch (error) {
    
  }
}
export const fetchDailyStateData = async (state) => {
  try {
    const {data} = await axios.get(`${sUrl}/v1/states/${state}/daily.json`)
 
    const reverseData = data.map((dailyStateData) => ({
      state: dailyStateData.state,
      confirmed: dailyStateData.positive,
      deaths: dailyStateData.death,
      date: dailyStateData.dateChecked,
      recovered: dailyStateData.recovered,
      dailyCases: dailyStateData.positiveIncrease
    }));
    const modifiedData= reverseData.reverse()
    return modifiedData;
  } catch (error) {
    
  }
}

export const fetchStates = async () => {
  try {
    const {data} = await axios.get(`${sUrl}/v1/states/info.json`)
    
    const modifiedData = data.map((dailyStateData) => ({
      stateInitials: dailyStateData.state,
      stateName: dailyStateData.name 
    }));
     
   
    return modifiedData;
  } catch (error) {
    
  }
}