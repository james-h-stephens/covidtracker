import React, { useState, useEffect } from "react";
import { fetchDailyStateData } from "../../api";
import { Bar } from "react-chartjs-2";
import styles from "./StateChart.module.css";

const stateChart = ({ stateData, currentState }) => {
  console.log(stateData)

  const Charts = stateData.length ? (

    <Bar
      data={{
        labels: stateData.map(({ date }) => date),
        datasets: [
          {
            data: stateData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(0, 255, 0, 1)",
            backgroundColor: "rgba(0, 255, 0, 1)",
            fill: true,
          },
          {
            data: stateData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,1)",
            fill: true,
          },
        ],
      }}
      options={{
        title: { display: true, text: `${currentState.toUpperCase()}` },
      }}
    />

  ) : null;

  return (
    <div className={styles.container}>
    { Charts }
    </div>
  )


};

export default stateChart;
