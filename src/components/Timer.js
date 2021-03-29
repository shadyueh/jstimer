import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faStopCircle,
} from "@fortawesome/free-regular-svg-icons";

import styles from "./Timer.module.css";

export default function Timer() {
  return (
    <div className={styles.timer}>
      <div>
        <span>10</span>
        <span>:</span>
        <span>00</span>
      </div>
      <div className={styles.controls}>
        <button id='timer-play'>
          <FontAwesomeIcon icon={faPlayCircle} size='7x' />
        </button>
        <button id='timer-stop'>
          <FontAwesomeIcon icon={faStopCircle} size='7x' />
        </button>
      </div>
      <p>We are sorry. Your time is up !</p>
    </div>
  );
}
