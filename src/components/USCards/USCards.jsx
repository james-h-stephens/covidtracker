import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import styles from "./USCards.module.css";
import CountUp from "react-countup";
import cx from 'classnames';

const USCards = ({ USData: { positive, death, recovered, dateChecked} }) => {
    
    
  if (!positive) {
       
    return "Loading...";
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={positive}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Active Cases of Covid19
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Recovered Cases of Covid19
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={death}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Deaths from Covid19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default USCards;
