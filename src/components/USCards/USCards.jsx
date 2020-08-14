import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./USCards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const USCards = ({
  USData: { positive, death, recovered, dateChecked },
  currentStateMetadata,
  currentStateData,
}) => {
  console.log(currentStateData);
  if (!positive) {
    return "Loading Data...";
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={10}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              USA Infected
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={positive} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Active Cases of Covid19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={10}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              USA Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={recovered} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Recovered Cases of Covid19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={10}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              USA Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={death} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">
              {new Date(dateChecked).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Deaths from Covid19
            </Typography>
          </CardContent>
        </Grid>
        {currentStateMetadata ? (
          <>
            <TableContainer className={styles.stateTable} component={Paper}>
              <Table aria-label="simple table">
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell align="center">
                      {currentStateMetadata.stateName}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(
                        currentStateData.stateDateChecked
                      ).toDateString()}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">Infected</TableCell>
                    <TableCell align="center">
                      {currentStateData.statePositive}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Deaths</TableCell>
                    <TableCell align="center">
                      {currentStateData.stateDeath}
                    </TableCell>
                  </TableRow>
                  {currentStateData.stateRecovered ? (
                    <TableRow>
                      <TableCell align="center">Recovered</TableCell>
                      <TableCell align="center">
                        {currentStateData.stateRecovered}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {currentStateData.negative ? (
                    <TableRow>
                      <TableCell align="center">Negative Tests</TableCell>
                      <TableCell align="center">
                        {currentStateData.negative}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {currentStateData.hospitalizedCurrently ? (
                    <TableRow>
                      <TableCell align="center">
                        Currently Hospitalized
                      </TableCell>
                      <TableCell align="center">
                        {currentStateData.hospitalizedCurrently}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {currentStateData.inIcuCurrently ? (
                    <TableRow>
                      <TableCell align="center">Currently in ICU</TableCell>
                      <TableCell align="center">
                        {currentStateData.inIcuCurrently}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {currentStateData.onVentilatorCurrently ? (
                    <TableRow>
                      <TableCell align="center">
                        Currently on Ventilator
                      </TableCell>
                      <TableCell align="center">
                        {currentStateData.onVentilatorCurrently}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : null}
      </Grid>
    </div>
  );
};

export default USCards;
