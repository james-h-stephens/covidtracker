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
    const { data } = await axios.get(`${sUrl}/v1/us/daily.json`);

    const reverseData = data.map((dailyUSData) => ({
      confirmed: dailyUSData.positive,
      deaths: dailyUSData.death,
      date: dailyUSData.dateChecked,
      recovered: dailyUSData.recovered,
      dailyCases: dailyUSData.positiveIncrease,
    }));
    const modifiedData = reverseData.reverse();
    return modifiedData;
  } catch (error) {}
};

let stateDataCache = {};
export const fetchDailyStateData = async (stateCode) => {
  try {
    if(!stateDataCache[stateCode])
    {
      const  {data}  = await axios.get(`${sUrl}/v1/states/${stateCode}/daily.json`);

      const reverseData = data.map((stateData) => ({
        confirmed: stateData.positive,
        deaths: stateData.death,
        date: stateData.dateChecked,
        dailyCases: stateData.positiveIncrease,
      }));
      stateDataCache[stateCode] = reverseData.reverse();
    }

    return stateDataCache[stateCode];
  } catch (error) {}
};

let stateMetadata = null;
export const fetchStates = async () => {
  try {
    if (!stateMetadata) {
      const  {data}  = await axios.get(`${sUrl}/v1/states/info.json`);
      
      stateMetadata = data.map((dailyStateData) => ({
        stateInitials: dailyStateData.state,
        stateName: dailyStateData.name,
      }));
  }

    return stateMetadata;
  } catch (error) {}
};

export const currentStateData = async (stateCode) => {
  try {
    const {data:{hospitalizedCurrently, inIcuCurrently,}} = await axios.get(`${sUrl}/v1/states/${stateCode}/current.json`);
  } catch (error) {}
}