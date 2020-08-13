import React from "react";
import styles from "./Navbar.module.css";
import CovidHeader from "../../images/covidheader.png";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <img className={styles.logo} src={CovidHeader} alt="covid data"></img>
      <div className={styles.ButtonContainer}>
        <Link className={styles.Link} to="/usa">
          <Button variant="contained" color="secondary">
            U.S.A.
          </Button>
        </Link>
        <Link className={styles.Link} to="/">
          <Button variant="contained" color="secondary">
            World
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
