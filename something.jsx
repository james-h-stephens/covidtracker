export const fetchDailyStateData = async (state) => {
    try {
      const { data } = await axios.get(`${sUrl}/v1/states/${state}/daily.json`);
  
      const reverseData = data.map((dailyStateData) => ({
        state: dailyStateData.state,
        confirmed: dailyStateData.positive,
        deaths: dailyStateData.death,
        date: dailyStateData.dateChecked,
        recovered: dailyStateData.recovered,
        dailyCases: dailyStateData.positiveIncrease,
      }));
      const modifiedData = reverseData.reverse();
      return modifiedData;
    } catch (error) {}
  };