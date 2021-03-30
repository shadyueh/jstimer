import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStopCircle,
} from "@fortawesome/free-regular-svg-icons";

import styles from "./Timer.module.css";

export default function Timer() {
  const initialTime = 0.05 * 60;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  let txtMinutes = String(minutes).padStart(2, "0");
  let txtSeconds = String(seconds).padStart(2, "0");

  let intervalID;

  function startTimer() {
    setTime(initialTime);
    setIsActive(true);
    setHasFinished(false);
  }

  function stopTimer() {
    clearTimeout(intervalID);
    setIsActive(false);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      intervalID = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setIsActive(false);
      setHasFinished(true);
    }

    console.log(hasFinished);
  }, [isActive, time]);

  return (
    <div className={styles.timer}>
      <div>
        <span>{txtMinutes}</span>
        <span>:</span>
        <span>{txtSeconds}</span>
      </div>
      <div className={styles.controls}>
        <button id='timer-play' onClick={startTimer}>
          <FontAwesomeIcon icon={faPlayCircle} size='7x' />
        </button>
        <button id='timer-stop' onClick={stopTimer}>
          <FontAwesomeIcon icon={faStopCircle} size='7x' />
        </button>
      </div>
      {hasFinished ? <p>Time is up !</p> : ""}
    </div>
  );
}
