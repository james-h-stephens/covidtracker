import React, {useState, useEffect } from 'react';
import {fetchDailyUSData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import styles from './USChart.module.css';

const USChart = () => {
    const [dailyUSData, setDailyUSData] = useState([]);

    useEffect(() => {
        const fetchUSAPI = async () => {
            setDailyUSData(await fetchDailyUSData());
        }
         

        fetchUSAPI();
    }, []);

    const lineChartUSCases =  (
         
        <Bar
          data={{
            labels: dailyUSData.map(({ date }) => new Date(date).toDateString()),
            datasets: [
              {
                data: dailyUSData.map(({ confirmed }) => confirmed),
                label: "Infected",
                borderColor: "rgba(0, 255, 0, 1)",
                backgroundColor: "rgba(0, 255, 0, 1)",
                fill: true,
              },
               
            ],
          }}
          options={{
            title: { display: true, text: `USA Cases` },
          }}
        />)
    const lineChartUSDeaths = (
        <Bar
          data={{
            labels: dailyUSData.map(({ date }) => new Date(date).toDateString()),
            datasets: [
               
              {
                data: dailyUSData.map(({ deaths }) => deaths),
                label: "Deaths",
                borderColor: "red",
                backgroundColor: "rgba(255,0,0,1)",
                fill: true,
              },
            ],
          }}
          options={{
            title: { display: true, text: `USA Deaths` },
          }}
        /> 
      ) 

      const lineChartUSDailyCases = (
        <Bar
          data={{
            labels: dailyUSData.map(({ date }) => new Date(date).toDateString()),
            datasets: [
               
              {
                data: dailyUSData.map(({ dailyCases }) => dailyCases),
                label: "Daily New Cases",
                borderColor: "red",
                backgroundColor: "rgba(0,0,255,1)",
                fill: true,
              },
            ],
          }}
          options={{
            title: { display: true, text: `USA Daily New Cases` },
          }}
        /> 
      ) 
    
 
    return(
       <> 
       <div className={styles.container}>{lineChartUSCases}</div>
       <div className={styles.container}>{lineChartUSDeaths}</div>
       <div className={styles.container}>{lineChartUSDailyCases}</div>
       </>
    )
}

export default USChart;