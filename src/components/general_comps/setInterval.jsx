import React, { useEffect, useState } from 'react';
import styles from './css/setInterval.module.css';

const Counter = ({ countTo, speed, decimals, formats }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value < countTo) {
        setValue((prevValue) => prevValue + 1);
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`${styles.counter} ${styles.col_fourth}`}>
      <i className="take-code take-2x"></i>
      <h2 className={`${styles.countTitle} ${styles.countNumber}`}>{formats(value)}</h2>
      <p className={`${styles.countText}`}>SomeText GoesHere</p>
    </div>
  );
};

const SetInterval = () => {
  const decimals = 0; // Define the decimals variable

  const formats = (value) => value.toFixed(decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');

  return (
    <div className={`${styles.wrapper}`}>
      <Counter countTo={300} speed={100} decimals={decimals} formats={formats} />
      <Counter countTo={1700} speed={150} decimals={decimals} formats={formats} />
      <Counter countTo={11900} speed={10} decimals={decimals} formats={formats} />
      <Counter countTo={157} speed={1} decimals={decimals} formats={formats} />
    </div>
  );
};

export default SetInterval;
