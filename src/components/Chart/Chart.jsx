import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);
 
   
  const lineChart = dailyData.length ? (
    <Bar classname={styles.chart}
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(0, 255, 0, 1)",
            backgroundColor: "#1D3557",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "#E63946",
            fill: true,
          },
        ],
      }}
      options={{
        title: { display: true, text: `World` },
         
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar classname={styles.chart}
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "#1D3557",
              "#A8DADC",
              "#E63946",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
