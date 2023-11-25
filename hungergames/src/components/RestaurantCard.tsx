// RestaurantCard.tsx
import React from 'react';
import styles from './RestaurantCard.module.css';

interface RestaurantCardProps {
  restaurantName: string;
  cuisine: string;
  distance: string;
  imageUrl: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurantName,
  cuisine,
  distance,
  imageUrl,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.leftColumn}>
        <h2 className={styles.header}>{restaurantName}</h2>
        <h3>{cuisine}</h3>
        <h3>{distance}</h3>
      </div>
      <div className={styles.rightColumn}>
        <img src={imageUrl} alt="Restaurant" className={styles.image} />
      </div>
    </div>
  );
};

export default RestaurantCard;
