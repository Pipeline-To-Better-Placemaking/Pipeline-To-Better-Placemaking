import React from 'react';

// helper function to get a readable date string value
export const getDayStr = (date) => {
  return parseInt(date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
}

// helper function to get a readable time string value
export const getTimeStr = (time) => {
    let hours = time.getHours();
    let minutes = `${time.getMinutes()}`;
    let morning = " AM";
    // 12 hour instead of 24
    if (hours > 12) {
        hours = hours - 12
        morning = " PM";
    } else if (hours === 12) {
        morning = " PM";
    } else if (hours === 0) {
        hours = 12
    }
    // 2 digits
    if (minutes.length !== 2) {
        minutes = 0 + minutes;
    }
    return hours + ":" + minutes + morning;
}
