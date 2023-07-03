import React, { useEffect, useState } from 'react';
import styles from './css/setInterval.module.css';

const Counter = ({ countTo, speed, decimals, formats , text}) => {
  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (value < countTo) {
  //       setValue((prevValue) => prevValue + 1);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, speed);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    const interval1 = setInterval(() => {
      if (value < countTo) {
        setValue((prevValue) => prevValue + 1);
      } else {
        clearInterval(interval1);
      }
    }, speed);
  
    const interval2 = setInterval(() => {
      setTimeout(() => {
        clearInterval(interval1);
        clearInterval(interval2);
      }, 6000);
    }, 1000);
  
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);
  

  return (
    <div className={`${styles.counter} ${styles.col_fourth}`}>
      <i className="take-code take-2x"></i>
      <h2 className={`${styles.countTitle} ${styles.countNumber}`}>{formats(value)}</h2>
      <p className={`${styles.countText}`}>{text}</p>
    </div>
  );
};

const SetInterval = () => {
  const decimals = 0; // Define the decimals variable

  const formats = (value) => value.toFixed(decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');

  return (
    <div className={`${styles.wrapper} mt-5`}>
      <Counter countTo={540} speed={80} decimals={decimals} formats={formats} text={"register users"}/>
      <Counter countTo={1245} speed={90} decimals={decimals} formats={formats} text={"rides"}/>
      <Counter countTo={1547} speed={10} decimals={decimals} formats={formats} text={"offer"} />
      <Counter countTo={954} speed={50} decimals={decimals} formats={formats} text={"hitchhiker"} />
    </div>
  );
};

export default SetInterval;
