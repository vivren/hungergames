// RestaurantCard.tsx
import React from 'react';
import styles from './RestaurantCard.module.css';
import Image from 'next/image';

interface RestaurantCardProps {
  restaurantName: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurantName,
  price,
  rating,
  imageUrl,
}) => {
  return (
    <div className={styles.card}>     
    <div className={styles.head}>
      <div className={styles.header}>{restaurantName}</div>
      </div> 
      <div className={styles.block}>
      <div className={styles.leftColumn}>
        <h3>💸 {Array(price).fill('$').join('')}</h3>
        <h3>⭐{rating} Stars</h3>
      </div>
      <div className={styles.rightColumn}>
        <Image src={imageUrl} alt="Restaurant" className={styles.image} width={150} height={150}/>
      </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
