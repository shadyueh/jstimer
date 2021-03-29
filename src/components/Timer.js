import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStopCircle,
} from "@fortawesome/free-regular-svg-icons";

import styles from "./Timer.module.css";

export default function Timer() {
  const initialTime = 0.05 * 60;
  const [time, setTime] = useState(initialTime);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const txtMinutes = String(minutes).padStart(2, "0");
  const txtSeconds = String(seconds).padStart(2, "0");

  return (
    <div className={styles.timer}>
      <div>
        <span>{txtMinutes}</span>
        <span>:</span>
        <span>{txtSeconds}</span>
      </div>
      <div className={styles.controls}>
        <button id='timer-play'>
          <FontAwesomeIcon icon={faPlayCircle} size='7x' />
        </button>
        <button id='timer-stop'>
          <FontAwesomeIcon icon={faStopCircle} size='7x' />
        </button>
      </div>
      {hasFinished ?? <p>Time is up !</p>}
    </div>
  );
}
