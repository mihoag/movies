import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface RatingProps {
  rating: number;
}

export const RatingProgressBar: React.FC<RatingProps> = ({ rating }) => {
  const getRatingColor = (value: number) => {
    if (value >= 70) return '#21d07a';
    if (value >= 40) return '#d2d531';
    return '#db2360';
  };

  const ratingColor = getRatingColor(rating);
  return (
    <CircularProgressbar
      value={rating}
      text={`${rating}%`}
      background
      styles={buildStyles({
        backgroundColor: '#081c22',
        textColor: '#fff',
        textSize: '34px',
        pathColor: ratingColor,
        trailColor: 'transparent',
        strokeLinecap: 'butt',
        pathTransitionDuration: 0.3,
      })}
    />
  );
};

export default RatingProgressBar;
