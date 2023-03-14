import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';

const Countdown = ({ duration, onComplete, running }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
    }

    // Clear the interval when the component is unmounted or running
    if (timeLeft > 0 && running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 2000);
    } else {
      clearInterval(intervalRef.current);
    }

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalRef.current);
  }, [timeLeft, onComplete, running]);

  // Convert the remaining time to minutes and seconds
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return <Text>{`${minutes}:${seconds}`}</Text>;
};

export default Countdown;
