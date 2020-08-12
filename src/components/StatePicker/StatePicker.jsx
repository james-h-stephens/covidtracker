import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./StatePicker.module.css";
import { fetchStates } from "../../api";

const StatePicker = ({ handleStateChange }) => {
  const [fetchedStates, setFetchedStates] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedStates(await fetchStates());
    };

    fetchAPI();
  }, [setFetchedStates]);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        align="center"
        defaultValue=""
        onChange={(e) => handleStateChange(e.target.value)}
      >
        <option value="">-Select State-</option>
        {fetchedStates.map((fetchedStates, i) => (
          <option key={i} value={fetchedStates.stateInitials}>
            {fetchedStates.stateName}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default StatePicker;
