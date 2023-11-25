import React from 'react';
import MobileFrame from '../components/MobileFrame';
import RestaurantCard from '@/components/RestaurantCard';
import './game.css'; // Import the CSS file for styling
import Link from 'next/link';


const Game: React.FC = () => {
  return (
    <div className="mainPage">
            <MobileFrame>
      <div className='header'>
        <h1>SWIPE TO PICK!</h1>
      </div>
      <div className='cardContainer'>
      <Link className='topCard' href="/Game">
        <RestaurantCard 
        restaurantName='Mcdonalds'
        cuisine='American'
        distance='5'
        imageUrl='/fries.png'></RestaurantCard>
      </Link>
    
      <Link className='bottomCard' href="/Game">
        <RestaurantCard 
        restaurantName='Mcdonalds'
        cuisine='American'
        distance='5'
        imageUrl='/fries.png'></RestaurantCard>
        </Link>
        </div>
      </MobileFrame>
      </div>
  );
};

export default Game;
