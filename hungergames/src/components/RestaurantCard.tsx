// RestaurantCard.tsx
import React from 'react';
import styles from './RestaurantCard.module.css';
import Image from 'next/image';

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
        <h3>🍽️{cuisine}</h3>
        <h3>📍{distance} km away</h3>
      </div>
      <div className={styles.rightColumn}>
        <Image src={imageUrl} alt="Restaurant" className={styles.image} width={150} height={150}/>
      </div>
    </div>
  );
};

export default RestaurantCard;
